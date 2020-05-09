import React, { useState, useContext } from "react";
import { RetailContext } from "../Controller";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import {
  Box,
  Theme,
  createStyles,
  makeStyles,
  TextareaAutosize,
  TextField,
  Paper,
} from "@material-ui/core";
import Card from "@/app/container/commons/Card/Card";
import CardHeader from "@/app/container/commons/Card/CardHeader";
import CardBody from "@/app/container/commons/Card/CardBody";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import AutoSearch from "@/app/container/components/AutoCompleteSearch";
import SimpleSelect from "@/app/container/components/SelectMUI";
import ModalWarningData from "./ModalWarningData";
import _ from "lodash";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import InputMask from "react-input-mask";

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0",
    },
    formContainer: {
      marginTop: theme.spacing(2),
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
    modal: {
      marginTop: "5vh",
    },
  })
);

const DonorInput = ({ index, setIndex }) => {
  const controller = useContext(RetailContext);
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setValue,
  } = useForm();
  const history = useHistory();
  const classes = useStyles();
  const { addToast } = useToasts();
  const [statusModal, setStatusModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    handleInput,
    province,
    regency,
    handleSearchDonatur,
    handleSelectedDonatur,
  } = controller;

  const {
    address,
    npwp,
    info,
    province_id,
    pos_code,
    regency_id,
    status,
    phone,
    email,
    name,
  } = controller.DonaturInfo;

  React.useEffect(() => {
    setValue([
      { address: address },
      { npwp: npwp },
      { info: info },
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

  const handleSubmitInput = async (e) => {
    setLoading(true);
    if (_.isEmpty(errors)) {
      if (controller.selected) {
        history.push(
          `/dashboard/retail-input/${controller.DonationInfo.donor_id}`
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
              history.push(`/dashboard/retail-input/${response.data.data.id}`);
            }, 1000);
          }
        } else {
          setLoading(false);
          setError(true);
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
        history.push(`/dashboard/retail-input/${response.data.data.id}`);
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

  const onChange = (e: any) => {
    handleInput(e);
  };

  const [selectedValue, setSelectedValue] = React.useState("1");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={innerTheme}>
        <Paper>
          <form onSubmit={handleSubmit(handleSubmitInput)}>
            <GridContainer>
              <GridItem sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
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
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <Box className={classes.modal}>
                      <Card>
                        <CardHeader>
                          <h2 className="black-text">Status</h2>
                        </CardHeader>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <Box
                                display="flex"
                                flexDirection="row"
                                marginLeft="20px"
                              >
                                <FormGroup row>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={status === 1}
                                        onChange={(e) => {
                                          const data = {
                                            target: {
                                              name: "status",
                                              value: 1,
                                            },
                                          };
                                          onChange(data);
                                        }}
                                        name="status"
                                        inputRef={register}
                                        disabled={controller.selected}
                                        color="primary"
                                      />
                                    }
                                    label="Bapak"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={status === 2}
                                        onChange={(e) => {
                                          const data = {
                                            target: {
                                              name: "status",
                                              value: 2,
                                            },
                                          };
                                          onChange(data);
                                        }}
                                        name="status"
                                        inputRef={register}
                                        disabled={controller.selected}
                                        color="primary"
                                      />
                                    }
                                    label="Ibu"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={status === 3}
                                        onChange={(e) => {
                                          const data = {
                                            target: {
                                              name: "status",
                                              value: 3,
                                            },
                                          };
                                          onChange(data);
                                        }}
                                        name="status"
                                        inputRef={register}
                                        disabled={controller.selected}
                                        color="primary"
                                      />
                                    }
                                    label="Saudara"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={status === 4}
                                        onChange={(e) => {
                                          const data = {
                                            target: {
                                              name: "status",
                                              value: 4,
                                            },
                                          };
                                          onChange(data);
                                        }}
                                        name="status"
                                        inputRef={register}
                                        disabled={controller.selected}
                                        color="primary"
                                      />
                                    }
                                    label="Saudari"
                                    labelPlacement="end"
                                  />
                                </FormGroup>
                              </Box>
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <GridItem xs={12} sm={12} md={12}>
                                <label className={classes.label}>
                                  Nama Lengkap
                                </label>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <TextField
                                  name="name"
                                  placeholder="Nama Lengkap"
                                  type="text"
                                  variant="outlined"
                                  style={{ width: "100%" }}
                                  onChange={onChange}
                                  disabled={controller.selected}
                                  inputRef={register({ required: true })}
                                />
                                {errors &&
                                  errors.name &&
                                  errors.name.type === "required" && (
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {errorMessage.name}
                                    </p>
                                  )}
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <GridContainer>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <label className={classes.label}>
                                      Alamat Tinggal
                                    </label>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <Box className={classes.formControl}>
                                      <Controller
                                        as={
                                          <textarea
                                            className="text-area"
                                            id="address"
                                            name="address"
                                            placeholder="Alamat Tinggal"
                                            value={address}
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
                                          <p
                                            style={{
                                              color: "red",
                                              fontSize: "12px",
                                            }}
                                          >
                                            {errorMessage.address}
                                          </p>
                                        )}
                                    </Box>
                                  </GridItem>
                                </GridContainer>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <GridContainer>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <label className={classes.formControl}>
                                      Provinsi
                                    </label>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <Box className={classes.formControl}>
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
                                        errors.province_id.type ===
                                          "required" && (
                                          <p
                                            style={{
                                              color: "red",
                                              fontSize: "12px",
                                            }}
                                          >
                                            {errorMessage.province}
                                          </p>
                                        )}
                                    </Box>
                                  </GridItem>
                                </GridContainer>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <GridContainer>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <label className={classes.formControl}>
                                      Kota
                                    </label>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={12}>
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
                                        <p
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {errorMessage.regency}
                                        </p>
                                      )}
                                  </GridItem>
                                </GridContainer>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <label className={classes.label}>
                                  Kode Pos
                                </label>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <Box className={classes.formControl}>
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
                                      errors && errors.pos_code
                                        ? "invalid"
                                        : "validate"
                                    }
                                  />
                                  {errors &&
                                    errors.pos_code &&
                                    errors.pos_code.type === "required" && (
                                      <p
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {errorMessage.pos_code}
                                      </p>
                                    )}
                                  {errors &&
                                    errors.pos_code &&
                                    errors.pos_code.type === "pattern" && (
                                      <p
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        Hanya Boleh diisi dengan angka
                                      </p>
                                    )}
                                </Box>
                              </GridItem>
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Box className={classes.modal}>
                      <Card>
                        <CardHeader>
                          <h2 className="black-text">Kontak Donatur</h2>
                        </CardHeader>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <GridItem xs={12} sm={12} md={12}>
                                <label className={classes.formControl}>
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
                                      size="small"
                                      inputRef={register({
                                        required: true,
                                      })}
                                    />
                                  )}
                                </InputMask>
                                {errors &&
                                  errors.phone &&
                                  errors.phone.type === "required" && (
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {errorMessage.phone}
                                    </p>
                                  )}
                                {error && Number(phone[4]) === 0 && (
                                  <p style={{ color: "red", fontSize: "12px" }}>
                                     No Handphone tidak valid. Silahkan coba kembali. Contoh: +62857xxxxxx
                                  </p>
                                )}
                            
                              </GridItem>
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <GridItem xs={12} sm={12} md={12}>
                                <label className={classes.formControl}>
                                  Alamat Surel
                                </label>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <Box className={classes.formControl}>
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
                              <GridItem xs={12} sm={12} md={12}>
                                <h2 className="black-text">
                                  Keterangan Tambahan
                                </h2>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <label htmlFor="npwp" className="black-text">
                                  No NPWP
                                </label>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <Box className={classes.formControl}>
                                  <TextField
                                    id="npwp"
                                    disabled={controller.selected}
                                    name="npwp"
                                    variant="outlined"
                                    type="text"
                                    inputRef={register({
                                      pattern: /^[0-9]*$/i,
                                    })}
                                    style={{ width: "100%" }}
                                    placeholder="No NPWP"
                                    onChange={onChange}
                                  />
                                </Box>
                                {errors &&
                                  errors.npwp &&
                                  errors.npwp.type === "pattern" && (
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      Hanya Boleh diisi dengan angka
                                    </p>
                                  )}
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <label className={classes.formControl}>
                                  Info Donatur
                                </label>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <Box className={classes.formControl}>
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
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    </Box>
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
                          color="primary"
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
              </GridItem>
            </GridContainer>
          </form>
        </Paper>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default DonorInput;
