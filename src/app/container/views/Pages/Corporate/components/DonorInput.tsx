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
      marginTop: "2vh",
      marginBottom: "2vh",
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
    e.persist();
    handleInput(e);
  };

  const handleSubmitInput = async (e) => {
    setLoading(true);
    if (_.isEmpty(errors)) {
      if (controller.selected) {
        history.push(
          `/dashboard/corporate-transaction/${controller.DonationInfo.donor_id}`
        );
      } else {
        if (Number(phone[4]) !== 0) {
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
                `/dashboard/corporate-transaction/${response.data.data.id}`
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
          `/dashboard/corporate-transaction/${response.data.data.id}`
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

  return (
    <React.Fragment>
      <Paper>
        <GridContainer>
          <GridItem sm={12} md={12}>
            <form onSubmit={handleSubmit(handleSubmitInput)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer className={classes.formSearch}>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        className={classes.formSearch}
                      >
                        <AutoSearch
                          value={controller.search}
                          data={controller.optionsDonatur}
                          handleChange={handleSearchDonatur}
                          onSelect={handleSelectedDonatur}
                          placeholder="Cari Donatur"
                        />
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <Card className={classes.container}>
                    <GridItem xs={12} sm={16} md={12}>
                      <Box display="flex" flexDirection="column">
                        <GridItem xs={12} sm={12} md={12}>
                          <label>Status Perusahaan</label>
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
                          <label
                            htmlFor="comp-name"
                            className={
                              errors && errors.company_name
                                ? "red-text"
                                : "black-text"
                            }
                          >
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
                          disabled={controller.selected}
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
                          <label
                            htmlFor="comp-address"
                            className={
                              errors && errors.address
                                ? "red-text"
                                : "black-text"
                            }
                          >
                            Alamat
                          </label>
                        </GridItem>
                        <Controller
                          as={
                            <textarea
                              className="text-area"
                              id="address"
                              name="address"
                              placeholder="Alamat Tinggal"
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
                          <label>Provinsi</label>
                        </GridItem>
                        <Controller
                          as={
                            <SimpleSelect
                              async
                              onChange={onChange}
                              disabled={controller.selected}
                              value={province_id || ""}
                              data={province}
                              name="province_id"
                              label="Provinsi"
                            />
                          }
                          name="province_id"
                          onChange={(value) => {
                            onChange(value[0]);
                            return value[0].target.value;
                          }}
                          rules={{ required: true }}
                          control={control}
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
                          <label>Kota</label>
                        </GridItem>
                        <Controller
                          as={
                            <SimpleSelect
                              async
                              onChange={onChange}
                              disabled={controller.selected}
                              value={regency_id || ""}
                              data={regency}
                              name="regency_id"
                              label="Provinsi"
                            />
                          }
                          name="regency_id"
                          onChange={(value) => {
                            onChange(value[0]);
                            return value[0].target.value;
                          }}
                          rules={{ required: true }}
                          control={control}
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
                          <label htmlFor="zipcode">Kode Pos</label>
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
                          <label
                            htmlFor="comp-email"
                            className={
                              errors && errors.email ? "red-text" : "black-text"
                            }
                          >
                            Surel Perusahaan
                          </label>
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
                        <label
                          htmlFor="contact-person"
                          className={
                            errors && errors.name ? "red-text" : "black-text"
                          }
                        >
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
                        <label
                          htmlFor="level-person"
                          className={
                            errors && errors.position
                              ? "red-text"
                              : "black-text"
                          }
                        >
                          Jabatan Kontak Person
                        </label>
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
                        <label
                          htmlFor="phone"
                          className={
                            errors && errors.phone ? "red-text" : "black-text"
                          }
                        >
                          No Handphone
                        </label>
                        <InputMask
                          mask="+62 999 999 999 99"
                          value={phone}
                          disabled={controller.selected}
                          maskChar=" "
                          onChange={onChange}
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
                              type="tel"
                              inputRef={register({
                                required: true,
                              })}
                            />
                          )}
                        </InputMask>
                        {errors &&
                          errors.phone &&
                          errors.phone.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.phone}
                            </p>
                          )}
                        {error && Number(phone[4]) === 0 && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            No Handphone tidak valid. Silahkan coba kembali
                          </p>
                        )}
                     
                        <h2 className="black-text">Keterangan Tambahan</h2>
                        <label htmlFor="npwp" className="black-text">
                          No NPWP
                        </label>
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
                        <label htmlFor="info-donatur" className="black-text">
                          Info Donatur
                        </label>
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
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <Alert severity="info">{infoWarning}</Alert>
                  </GridItem>
                </GridItem>
              </GridContainer>
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
