import React, { useState } from "react";
import { EmployeeStatus } from "@/domain/entities/AllOptions";
import {
  EmployeeInputContext,
  ActionType,
  initialState,
} from "../../Controller";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import history from "@/app/infrastructures/misc/BrowserHistory";
import { useLocation } from "react-router-dom";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
} from "@material-ui/core";
import { Image } from "@material-ui/icons";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import SelectWithSearch from "@/app/container/components/SelectWithSearch";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { green } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import qs from "qs";

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image_box: {
      width: 150,
      height: 150,
      border: "2px dashed #202020",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      marginBottom: 20,
      borderRadius: 10,
      color: "#202020",
    },
    image_preview: {
      backgroundSize: "contain",
      backgroundPosition: "center center",
      border: "2px solid transparent !important",
      width: "150px",
      height: "150px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      marginBottom: "20px",
      borderRadius: "10px",
      color: "#202020",
    },
    input: {
      height: 10,
    },
    inputTextarea: {
      height: 20,
    },
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
    marginBottomTextarea: {
      marginBottom: theme.spacing(4),
    },

    datepicker: {
      height: "50px",
    },
    loadingReset: {
      color: "#00923F",
    },
  })
);

const errorMessage = {
  name: "Nama Lengkap tidak boleh kosong",
  school_id: "Belum memilih asal unit",
  place_of_birth: "Tempat lahir tidak boleh kosong",
  birth_of_date: "Tanggal lahir tidak boleh kosong",
  phone: "Hanya Boleh diisi angka",
  email: "Email tidak boleh kosong",
  address: "Alamat tidak boleh kosong",
  status: "Status pegawai tidak boleh kosong ",
  registered_year: "Tahun masuk tidak boleh kosong",
  pos_code: "Kode pos tidak boleh kosong",
  province_id: "Belum memilih provinsi asal",
  regency_id: "Belum memilih kota asal",
};

