import React, { useState } from "react";
import { Input } from "../../../../../components/Input";
import InlineCss from "react-inline-css";
import { StudentStatus } from "@/domain/entities/AllOptions";
import {
  StudentListInputContext,
  ActionType,
  initialState,
} from "../../Controller";
import SimpleSelect from "@/app/container/components/SelectMUI";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import SimpleSelectWithPlaceholder from "@/app/container/components/SelectWithPlaceholder";
import SimpleSelectWithDisabled from "@/app/container/components/SelectWithDisabled";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
} from "@material-ui/core";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { Image } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import SelectWithSearch from "@/app/container/components/SelectWithSearch";
import { KeyboardDatePicker } from "@material-ui/pickers";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { green } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  }
});

const errorMessage = {
  emptyField: "Field ini tidak boleh kosong",
  onlyNumber: "Hanya boleh diisi dengan angka saja",
  notPickProvince: "Belum memilih Provinsi asal",
  notPickRegency: "Belum memilih Kota asal",
  notPickDistrict: "Belum memilih Kecamatan asal",
  notPickVillage: "Belum memilih Kelurahan / Desa",
  notPickStatus: "Belum memilih status sosial",
  notPickEducation: "Belum memilih status pendidikan",
  notPickParentStatus: "Belum memilih status orang tua",
  notPickSchool: "Belum memilih sekolah asal",
};

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
    marginBottom4: {
      marginBottom: theme.spacing(8),
    },

    datepicker: {
      height: "50px",
    },
    loadingReset: {
      color: "#00923F",
    },
    label: {
      color: '#323C47',
      fontWeight: 'bold'
    }
  })
);

