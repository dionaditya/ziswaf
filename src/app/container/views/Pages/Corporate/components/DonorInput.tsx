import React, { useContext } from "react";
import { CorporateContext } from "../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import { CoorporateStatus } from "@/domain/entities/AllOptions";
import AutoSearch from "@/app/container/components/AutoCompleteSearch";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import {
  Box,
  Card,
  makeStyles,
  Theme,
  createStyles,
  TextareaAutosize,
  TextField,
  Paper,
} from "@material-ui/core";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import ModalWarningData from "../../Retail/components/ModalWarningData";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
import Alert from "@material-ui/lab/Alert";
import InputMask from "react-input-mask";
import SelectWithSearch from "@/app/container/components/SelectWithSearch";

const infoWarning = `Catatan: Jika menemui info error nama dan email perusahaan yang sama walaupun nama kontaknya berbeda. 
Silahkan dapat memperbarui nama kontak person perusahaan di fitur edit donatur terlebih dahulu atau dapat menggunakan data donatur perusahaan yang telah di daftarkan sebelumnya dengan melakukan pencarian melalui fitur cari donatur`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "2vh",
      padding: "30px 0",
    },
    formMargin: {
      margin: theme.spacing(1),
    },
    formSearch: {
      marginTop: "2vh",
      marginBottom: 10,
    },
    formContainer: {
      marginTop: theme.spacing(1),
      width: "100%",
      marginRight: 20,
      marginLeft: 20,
    },
    formControl: {
      marginTop: theme.spacing(1),
      width: "100%",
    },
    cardTitle: {
      color: "#3A3B3F",
    },
    label: {
      color: "#323C47",
      fontSize: 12,
      fontWeight: 800,
    },
    labelOpsional: {
      color: "#BCBCBC",
      fontSize: "14px",
      fontWeight: "bold",
    },
  })
);