const EmployeeInputSection = () => {
  const controller = React.useContext(EmployeeInputContext);
  const [previewImage, setPreviewImage] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isSubmit, setSubmit] = React.useState(false);
  const [processing, setProccessing] = React.useState(false);
  const queryString: number = qs.parse(location.search);

  const [error, setError] = useState({
    province: false,
    school: false,
    regency: false,
    status: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setValue,
  } = useForm();
  const { addToast } = useToasts();
  const classes = useStyles();

  const onChange = (e) => {
    controller.handleInput(e)(controller.dispatch)(
      ActionType.handleEmployeeInputData
    );
  };

  const handleFIle = (e) => {
    controller.handleImageUpload(e)(controller.dispatch)(
      ActionType.handleImageUpload
    );
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(objectURL);
    controller.dispatch({
      type: ActionType.setImagePreview,
      payload: objectURL,
    });
    setUploaded(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmit(true);
    if (_.isEmpty(errors)) {
      const res = await controller.handleSubmit(data)(controller.dispatch);
      if (res !== undefined) {
        if (res.status === 201 || res.status === 200) {
          addToast("Data personel ma`had telah tersimpan", {
            appearance: "success",
          });
          setLoading(false);
          setTimeout(() => {
            history.push("/dashboard/personel");
          }, 2000);
        } else if (res.status === 422) {
          setLoading(false);
          addToast(res.data.message, { appearance: "error" });
        } else if (res.status === 400) {
          addToast(res.data.message, { appearance: "error" });
        } else if (res.status === 500) {
          setLoading(false);
          addToast(
            "Tidak dapat menyimpan data personel ma`had karena gangguan server",
            { appearance: "error" }
          );
        } else {
          setLoading(false);
          addToast("Tidak dapat menyimpan data personel ma`had ke sever", {
            appearance: "error",
          });
        }
      } else {
        setLoading(false);
        addToast(
          "Tidak dapat menyimpan data personel ma`had karena gangguan server",
          { appearance: "error" }
        );
      }
    }
  };

  const watchAllFields = watch();

  const {
    school_id,
    name,
    place_of_birth,
    birth_of_date,
    phone,
    email,
    address,
    status,
    registered_year,
    identity_number,
    pos_code,
    province_id,
    regency_id,
    image,
    id,
  } = controller.employeeInput;

  React.useEffect(() => {
    setProccessing(true);
    setValue([
      { school_id: school_id },
      { name: name },
      { place_of_birth: place_of_birth },
      { birth_of_date: birth_of_date },
      { phone: phone },
      { email: email },
      { address: address },
      { status: status },
      { registered_year: registered_year },
      { identity_number: identity_number },
      { pos_code: pos_code },
      { province_id: province_id },
      { regency_id: regency_id },
      { id: id },
    ]);
    setProccessing(false);
  }, [controller.employeeInput]);



  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={innerTheme}>
        <Box>
          <Paper
            component="div"
            style={{
              minHeight: "100vh",
              height: "100%",
              padding: "10px 30px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <GridContainer
                style={{
                  padding: "30px 30px",
                }}
              >
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={2}>
                      <Box
                        style={{
                          display: "grid",
                          gridTemplateRows: "150px 50px",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          accept="image/*"
                          style={{
                            display: "none",
                          }}
                          id="icon-button-file"
                          type="file"
                          name="file-upload"
                          onChange={handleFIle}
                        />

                        <label htmlFor="icon-button-file">
                          {image.length > 0 ||
                          controller.ImagePreview !== "" ? (
                            <img
                              style={{
                                borderRadius: "10px",
                                border: "2px solid transparent",
                              }}
                              src={controller.ImagePreview}
                              width="150px"
                              height="150px"
                            />
                          ) : (
                            <Box className={classes.image_box}>
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <IconButton>
                                  <Image />
                                </IconButton>
                              </IconButton>
                            </Box>
                          )}
                        </label>

                        {queryString["?detail"] !== undefined ? (
                          <div />
                        ) : (
                          <Button
                            style={{
                              color: "#00923F",
                              marginLeft: "-12px",
                            }}
                            raised
                            component="label"
                            id="icon-button-file"
                            color="transparent"
                            onClick={(e) => null}
                          >
                            Tambahkan Foto
                            <input
                              accept="image/*"
                              style={{
                                display: "none",
                              }}
                              id="icon-button-file"
                              type="file"
                              name="file-upload"
                              onChange={handleFIle}
                            />
                          </Button>
                        )}
                        {controller.loading && "Loading ..."  }
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      {controller.loading && "Loading ..."  }
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Nama Lengkap
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <TextField
                                label=""
                                disabled={true}
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                type="text"
                                id={
                                  errors &&
                                  errors.name &&
                                  errors.name.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                                name="name"
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
                                onChange={onChange}
                                placeholder="Nama Lengkap"
                                inputRef={register({
                                  required: "Tidak boleh kosong",
                                })}
                              />
                            ) : (
                              <TextField
                                label=""
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                type="text"
                                id={
                                  errors &&
                                  errors.name &&
                                  errors.name.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                                name="name"
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
                                onChange={onChange}
                                placeholder="Nama Lengkap"
                                inputRef={register({
                                  required: "Tidak boleh kosong",
                                })}
                              />
                            )}

                            {errors &&
                              errors.name &&
                              errors.name.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.name}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={6}>
                          <Box className={classes.marginBottom}>
                            <label
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Tempat Lahir
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <TextField
                                name="place_of_birth"
                                type="text"
                                disabled={true}
                                placeholder="Tempat Lahir"
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                onChange={onChange}
                                inputRef={register({ required: true })}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                                id={
                                  errors &&
                                  errors.place_of_birth &&
                                  errors.place_of_birth.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                              />
                            ) : (
                              <TextField
                                name="place_of_birth"
                                type="text"
                                placeholder="Tempat Lahir"
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                onChange={onChange}
                                inputRef={register({ required: true })}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                                id={
                                  errors &&
                                  errors.place_of_birth &&
                                  errors.place_of_birth.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                              />
                            )}
                            {errors &&
                              errors.place_of_birth &&
                              errors.place_of_birth.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.place_of_birth}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              htmlFor="place_of_birth"
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Tanggal Lahir
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <TextField
                                name="birth_of_date"
                                type="text"
                                disabled={true}
                                placeholder="Tanggal Lahir"
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                onChange={onChange}
                                value={moment(birth_of_date).format(
                                  "DD MMMM YYYY"
                                )}
                                inputRef={register({ required: true })}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                                id={
                                  errors &&
                                  errors.birth_of_date &&
                                  errors.birth_of_date.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                              />
                            ) : (
                              <Controller
                                as={
                                  <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    style={{
                                      width: "100%",
                                    }}
                                    className={classes.datepicker}
                                    placeholder={
                                      birth_of_date === null
                                        ? "Tanggal Lahir"
                                        : moment(birth_of_date).toString()
                                    }
                                    format="dd/MM/yyyy"
                                    value={
                                      birth_of_date === null
                                        ? null
                                        : moment(birth_of_date).toDate()
                                    }
                                    onChange={(date: any) => {
                                      const data = {
                                        target: {
                                          name: "birth_of_date",
                                          value: moment(date).toISOString(),
                                        },
                                      };
                                      onChange(data);
                                    }}
                                    name="birth_of_date"
                                    inputRef={register({ required: true })}
                                    InputProps={{
                                      classes: { input: classes.input },
                                    }}
                                  />
                                }
                                name="birth_of_date"
                                rules={{ required: true }}
                                control={control}
                                onChange={(date: any) => {
                                  const data = {
                                    target: {
                                      name: "birth_of_date",
                                      value: moment(date[0]).toISOString(),
                                    },
                                  };
                                  onChange(data);
                                  return moment(date[0]).toString();
                                }}
                                defaultValue={
                                  birth_of_date === null
                                    ? null
                                    : moment(birth_of_date).toDate()
                                }
                              />
                            )}
                            {errors &&
                              errors.birth_of_date &&
                              errors.birth_of_date.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.birth_of_date}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              htmlFor=""
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Alamat
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <TextField
                                type="text"
                                style={{
                                  width: "100%",
                                }}
                                color="primary"
                                multiline
                                disabled={true}
                                value={address}
                                placeholder="Masukan Alamat"
                                onChange={onChange}
                                name="address"
                                rows={4}
                                id="standard-textarea"
                                variant="outlined"
                              />
                            ) : (
                              <Controller
                                as={
                                  <TextField
                                    type="text"
                                    style={{
                                      width: "100%",
                                    }}
                                    color="primary"
                                    multiline
                                    value={address}
                                    placeholder="Masukan Alamat"
                                    onChange={onChange}
                                    name="address"
                                    rows={4}
                                    id="standard-textarea"
                                    variant="outlined"
                                  />
                                }
                                name="address"
                                rules={{ required: true }}
                                control={control}
                                onChange={(e) => {
                                  onChange(e[0]);
                                  return e[0].target.value;
                                }}
                                defaultValue=""
                              />
                            )}
                            {errors &&
                              errors.address &&
                              errors.address.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.address}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Pilih Provinsi
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <SelectWithSearch
                                async
                                isDisabled={true}
                                value={province_id}
                                data={controller.province}
                                name="province_id"
                                placeholder={
                                  controller.employeeInput.province_id ||
                                  "Pilih Provinsi"
                                }
                                label="Pilih Provinsi"
                              />
                            ) : (
                              <Controller
                                as={
                                  <SelectWithSearch
                                    async
                                    isDisabled={false}
                                    value={province_id}
                                    data={controller.province}
                                    name="province_id"
                                    placeholder={
                                      controller.employeeInput.province_id ||
                                      "Pilih Provinsi"
                                    }
                                    label="Pilih Provinsi"
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
                            )}
                            {errors &&
                              errors.province_id &&
                              errors.province_id.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.province_id}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={6} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Pilih Kota
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <SelectWithSearch
                                async
                                isDisabled={true}
                                onChange={(value) => {
                                  const e = {
                                    target: {
                                      name: "regency_id",
                                      value: value.value,
                                    },
                                  };
                                  onChange(e);
                                }}
                                value={regency_id}
                                data={controller.city}
                                name="regency_id"
                                label="Pilih Kota"
                                placeholder={
                                  controller.employeeInput.regency_id ||
                                  "Pilih Kota"
                                }
                              />
                            ) : (
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
                                      onChange(e);
                                    }}
                                    value={regency_id}
                                    data={controller.city}
                                    name="regency_id"
                                    label="Pilih Kota"
                                    placeholder={
                                      controller.employeeInput.regency_id ||
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
                                  onChange(e);
                                  return value[0].value;
                                }}
                                defaultValue={regency_id}
                              />
                            )}
                            {errors &&
                              errors.regency_id &&
                              errors.regency_id.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.regency_id}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Box className={classes.marginBottom}>
                            <label
                              htmlFor=""
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Kode Pos
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <TextField
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                name="pos_code"
                                onChange={onChange}
                                disabled={true}
                                placeholder="Kode Pos"
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                                id={
                                  errors &&
                                  errors.pos_code &&
                                  errors.pos_code.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                                inputRef={register({ required: true })}
                              />
                            ) : (
                              <TextField
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                name="pos_code"
                                onChange={onChange}
                                placeholder="Kode Pos"
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                                id={
                                  errors &&
                                  errors.pos_code &&
                                  errors.pos_code.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                                inputRef={register({ required: true })}
                              />
                            )}
                            {errors &&
                              errors.pos_code &&
                              errors.pos_code.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.pos_code}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Typography
                            component="h4"
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Info Kepegawaian
                          </Typography>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={12}>
                          <Box className={classes.marginBottom}>
                            {controller.isUpdateSession ? (
                              <>
                                <label
                                  htmlFor=""
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ID Pegawai
                                </label>
                                <TextField
                                  name="id"
                                  id="id"
                                  disabled
                                  variant="outlined"
                                  style={{
                                    width: "100%",
                                  }}
                                  value={id}
                                  onChange={onChange}
                                  InputProps={{
                                    classes: { input: classes.input },
                                  }}
                                />
                              </>
                            ) : null}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              htmlFor="school_id"
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Asal Unit
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <SelectWithSearch
                                async
                                isDisabled={true}
                                onChange={(value) => {
                                  const e = {
                                    target: {
                                      name: "school_id",
                                      value: value.value,
                                    },
                                  };
                                  onChange(e);
                                }}
                                value={school_id}
                                data={controller.school}
                                name="school_id"
                                placeholder={
                                  school_id ||
                                  "Asal Unit"
                                }
                                label="Asal Unit"
                              />
                            ) : controller.userInfo.role === 1 ? (
                              <>
                                <Controller
                                  as={
                                    <SelectWithSearch
                                      async
                                      isDisabled={false}
                                      onChange={(value) => {
                                        const e = {
                                          target: {
                                            name: "school_id",
                                            value: value.value,
                                          },
                                        };
                                        onChange(e);
                                      }}
                                      value={school_id}
                                      data={controller.school}
                                      name="school_id"
                                      placeholder={
                                        controller.employeeInput.school_id ||
                                        "Asal Unit"
                                      }
                                      label="Asal Unit"
                                    />
                                  }
                                  name="school_id"
                                  onChange={(value) => {
                                    const e = {
                                      target: {
                                        name: "school_id",
                                        value: value[0].value,
                                      },
                                    };
                                    onChange(e);
                                    return value[0].value;
                                  }}
                                  control={control}
                                  rules={{ required: true }}
                                  defaultValue={school_id}
                                />
                                {errors &&
                                  errors.school_id &&
                                  errors.school_id.type === "required" && (
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {errorMessage.school_id}
                                    </p>
                                  )}
                              </>
                            ) : queryString["?school_id"] !== undefined ? (
                              <SelectWithSearch
                                async
                                onChange={onChange}
                                value={controller.userInfo.school.id}
                                data={[
                                  {
                                    id: controller.userInfo.school.id,
                                    name: controller.userInfo.school.name,
                                  },
                                ]}
                                name="school_id"
                                label="Asal Unit"
                             
                              />
                            ) : (
                              <SelectWithSearch
                                async
                                isDisabled
                                onChange={onChange}
                                value={controller.userInfo.school.id}
                                data={[
                                  {
                                    id: controller.userInfo.school.id,
                                    name: controller.userInfo.school.name,
                                  },
                                ]}
                                name="school_id"
                                label="Asal Unit"
                              />
                            )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              htmlFor="status"
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Status Kepegawaian
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <SelectWithSearch
                                async={false}
                                isDisabled={true}
                                onChange={(value) => {
                                  const e = {
                                    target: {
                                      name: "status",
                                      value: value[0].value,
                                    },
                                  };
                                  onChange(e);
                                  return value[0].value;
                                }}
                                value={status}
                                placeholder="Pilih Status Kepegawaian"
                                data={EmployeeStatus}
                                name="status"
                                label="Status Pegawai"
                              />
                            ) : (
                              <Controller
                                as={
                                  <SelectWithSearch
                                    async={false}
                                    isDisabled={false}
                                    onChange={(value) => {
                                      const e = {
                                        target: {
                                          name: "status",
                                          value: value[0].value,
                                        },
                                      };
                                      onChange(e);
                                      return value[0].value;
                                    }}
                                    value={status}
                                    placeholder="Pilih Status Kepegawaian"
                                    data={EmployeeStatus}
                                    name="status"
                                    label="Status Pegawai"
                                  />
                                }
                                name="status"
                                onChange={(value) => {
                                  const e = {
                                    target: {
                                      name: "status",
                                      value: value[0].value,
                                    },
                                  };
                                  onChange(e);
                                  return value[0].value;
                                }}
                                rules={{ required: true }}
                                control={control}
                                defaultValue={status}
                              />
                            )}
                            {errors &&
                              errors.status &&
                              errors.status.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.school_id}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              htmlFor="registered_year"
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Tahun Masuk
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                views={["year", "date", "month"]}
                                disabled={true}
                                format="dd-MM-yyyy"
                                inputVariant="outlined"
                                style={{
                                  width: "100%",
                                }}
                                placeholder={
                                  registered_year === null
                                    ? "Pilih Tahun Masuk"
                                    : moment(registered_year).toString()
                                }
                                id="registered_year"
                                label=""
                                value={
                                  registered_year === null
                                    ? null
                                    : moment(registered_year).toDate()
                                }
                                onChange={(date: any) => {
                                  const data = {
                                    target: {
                                      name: "registered_year",
                                      value: moment(date).toISOString(),
                                    },
                                  };
                                  onChange(data);
                                }}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                              />
                            ) : (
                              <Controller
                                as={
                                  <KeyboardDatePicker
                                    views={["year", "date", "month"]}
                                    autoOk
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    inputVariant="outlined"
                                    style={{
                                      width: "100%",
                                    }}
                                    placeholder={
                                      registered_year === null
                                        ? "Pilih Tahun Masuk"
                                        : moment(registered_year).toString()
                                    }
                                    id="registered_year  "
                                    label=""
                                    value={
                                      registered_year === null
                                        ? null
                                        : moment(registered_year).toDate()
                                    }
                                    onChange={(date: any) => {
                                      const data = {
                                        target: {
                                          name: "registered_year",
                                          value: moment(date).toISOString(),
                                        },
                                      };
                                      onChange(data);
                                    }}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                    InputProps={{
                                      classes: { input: classes.input },
                                    }}
                                  />
                                }
                                name="registered_year"
                                rules={{ required: true }}
                                control={control}
                                onChange={(date: any) => {
                                  const data = {
                                    target: {
                                      name: "registered_year",
                                      value: moment(date[0]).toISOString(),
                                    },
                                  };
                                  onChange(data);
                                  return moment(date[0]).toString();
                                }}
                                defaultValue={
                                  registered_year === null
                                    ? null
                                    : moment(registered_year).toDate()
                                }
                              />
                            )}
                            {errors &&
                              errors.registered_year &&
                              errors.registered_year.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.registered_year}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Box
                            style={{
                              marginTop: "15px",
                              marginBottom: "18px",
                            }}
                          >
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12} mb={4}>
                                <Typography
                                  component="h4"
                                  style={{
                                    fontWeight: "bold",
                                    marginBottom: "18px",
                                  }}
                                >
                                  Kontak Person
                                </Typography>
                              </GridItem>
                            </GridContainer>
                            <label
                              htmlFor=""
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              No Telepon/HP
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <TextField
                                style={{
                                  width: "100%",
                                }}
                                disabled={true}
                                variant="outlined"
                                name="phone"
                                onChange={onChange}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                                placeholder="Nomor Telepon/HP"
                                id={
                                  errors &&
                                  errors.phone &&
                                  errors.phone.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                                inputRef={register({
                                  required: true,
                                  pattern: /^[0-9]*$/i,
                                })}
                              />
                            ) : (
                              <TextField
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                name="phone"
                                onChange={onChange}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                                placeholder="Nomor Telepon/HP"
                                id={
                                  errors &&
                                  errors.phone &&
                                  errors.phone.type === "required"
                                    ? "filled-error-helper-text"
                                    : "name"
                                }
                                inputRef={register({
                                  required: true,
                                  pattern: /^[0-9]*$/i,
                                })}
                              />
                            )}
                            {errors &&
                              errors.phone &&
                              errors.phone.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.phone}
                                </p>
                              )}
                            {errors &&
                              errors.phone &&
                              errors.phone.type === "pattern" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  NO HP hanya boleh diisi dengan angka
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer className={classes.marginBottom}>
                        <GridItem xs={12} sm={12} md={12} mb={4}>
                          <Box className={classes.marginBottom}>
                            <label
                              htmlFor=""
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              Alamat Surel
                            </label>
                            {queryString["?detail"] !== undefined ? (
                              <TextField
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                placeholder="Alamat Surel"
                                name="email"
                                type="email"
                                disabled={true}
                                id="email"
                                inputRef={register({ required: true })}
                                onChange={onChange}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                              />
                            ) : (
                              <TextField
                                style={{
                                  width: "100%",
                                }}
                                variant="outlined"
                                placeholder="Alamat Surel"
                                name="email"
                                type="email"
                                id="email"
                                inputRef={register({ required: true })}
                                onChange={onChange}
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                              />
                            )}
                            {errors &&
                              errors.email &&
                              errors.email.type === "required" && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.email}
                                </p>
                              )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Box
                            style={{
                              marginTop: 30,
                            }}
                          >
                            {queryString["?detail"] !== undefined ? (
                              <div />
                            ) : (
                              <Button
                                style={{
                                  color: "#fff",
                                  marginRight: "22em",
                                  marginTop: "20px",
                                }}
                                isLoading={loading ? true : false}
                                color="primary"
                                type="submit"
                                onClick={(e) => null}
                              >
                                Submit Data
                              </Button>
                            )}
                          </Box>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </form>
          </Paper>
        </Box>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default EmployeeInputSection;