const InputDataSiswaSection = ({ value, setValues }) => {
  const controller = React.useContext(StudentListInputContext);
  const [uploaded, setUploaded] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    control,
  } = useForm();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const onChange = (e) => {
    controller.handleInput(e)(controller.dispatch)(
      ActionType.handleStudentInfoInputData
    );
  };

  const handleFIle = (e) => {
    controller.handleImageUpload(e)(controller.dispatch)(
      ActionType.handleImageUpload
    );
    const objectURL = URL.createObjectURL(e.target.files[0]);
    controller.dispatch({
      type: ActionType.setImagePreview,
      payload: objectURL,
    });
    setUploaded(true);
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (_.isEmpty(errors)) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setValues(value + 1);
    }
  };

  const {
    identity_number,
    school_id,
    name,
    age,
    place_of_birth,
    birth_of_date,
    child_row,
    total_sibling,
    address,
    sosial_status,
    pos_code,
    province_id,
    regency_id,
    district_id,
    village_id,
    image,
  } = controller.student_info;

  React.useEffect(() => {
    setEditing(true);
    if (birth_of_date === "") {
      setValue([
        { identity_number: identity_number },
        { school_id: school_id },
        { name: name },
        { age: age },
        { place_of_birth: place_of_birth },
        { birth_of_date: null },
        { child_row: child_row },
        { total_sibling: total_sibling },
        { address: address },
        { sosial_status: sosial_status },
        { pos_code: pos_code },
        { province_id: province_id },
        { regency_id: regency_id },
        { district_id: district_id },
        { village_id: village_id },
      ]);
    } else {
      setValue([
        { identity_number: identity_number },
        { school_id: school_id },
        { name: name },
        { age: age },
        { place_of_birth: place_of_birth },
        { birth_of_date: birth_of_date },
        { child_row: child_row },
        { total_sibling: total_sibling },
        { address: address },
        { sosial_status: sosial_status },
        { pos_code: pos_code },
        { province_id: province_id },
        { regency_id: regency_id },
        { district_id: district_id },
        { village_id: village_id },
      ]);
    }

    setEditing(false);
  }, [
    controller.student_info,
    controller.loading,
    controller.isUpdateSession,
    value,
  ]);

  const { isDetailSession } = controller;

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
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={innerTheme}>
        <Box>
          <Paper
            component="div"
            style={{
              minHeight: "100vh",
              height: "100%",
              padding: "20px 30px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
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
                      {image !== null || controller.ImagePreview !== "" ? (
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

                 

                      <Button
                        style={{
                          color: "#00923F",
                          marginLeft: "-12px",
                        }}
                        color="transparent"
                        component="label"
                        raised
                        id="icon-button-file"
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
                  </Box>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Nomor Induk Siswa</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          disabled={isDetailSession}
                          type="text"
                          id={
                            errors &&
                            errors.identity_number &&
                            errors.identity_number.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="identity_number"
                          InputProps={
                            editing
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
                          inputRef={register({
                            required: true,
                            pattern: /^[0-9]*$/i,
                          })}
                        />
                        {errors &&
                          errors.identity_number &&
                          errors.identity_number.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                        {errors &&
                          errors.identity_number &&
                          errors.identity_number.type === "pattern" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.onlyNumber}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Nama Lengkap</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Nama Lengkap"
                          id={
                            errors &&
                            errors.name &&
                            errors.name.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="name"
                          InputProps={
                            editing
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
                          inputRef={register({
                            required: true,
                          })}
                        />
                        {errors &&
                          errors.name &&
                          errors.name.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Tempat Lahir</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          placeholder="Tempat Lahir"
                          type="text"
                          disabled={isDetailSession}
                          id={
                            errors &&
                            errors.place_of_birth &&
                            errors.place_of_birth.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="place_of_birth"
                          InputProps={
                            editing
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
                          inputRef={register({
                            required: true,
                          })}
                        />
                        {errors &&
                          errors.place_of_birth &&
                          errors.place_of_birth.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Tanggal Lahir</label>
                        <Controller
                          as={
                            <KeyboardDatePicker
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              style={{
                                width: "100%",
                              }}
                              disabled={isDetailSession}
                              format="dd/MM/yyyy"
                              className={classes.datepicker}
                              placeholder={
                                birth_of_date === ""
                                  ? "Tanggal Lahir"
                                  : moment(birth_of_date).toString()
                              }
                              value={
                                birth_of_date === ""
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
                            birth_of_date === ""
                              ? null
                              : moment(birth_of_date).toDate()
                          }
                        />
                        {errors &&
                          errors.birth_of_date &&
                          errors.birth_of_date.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom4}>
                        <label className={classes.label}>Usia</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          id={
                            errors &&
                            errors.age &&
                            errors.age.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="age"
                          InputProps={
                            editing
                              ? {
                                  classes: { input: classes.input },
                                  endAdornment: (
                                    <CircularProgress
                                      className={classes.loadingReset}
                                      size={14}
                                    />
                                  ),
                                }
                              : {
                                  classes: { input: classes.input },
                                  endAdornment: (
                                    <Typography
                                      component="p"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Tahun
                                    </Typography>
                                  ),
                                }
                          }
                          onChange={onChange}
                          inputRef={register({
                            required: true,
                            pattern: /^[0-9]*$/i,
                          })}
                        />
                        {errors &&
                          errors.age &&
                          errors.age.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                        {errors &&
                          errors.age &&
                          errors.age.type === "pattern" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.onlyNumber}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Anak ke</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Anak Ke"
                          id={
                            errors &&
                            errors.age &&
                            errors.age.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="child_row"
                          InputProps={
                            editing
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
                          inputRef={register({
                            required: true,
                            pattern: /^[0-9]*$/i,
                          })}
                        />
                        {errors &&
                          errors.age &&
                          errors.age.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                        {errors &&
                          errors.age &&
                          errors.age.type === "pattern" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.onlyNumber}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Jumlah Bersaudara</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Jumlah Bersaudara"
                          id={
                            errors &&
                            errors.age &&
                            errors.age.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="total_sibling"
                          InputProps={
                            editing
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
                          inputRef={register({
                            required: true,
                            pattern: /^[0-9]*$/i,
                          })}
                        />
                        {errors &&
                          errors.age &&
                          errors.age.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                        {errors &&
                          errors.age &&
                          errors.age.type === "pattern" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.onlyNumber}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer></GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Status Sosial</label>
                        <Controller
                          as={
                            <SelectWithSearch
                              async={false}
                              isDisabled={isDetailSession}
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
                              value={sosial_status}
                              placeholder="Pilih Status Sosial"
                              data={StudentStatus}
                              name="status"
                              label="Status Sosail"
                            />
                          }
                          name="status"
                          onChange={(value) => {
                            const e = {
                              target: {
                                name: "sosial_status",
                                value: value[0].value,
                              },
                            };
                            onChange(e);
                            return value[0].value;
                          }}
                          rules={{ required: true }}
                          control={control}
                          defaultValue={sosial_status}
                        />
                        {errors &&
                          errors.status &&
                          errors.status.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.notPickStatus}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Asal Unit</label>
                        {controller.userInfo.role === 1 ? (
                          <>
                            <Controller
                              as={
                                <SelectWithSearch
                                  async
                                  isDisabled={isDetailSession}
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
                                    controller.isUpdateSession
                                      ? school_id
                                      : "Asal Unit"
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
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  {errorMessage.notPickSchool}
                                </p>
                              )}
                          </>
                        ) : (
                          <SelectWithSearch
                            async
                            isDisabled
                            onChange={onChange}
                            value={controller.userInfo.school_id}
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
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Alamat</label>
                        <Controller
                          as={
                            <TextField
                              type="text"
                              style={{
                                width: "100%",
                              }}
                              color="primary"
                              multiline
                              disabled={isDetailSession}
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
                        {errors &&
                          errors.address &&
                          errors.address.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Provinsi</label>
                        <Controller
                          as={
                            <SelectWithSearch
                              async
                              isDisabled={isDetailSession}
                              value={province_id}
                              data={controller.province}
                              name="province_id"
                              placeholder={
                                controller.isUpdateSession
                                  ? province_id
                                  : "Pilih Provinsi"
                              }
                              label={
                                controller.isUpdateSession
                                  ? province_id
                                  : "Pilih Provinsi"
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
                            onChange(e);
                            return selectedValue[0].value;
                          }}
                          defaultValue={province_id}
                        />
                        {errors &&
                          errors.province_id &&
                          errors.province_id.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.notPickProvince}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Kota</label>
                        <Controller
                          as={
                            <SelectWithSearch
                              async
                              isDisabled={isDetailSession}
                              value={regency_id}
                              data={controller.city}
                              name="regency_id"
                              placeholder={
                                controller.isUpdateSession
                                  ? regency_id
                                  : "Pilih Kota"
                              }
                              label="Pilih Kota"
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
                              {errorMessage.notPickRegency}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Kecamatan</label>
                        <Controller
                          as={
                            <SelectWithSearch
                              async
                              isDisabled={isDetailSession}
                              value={district_id}
                              data={controller.district}
                              name="district_id"
                              placeholder={
                                controller.isUpdateSession
                                  ? district_id
                                  : "Pilih Kecamatan"
                              }
                              label="Pilih Kecamatan"
                            />
                          }
                          name="district_id"
                          rules={{ required: true }}
                          control={control}
                          onChange={(selectedValue) => {
                            const e = {
                              target: {
                                name: "district_id",
                                value: selectedValue[0].value,
                              },
                            };
                            onChange(e);
                            return selectedValue[0].value;
                          }}
                          defaultValue={district_id}
                        />
                        {errors &&
                          errors.district_id &&
                          errors.district_id.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.notPickDistrict}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Kelurahan / Desa</label>
                        <Controller
                          as={
                            <SelectWithSearch
                              async
                              isDisabled={isDetailSession}
                              value={village_id}
                              data={controller.village}
                              name="village_id"
                              placeholder={
                                controller.isUpdateSession
                                  ? village_id
                                  : "Pilih Kelurahan / Desa"
                              }
                              label={
                                controller.isUpdateSession
                                  ? village_id
                                  : "Pilih Kelurahan / Desa"
                              }
                            />
                          }
                          name="village_id"
                          rules={{ required: true }}
                          control={control}
                          onChange={(selectedValue) => {
                            const e = {
                              target: {
                                name: "village_id",
                                value: selectedValue[0].value,
                              },
                            };
                            onChange(e);
                            return selectedValue[0].value;
                          }}
                          defaultValue={district_id}
                        />
                        {errors &&
                          errors.village_id &&
                          errors.village_id.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.notPickDistrict}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Box className={classes.marginBottom}>
                        <label className={classes.label}>Kode Pos</label>
                        <TextField
                          label=""
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="text"
                          disabled={isDetailSession}
                          placeholder="Kode Pos"
                          id={
                            errors &&
                            errors.age &&
                            errors.age.type === "required"
                              ? "filled-error-helper-text"
                              : "name"
                          }
                          name="pos_code"
                          InputProps={
                            editing
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
                          inputRef={register({
                            required: true,
                            pattern: /^[0-9]*$/i,
                          })}
                        />
                        {errors &&
                          errors.age &&
                          errors.age.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.emptyField}
                            </p>
                          )}
                        {errors &&
                          errors.age &&
                          errors.age.type === "pattern" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.onlyNumber}
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
                        <Button
                          style={{
                            color: "#fff",
                            marginRight: "22em",
                            marginTop: "20px",
                          }}
                          isLoading={loading ? true : false}
                          color="primary"
                          type="submit"
                          disabled={isDetailSession}
                          onClick={(e) => null}
                        >
                          Submit Data
                        </Button>
                      </Box>
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

export default InputDataSiswaSection;
