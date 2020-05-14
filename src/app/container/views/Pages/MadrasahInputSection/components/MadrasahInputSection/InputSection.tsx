import React from "react";
import { UserInputContext, ActionType } from "../../Controller";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";
import history from "@/app/infrastructures/misc/BrowserHistory";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import MomentUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import SelectWithSearch from "@/app/container/components/SelectWithSearch";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import { green } from "@material-ui/core/colors";
import idLocale from "date-fns/locale/id";
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
      height: 20,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    label: {
      color: "#757575",
    },
    input: {
      height: 10,
    },
    inputTextarea: {
      height: 20,
    },
    loadingReset: {
      color: "#00923F",
    },
    labelOpsional: {
      color: "#BCBCBC",
      fontSize: "14px",
      fontWeight: "bold",
    },
  })
);

const errorMessage = {
  name: "Nama Lengkap tidak boleh kosong",
  school_id: "Belum memilih asal Unit",
  place_of_birth: "Tempat lahir tidak boleh kosong",
  birth_of_date: "Tanggal Dibuka tidak boleh kosong",
  phone: "No HP / Telp tidak boleh kosong",
  email: "Email tidak boleh kosong",
  address: "Alamat tidak boleh kosong",
  status: "Status pegawai tidak boleh kosong ",
  registered_year: "Tahun masuk tidak boleh kosong",
  pos_code: "Kode pos tidak boleh kosong",
  province_id: "Belum memilih provinsi asal",
  regency_id: "Belum memilih kota asal",
};