const DonorInput = ({ index, setIndex }) => {
  const controller = useContext(CorporateContext);
  const history = useHistory();
  const classes = useStyles();
  const [statusModal, setStatusModal] = React.useState(false);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const { addToast } = useToasts();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const {
    company_name,
    address,
    npwp,
    info,
    province_id,
    pos_code,
    regency_id,
    status,
    position,
    phone,
    email,
    name,
  } = controller.DonaturInfo;

  React.useEffect(() => {
    setValue([
      { company_name: company_name },
      { status: status },
      { address: address },
      { npwp: npwp },
      { info: info },
      { position: position },
      { province_id: province_id },
      { pos_code: pos_code },
      { regency_id: regency_id },
      { phone: phone },
      { email: email },
      { name: name },
    ]);
  }, [controller.selected, controller.selectedDonatur]);

  const errorMessage = {
    empty: "Data ini tidak boleh kosong",
    companyName: "Nama Perusahaan tidak boleh kosong",
    address: "Alamat tidak boleh kosong",
    pos_code: "Kode Pos tidak boleh kosong",
    email: "Surel tidak boleh kosong",
    name: "Nama tidak boleh kosong",
    position: "Jabatan tidak boleh kosng",
    phone: "No Handphone tidak boleh kosong",
    status: "Belum memilih status perusahaan",
    notPick: "Belum memilih data, Pilih terlebih dahulu",
    province: "Belum memilih provinsi asal",
    regency: "Belum memlihi kota asal",
  };

  const {
    handleInput,
    province,
    regency,
    handleSearchDonatur,
    handleSelectedDonatur,
  } = controller;

  const onChange = (e: any) => {
    handleInput(e);
  };

  const isValid = (phoneNumber) => {
    if (phoneNumber[0] === "+") {
      return Number(phoneNumber[3]) !== 0 ? true : false;
    } else {
      return Number(phoneNumber[0]) !== 0 ? true : false;
    }
  };

  const handleSubmitInput = async (e) => {
    setLoading(true);
    if (_.isEmpty(errors)) {
      if (controller.selected) {
        history.push(
          `/dashboard/donation/corporate/transaction/${controller.DonationInfo.donor_id}`
        );
      } else {
        if (isValid(phone)) {
          setError(false);
          const [status, response] = await controller.postData();
          if (status === "error") {
            setLoading(false);
            if (response !== undefined) {
              if (response.status === 400 || response.status === 402) {
                if (
                  response.data.message ===
                  "Nama dan Nomor Handphone yang sama ditemukan dalam database"
                ) {
                  setStatusModal(true);
                } else if (
                  response.data.message === "Nama perusahaan telah terdaftar"
                ) {
                  addToast(
                    `${response.data.message}. Silahkan gunakan fitur search`,
                    {
                      appearance: "error",
                    }
                  );
                } else {
                  addToast(response.data.message, {
                    appearance: "error",
                  });
                }
              } else {
                addToast(response.data.message, {
                  appearance: "error",
                });
              }
            }
          } else {
            addToast("Data donatur telah tersimpan", {
              appearance: "success",
            });
            setTimeout(() => {
              history.push(
                `/dashboard/donation/corporate/transaction/${response.data.data.id}`
              );
            }, 1000);
          }
        } else {
          setError(true);
          setLoading(false);
        }
      }
    }
  };

  const handleUpdateInput = async () => {
    const [status, response] = await controller.postUpdateData();
    if (status === "success") {
      addToast("Data donatur telah berhasil diperbarui", {
        appearance: "success",
      });
      setTimeout(() => {
        history.push(
          `/dashboard/corporate/transaction/${response.data.data.id}`
        );
      }, 1000);
    } else {
      if (response !== undefined) {
        if (response.status === 400 || response.status === 402) {
          addToast(response.data.message, {
            appearance: "error",
          });
        } else {
          addToast(response.data.message, {
            appearance: "error",
          });
        }
      }
    }
  };

  console.log(controller);
  return (
    <React.Fragment>
      <Paper>
        <GridContainer>
          <GridItem sm={12} md={12}>
            <form onSubmit={handleSubmit(handleSubmitInput)}>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer className={classes.formSearch}>
                  <GridItem xs={0} sm={0} md={8}></GridItem>
                  <GridItem xs={12} sm={6} md={4}>
                    <AutoSearch
                      value={controller.search}
                      data={controller.optionsDonatur}
                      handleChange={handleSearchDonatur}
                      onSelect={handleSelectedDonatur}
                      placeholder="Cari Nama atau Nomor Handphone Donatur"
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <Card className={classes.container}>
                      <GridItem xs={12} sm={16} md={12}>
                        <Box display="flex" flexDirection="column">
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>
                              Status Perusahaan
                            </label>
                          </GridItem>
                          <div className={classes.formSearch}>
                            <Controller
                              as={
                                <SimpleSelect
                                  async={false}
                                  onChange={onChange}
                                  disabled={controller.selected}
                                  value={status || ""}
                                  data={CoorporateStatus.slice(4, -1)}
                                  name="status"
                                  label="Status Perusahaan atau Organisasi"
                                />
                              }
                              name="status"
                              onChange={(value) => {
                                onChange(value[0]);
                                return value[0].target.value;
                              }}
                              rules={{ required: true }}
                              control={control}
                              defaultValue={status}
                            />
                            {errors &&
                              errors.status &&
                              errors.status.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.status}
                                </p>
                              )}
                          </div>
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>
                              Nama Perusahaan/Organisasi/Institusi
                            </label>
                          </GridItem>
                          <TextField
                            id="company_name"
                            name="company_name"
                            variant="outlined"
                            type="text"
                            placeholder=" Nama Perusahaan/Organisasi/Institusi"
                            onChange={onChange}
                            disabled={
                              controller.selectedDonatur.company_name !==
                              undefined
                                ? true
                                : false
                            }
                            inputRef={register({ required: true })}
                            className={
                              errors && errors.company_name
                                ? "invalid"
                                : "validate"
                            }
                          />
                          {errors &&
                            errors.company_name &&
                            errors.company_name.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {errorMessage.companyName}
                              </p>
                            )}
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>Alamat</label>
                          </GridItem>
                          <Controller
                            as={
                              <textarea
                                className="text-area"
                                id="address"
                                name="address"
                                placeholder="Alamat"
                                disabled={controller.selected}
                                onChange={onChange}
                                style={{
                                  minHeight: "100px",
                                  width: "100%",
                                }}
                              />
                            }
                            name="address"
                            onChange={(value) => {
                              onChange(value[0]);
                              return value[0].target.value;
                            }}
                            rules={{ required: true }}
                            control={control}
                            defaultValue={address}
                          />
                          {errors &&
                            errors.address &&
                            errors.address.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {errorMessage.address}
                              </p>
                            )}
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>Provinsi</label>
                          </GridItem>

                          <Controller
                            as={
                              <SelectWithSearch
                                async
                                isDisabled={controller.selected}
                                onChange={(selectedValue) => {
                                  const e = {
                                    target: {
                                      name: "province_id",
                                      value: selectedValue.value,
                                    },
                                  };
                                  onChange(e);
                                }}
                                value={province_id}
                                data={province}
                                name="province_id"
                                label="Provinsi"
                                placeholder={province_id || "Pilih Provinsi"}
                              />
                            }
                            name="province_id"
                            rules={{ required: true }}
                            control={control}
                            onChange={(selectedValue) => {
                              const e = {
                                target: {
                                  name: "province_id",
                                  value: selectedValue[0].value,
                                },
                              };
                              onChange(e);
                              return selectedValue[0].value;
                            }}
                            defaultValue={province_id}
                          />
                          {errors &&
                            errors.province_id &&
                            errors.province_id.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {errorMessage.province}
                              </p>
                            )}
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>Kota</label>
                          </GridItem>
                          <Controller
                            as={
                              <SelectWithSearch
                                async
                                isDisabled={controller.selected}
                                onChange={(selectedValue) => {
                                  const e = {
                                    target: {
                                      name: "regency_id",
                                      value: selectedValue.value,
                                    },
                                  };
                                  onChange(e);
                                }}
                                value={regency_id}
                                data={regency}
                                name="regency_id"
                                label="Kota"
                                placeholder={regency_id || "Pilih Kota"}
                              />
                            }
                            name="regency_id"
                            rules={{ required: true }}
                            control={control}
                            onChange={(selectedValue) => {
                              const e = {
                                target: {
                                  name: "regency_id",
                                  value: selectedValue[0].value,
                                },
                              };
                              onChange(e);
                              return selectedValue[0].value;
                            }}
                            defaultValue={regency_id}
                          />

                          {errors &&
                            errors.regency_id &&
                            errors.regency_id.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {errorMessage.regency}
                              </p>
                            )}
                          <GridItem xs={12} sm={12} md={12}>
                            <label htmlFor="zipcode" className={classes.label}>
                              Kode Pos
                            </label>
                          </GridItem>
                          <TextField
                            variant="outlined"
                            id="pos_code"
                            name="pos_code"
                            type="text"
                            style={{ width: "100%" }}
                            disabled={controller.selected}
                            placeholder="Kode Pos"
                            onChange={onChange}
                            inputRef={register({
                              required: true,
                              pattern: /^[0-9]*$/i,
                            })}
                            className={
                              errors && errors.pos_code ? "invalid" : "validate"
                            }
                          />
                          {errors &&
                            errors.pos_code &&
                            errors.pos_code.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {errorMessage.pos_code}
                              </p>
                            )}
                          {errors &&
                            errors.pos_code &&
                            errors.pos_code.type === "pattern" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Hanya Boleh diisi dengan angka
                              </p>
                            )}
                          <GridItem xs={12} sm={12} md={12}>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "10px",
                              }}
                            >
                              <label className={classes.label}>
                                Surel Perusahaan
                              </label>
                              <label className={classes.labelOpsional}>
                                Opsional
                              </label>
                            </Box>
                          </GridItem>
                          <TextField
                            id="email"
                            name="email"
                            disabled={controller.selected}
                            variant="outlined"
                            type="email"
                            style={{ width: "100%" }}
                            placeholder="Alamat Surel"
                            onChange={onChange}
                            inputRef={register}
                          />
                        </Box>
                      </GridItem>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Card className={classes.container}>
                      <GridItem xs={12} sm={12} md={12}>
                        <Box display="flex" flexDirection="column">
                          <h2 className="black-text">Kontak Donatur</h2>
                          <label className={classes.label}>
                            Nama Kontak Person
                          </label>
                          <TextField
                            id="name"
                            name="name"
                            variant="outlined"
                            disabled={controller.selected}
                            type="text"
                            placeholder="Nama Kontak Person"
                            onChange={onChange}
                            inputRef={register({ required: true })}
                            className={
                              errors && errors.name ? "invalid" : "validate"
                            }
                          />
                          {errors &&
                            errors.name &&
                            errors.name.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {errorMessage.name}
                              </p>
                            )}
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "10px",
                            }}
                          >
                            <label className={classes.label}>
                              Jabatan Kontak Person
                            </label>
                            <label className={classes.labelOpsional}>
                              Opsional
                            </label>
                          </Box>
                          <TextField
                            id="position"
                            name="position"
                            variant="outlined"
                            type="text"
                            disabled={controller.selected}
                            placeholder="Jabatan Kontak Person"
                            onChange={onChange}
                            inputRef={register}
                            className={
                              errors && errors.position ? "invalid" : "validate"
                            }
                          />
                          {errors &&
                            errors.position &&
                            errors.position.type === "required" && (
                              <div className="red-text error-message">
                                {errorMessage.position}
                              </div>
                            )}
                          <label className={classes.label}>No Handphone</label>
                          <Controller
                            as={
                              <InputMask
                                mask="+6299 999 999 999"
                                disabled={controller.selected}
                                maskChar=" "
                              >
                                {() => (
                                  <TextField
                                    style={{
                                      width: "100%",
                                    }}
                                    variant="outlined"
                                    name="phone"
                                    id="phone"
                                    disabled={controller.selected}
                                    placeholder="Contoh: +628567XXXXXXX"
                                    size="small"
                                  />
                                )}
                              </InputMask>
                            }
                            control={control}
                            name="phone"
                            onChange={(e) => {
                              onChange(e[0]);
                              return e[0].target.value;
                            }}
                            rules={{ required: true }}
                            defaultValue={phone}
                          />

                          {errors &&
                            errors.phone &&
                            errors.phone.type === "required" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {errorMessage.phone}
                              </p>
                            )}
                          {error && isValid(phone) === false && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              No Handphone tidak valid. Silahkan coba kembali
                            </p>
                          )}

                          <h2 className="black-text">Keterangan Tambahan</h2>
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "10px",
                            }}
                          >
                            <label htmlFor="npwp" className={classes.label}>
                              No NPWP
                            </label>
                            <label className={classes.labelOpsional}>
                              Opsional
                            </label>
                          </Box>
                          <TextField
                            id="npwp"
                            name="npwp"
                            variant="outlined"
                            type="text"
                            disabled={controller.selected}
                            placeholder="No NPWP"
                            inputRef={register({ pattern: /^[0-9]*$/i })}
                            onChange={onChange}
                          />
                          {errors &&
                            errors.npwp &&
                            errors.npwp.type === "pattern" && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Hanya Boleh diisi dengan angka
                              </p>
                            )}
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "10px",
                            }}
                          >
                            <label
                              htmlFor="info-donatur"
                              className={classes.label}
                            >
                              Info Donatur
                            </label>
                            <label className={classes.labelOpsional}>
                              Opsional
                            </label>
                          </Box>
                          <Controller
                            as={
                              <TextareaAutosize
                                className="text-area"
                                id="info"
                                disabled={controller.selected}
                                name="info"
                                placeholder="Info Donatur"
                                onChange={onChange}
                                style={{
                                  minHeight: "100px",
                                  width: "100%",
                                }}
                              />
                            }
                            name="info"
                            onChange={(value) => {
                              onChange(value[0]);
                              return value[0].target.value;
                            }}
                            control={control}
                            defaultValue={info}
                          />
                        </Box>
                      </GridItem>
                    </Card>
                  </GridItem>
                </GridContainer>
              </GridItem>

              <ModalWarningData
                showModal={statusModal}
                setShowModal={() => setStatusModal(false)}
                donor={{
                  name: `${name}`,
                  phone: `${phone}`,
                  address: `${address}`,
                }}
                errorMessage="Nama dan No HP. sama dalam database"
                handleClickCTA={() => handleUpdateInput()}
              />
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    style={{ marginTop: "2vh" }}
                  >
                    <div className="right mt-4 mr-4 mb-4 ml-4">
                      {controller.selected === false &&
                      controller.selectedDonatur.company_name !== undefined ? (
                        <Button
                          style={{
                            background: "white",
                            color: "#00923F",
                            fontWeight: "bold",
                            border: " 2px solid #00923F",
                            marginRight: "20px",
                          }}
                          onClick={(e) => controller.handleResetForm()}
                        >
                          Reset form
                        </Button>
                      ) : (
                        <Button
                          style={{
                            background: "white",
                            color: "#00923F",
                            fontWeight: "bold",
                            border: " 2px solid #00923F",
                            marginRight: "20px",
                          }}
                          onClick={(e) => controller.setSelected(false)}
                        >
                          Ubah Data
                        </Button>
                      )}
                    </div>
                    <div className="right mt-4 mr-4 mb-4 ml-4">
                      <Button
                        style={{
                          background: "#00923F",
                          color: "#fff",

                          fontWeight: "bold",
                        }}
                        type="submit"
                        color="success"
                        loading={loading}
                        disabled={loading}
                        onClick={(e) => null}
                      >
                        Simpan & Lanjutkan
                      </Button>
                    </div>
                  </Box>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </Paper>
    </React.Fragment>
  );
};

export default DonorInput;