const SectionInput = () => {
  const controller = React.useContext(UserInputContext);
  const [processing, setProccessing] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [error, setError] = React.useState(false);

  const { register, handleSubmit, errors, control, setValue } = useForm();

  const classes = useStyles();

  const handleChange = (e) => {
    controller.handleInput(e)(controller.dispatch)(ActionType.handleInput);
  };

  const { addToast } = useToasts();

  const {
    name,
    phone,
    email,
    address,
    pos_code,
    province_id,
    regency_id,
    description,
    user_id,
    opened_at,
    id,
  } = controller.inputSchoolData;

  const isValid = (phoneNumber) => {
    if (phoneNumber[0] === "+") {
      return Number(phoneNumber[3]) !== 0 ? true : false;
    } else {
      return Number(phoneNumber[0]) !== 0 ? true : false;
    }
  };

  const onSubmit = async (e) => {
    setLoadingSubmit(true);
    setSubmit(true);
    if (_.isEmpty(errors)) {
      if (isValid(phone)) {
        setError(false);
        const [status, response] = await controller.handleSubmit(e)(
          controller.dispatch
        );
        if (status === "success") {
          addToast("Data ma`had telah tersimpan", { appearance: "success" });
          setTimeout(() => {
            history.push("/dashboard/madrasah");
          }, 1000);
        } else {
          setLoadingSubmit(false);
          if (response !== undefined) {
            if (response.status === 422) {
              addToast(response.data.message, { appearance: "error" });
            } else if (response.status === 400) {
              addToast(response.data.message, { appearance: "error" });
            } else if (response.status === 500) {
              addToast(
                "Tidak dapat menyimpan data ma`had karena gangguan server",
                { appearance: "error" }
              );
            } else {
              addToast("Tidak dapat menyimpan data ma`had ke sever", {
                appearance: "error",
              });
            }
          } else {
            addToast(
              "Tidak dapat menyimpan data ma`had karena gangguan server",
              {
                appearance: "error",
              }
            );
          }
        }
      } else {
        setError(true);
        setLoadingSubmit(false);
      }
    }
  };

  React.useEffect(() => {
    setProccessing(true);
    if (opened_at == "") {
      setValue([
        { name: name },
        { phone: phone },
        { email: email },
        { address: address },
        { pos_code: pos_code },
        { province_id: province_id },
        { regency_id: regency_id },
        { description: description },
        { user_id: user_id },
        { opened_at: null },
        { id: id },
      ]);
    } else {
      setValue([
        { name: name },
        { phone: phone },
        { email: email },
        { address: address },
        { pos_code: pos_code },
        { province_id: province_id },
        { regency_id: regency_id },
        { description: description },
        { user_id: user_id },
        { opened_at: opened_at },
        { id: id },
      ]);
    }
    setProccessing(false);
  }, [controller.inputSchoolData]);

  if (controller.loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyItems="center"
        alignItems="center"
      >
        <div
          style={{
            height: "100vh",
          }}
        >
          <CircularProgress size={16} className={classes.loadingReset} />
          loading
        </div>
      </Box>
    );
  }


  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={idLocale}>
      <ThemeProvider theme={innerTheme}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  {controller.inputSchoolData.id === "" || undefined ? (
                    <div />
                  ) : (
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginTop: "5vh" }}
                    >
                      <label
                        className={
                          errors && errors.address ? "red-text" : "black-text"
                        }
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        ID Ma'had
                      </label>
                      <TextField
                        id="id"
                        name="id"
                        type="text"
                        style={{
                          width: "100%",
                        }}
                        disabled
                        value={controller.inputSchoolData.id.toString()}
                        placeholder="ID Ma'had"
                        onChange={handleChange}
                      />
                    </GridItem>
                  )}

                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ marginTop: "5vh" }}
                  >
                    <label
                      className={
                        errors && errors.address ? "red-text" : "black-text"
                      }
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      Nama Ma'had
                    </label>
                    <TextField
                      label=""
                      style={{
                        width: "100%",
                        background: "white",
                      }}
                      id={
                        errors && errors.name && errors.name.type === "required"
                          ? "filled-error-helper-text"
                          : "name"
                      }
                      variant="outlined"
                      type="text"
                      name="name"
                      placeholder="Nama Ma'had"
                      // value={controller.inputSchoolData.name}
                      InputProps={
                        processing
                          ? {
                              classes: { input: classes.input },
                              endAdornment: (
                                <CircularProgress
                                  className={classes.loadingReset}
                                  size={14}
                                />
                              ),
                            }
                          : { classes: { input: classes.input } }
                      }
                      onChange={handleChange}
                      inputRef={register({
                        required: "Tidak boleh kosong",
                      })}
                    />
                    {errors &&
                      errors.name &&
                      errors.name.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errorMessage.name}
                        </p>
                      )}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ marginTop: "5vh" }}
                  >
                    <label
                      htmlFor="address"
                      className={
                        errors && errors.address ? "red-text" : "black-text"
                      }
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      Alamat Ma'had
                    </label>
                    <TextField
                      // value={controller.inputSchoolData.address || ''}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        background: "white",
                      }}
                      type="text"
                      name="address"
                      rows={4}
                      id="standard-textarea"
                      variant="outlined"
                      placeholder="Alamat"
                      inputRef={register({
                        required: true,
                      })}
                      multiline
                      InputProps={
                        processing
                          ? {
                              classes: { input: classes.inputTextarea },
                              endAdornment: (
                                <CircularProgress
                                  className={classes.loadingReset}
                                  size={14}
                                />
                              ),
                            }
                          : { classes: { input: classes.inputTextarea } }
                      }
                    />
                    {errors &&
                      errors.address &&
                      errors.address.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errorMessage.address}
                        </p>
                      )}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ marginTop: "5vh" }}
                  >
                    <label
                      htmlFor="address"
                      className={
                        errors && errors.address ? "red-text" : "black-text"
                      }
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      Pilih Provinsi
                    </label>
                    <Controller
                      as={
                        <SelectWithSearch
                          async
                          isDisabled={false}
                          onChange={(selectedValue) => {
                            const e = {
                              target: {
                                name: "province_id",
                                value: selectedValue.value,
                              },
                            };
                            handleChange(e);
                          }}
                          value={controller.inputSchoolData.province_id || ""}
                          data={controller.province || ""}
                          name="province_id"
                          label="Provinsi"
                          placeholder={
                            controller.inputSchoolData.province_id ||
                            "Pilih Provinsi"
                          }
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
                        handleChange(e);
                        return selectedValue[0].value;
                      }}
                      defaultValue={province_id}
                    />
                    {errors &&
                      errors.province_id &&
                      errors.province_id.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          Silahkan Pilih Provinsi Terlebih Dahulu
                        </p>
                      )}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ marginTop: "5vh" }}
                  >
                    <label
                      htmlFor="address"
                      className={
                        errors && errors.address ? "red-text" : "black-text"
                      }
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      Pilih Kota
                    </label>
                    <Controller
                      as={
                        <SelectWithSearch
                          async
                          isDisabled={false}
                          onChange={(value) => {
                            const e = {
                              target: {
                                name: "regency_id",
                                value: value.value,
                              },
                            };
                            handleChange(e);
                          }}
                          value={controller.inputSchoolData.regency_id || ""}
                          data={controller.city}
                          name="regency_id"
                          label="Kota"
                          placeholder={
                            controller.inputSchoolData.regency_id ||
                            "Pilih Kota"
                          }
                        />
                      }
                      name="regency_id"
                      rules={{ required: true }}
                      control={control}
                      onChange={(value) => {
                        const e = {
                          target: {
                            name: "regency_id",
                            value: value[0].value,
                          },
                        };
                        handleChange(e);
                        return value[0].value;
                      }}
                      defaultValue={regency_id}
                    />
                    {errors &&
                      errors.regency_id &&
                      errors.regency_id.type === "required" && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          Silahkan Pilih Kab / Kota Terlebih Dahulu
                        </p>
                      )}
                  </GridItem>
                  <Box display="flex" flexDirection="row">
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ marginTop: "5vh" }}
                    >
                      <label
                        htmlFor="pos_code"
                        className={
                          errors && errors.pos_code ? "red-text" : "black-text"
                        }
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        Kode Pos
                      </label>
                      <TextField
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          background: "white",
                        }}
                        id="pos_code"
                        variant="outlined"
                        type="text"
                        name="pos_code"
                        placeholder="Kode Pos"
                        inputRef={register({
                          required: true,
                          pattern: /^[0-9]*$/i,
                        })}
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
                            Kode pos hanya boleh diisi dengan angka
                          </p>
                        )}
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ marginTop: "5vh" }}
                    >
                      <label
                        htmlFor="birth_of_date"
                        className={
                          errors && errors.opened_at ? "red-text" : "black-text"
                        }
                        style={{
                          marginTop: "5vh",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Tanggal Dibuka
                      </label>
                      <Controller
                        as={
                          <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            style={{
                              height: "5px !important",
                              background: "white",
                            }}
                            placeholder={
                              controller.inputSchoolData.opened_at === ""
                                ? "Tanggal Dibuka"
                                : controller.inputSchoolData.opened_at
                            }
                            format="dd/MM/yyyy"
                            value={
                              controller.inputSchoolData.opened_at === ""
                                ? null
                                : moment(
                                    controller.inputSchoolData.opened_at
                                  ).toDate()
                            }
                            onChange={(date: any) => {
                              const data = {
                                target: {
                                  name: "opened_at",
                                  value: moment(date).toISOString(),
                                },
                              };
                              handleChange(data);
                            }}
                            inputRef={register({ required: true })}
                          />
                        }
                        name="opened_at"
                        rules={{ required: true }}
                        control={control}
                        onChange={(date: any) => {
                          const data = {
                            target: {
                              name: "opened_at",
                              value: moment(date[0]).toISOString(),
                            },
                          };
                          handleChange(data);
                          return moment(date[0]).toString();
                        }}
                        defaultValue={
                          opened_at === "" ? null : moment(opened_at).toDate()
                        }
                      />

                      {errors &&
                        errors.opened_at &&
                        errors.opened_at.type === "required" && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {errorMessage.birth_of_date}
                          </p>
                        )}
                    </GridItem>
                  </Box>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  style={{
                    paddingTop: "15%",
                  }}
                >
                  <Box>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginTop: "10vh" }}
                    >
                      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Kontak Ma'had
                      </span>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginTop: "5vh" }}
                    >
                      <label
                        htmlFor="phone"
                        className={
                          errors && errors.phone ? "red-text" : "black-text"
                        }
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        No Telp / HP
                      </label>
                      <Controller
                        as={
                          <InputMask mask="+6299 999 999 999" maskChar=" ">
                            {() => (
                              <TextField
                                style={{
                                  width: "100%",
                                  background: "white",
                                }}
                                variant="outlined"
                                name="phone"
                                id="phone"
                                placeholder="Contoh: +628567XXXXXXX"
                                size="small"
                              />
                            )}
                          </InputMask>
                        }
                        control={control}
                        name="phone"
                        onChange={(e) => {
                          handleChange(e[0]);
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
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginTop: "5vh" }}
                    >
                      <label
                        htmlFor="email"
                        className={
                          errors && errors.email ? "red-text" : "black-text"
                        }
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        Email
                      </label>
                      <TextField
                        onChange={handleChange}
                        placeholder="Alamat surel"
                        style={{
                          width: "100%",
                          background: "white",
                        }}
                        id="email"
                        variant="outlined"
                        type="email"
                        name="email"
                        inputRef={register({
                          required: true,
                        })}
                      />
                      {errors &&
                        errors.email &&
                        errors.email.type === "required" && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {errorMessage.email}
                          </p>
                        )}
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ marginTop: "5vh" }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <label
                          htmlFor="description"
                          className={
                            errors && errors.description
                              ? "red-text"
                              : "black-text"
                          }
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >
                          Info lain
                        </label>
                        <label className={classes.labelOpsional}>
                          Opsional
                        </label>
                      </Box>

                      <TextField
                        // value={controller.inputSchoolData.description || ''}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          background: "white",
                        }}
                        id="description"
                        variant="outlined"
                        type="text"
                        name="description"
                        placeholder="Info Lain"
                        inputRef={register}
                      />
                    </GridItem>
                  </Box>
                </GridItem>
              </GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{ marginTop: "5vh" }}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  style={{ marginRight: "5vw" }}
                >
                  <Button
                    style={{
                      color: "#fff",
                      marginTop: "40px",
                      width: "174px",
                      height: "49px",
                    }}
                    loading={loadingSubmit}
                    disabled={loadingSubmit}
                    color="primary"
                    type="submit"
                    onClick={(e) => null}
                  >
                    SIMPAN
                  </Button>
                </Box>
              </GridItem>
            </Box>
          </form>
        </div>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default SectionInput;
