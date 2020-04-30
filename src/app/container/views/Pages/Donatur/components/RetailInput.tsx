import React, { useContext, useState } from "react";
import BackNavigation from "@/app/container/components/BackNav";
import { DonorController, DonorContext } from "./../ControllerInput";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import { Box, Typography, Paper, TextField } from "@material-ui/core";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import SelectWithSearch from "@/app/container/components/SelectWithSearch";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { green } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from 'lodash'
import { ToastProvider, useToasts } from "react-toast-notifications";
import ModalWarningData from "../../Retail/components/ModalWarningData";

const errorMessage = {
  nameField: "Nama tidak boleh kosong",
  addressField: "Alamat tidak boleh kosong",
  emailField: "Email tidak boleh kosong",
  poscodeField: "Kode pos hanya dapat di isi angka",
  phoneField: "No telepon tidak boleh kosong",
  provinceId: "Belum memilih provinsi asal",
  regencyId: "Belum memilih kota asal",
};

const title = {
  info: 'Info Donatur Perorangan',
  input: 'Input Donatur Perorangan'
}

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: "100%",
    },
    marginBottom: {
      marginBottom: 10,
    },
    label: {
      color: "#323C47",
      fontSize: 14,
      fontWeight: 500,
    },
    subTitle: {
      fontSize: 18,
      fontWeight: 600,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    cssOutlinedInput: {
      "&$cssFocused $notchedOutline": {
        borderColor: `${theme.palette.primary.main} !important`,
      },
    },
    loadingReset: {
      color: "#00923F",
    },
  })
);

const DataInput = () => {
  const controller = useContext(DonorContext);
  const history = useHistory();
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const classes = useStyles();
  const [error, setError] = useState({
    province: false,
    regency: false,
  });
  const { addToast } = useToasts();
   const [statusModal, setStatusModal] = React.useState(false);

  const {
    name,
    address,
    posCode,
    email,
    provinceId,
    regencyId,
    phone,
    position,
    npwp,
    info,
    isDetailSession,
    status
  } = controller;



  const handleValidation = (data) => {
    if (controller.provinceId === 0) {
      setError({
        ...error,
        province: true,
      });
      return false;
    } else if (controller.regencyId === 0) {
      setError({
        ...error,
        regency: true,
      });
      return false;
    } else {
      setError({
        province: false,
        regency: false,
      });
      return true;
    }
  };

  const onSubmit = async (e: any) => {
    if (_.isEmpty(errors)) {
       const [status, response] = await controller._onStoreRetail(e);
      if (status === "error") {
         console.log(response)
        if (response !== undefined) {
          if (response.status === 400 || response.status === 402) {
           if(response.data.message === 'Nama dan Nomor Handphone yang sama ditemukan dalam database') {
                setStatusModal(true)
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
          history.push(`/dashboard/donatur?all=true`);
        }, 1000);
      }
    }
  };

  const handleInputValue = (val) => {
    controller.setCheckbox(val);
    controller.setStatus(val);
  };


  const onChange = (e) => {
    controller.handleInput(e);
  };

   const handleUpdateInput = async () => {
    const resp = await controller.postUpdateData();
    if (resp) {
      history.push(`/dashboard/donatur`);
    }
  };

  React.useEffect(() => {
    setValue([
      { name: name },
      { address: address },
      { pos_code: posCode },
      { email: email },
      { province_id: provinceId },
      { regency_id: regencyId },
      { phone: phone },
      { position: position },
      { npwp: npwp },
      { info: info },
      { status: status },
    ]);
  }, [controller]);


  

  if (controller.loading) {
    return (
      <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center">
        <div
          style={{
           
            height: '100vh'
          }}
        >
          <CircularProgress size={16} className={classes.loadingReset} />
          loading
        </div>
      </Box>
    );
  }


  return (
    <React.Fragment>
      <ThemeProvider theme={innerTheme}>
        <BackNavigation title={isDetailSession ? title.info : title.input} />
        <Box>
          <Paper
            component="div"
            style={{
              minHeight: "100vh",
              height: "100%",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <GridContainer
                style={{
                  padding: "30px 30px",
                }}
              >
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <label htmlFor="status" className={classes.label}>
                        Status
                      </label>
                      <Box className={classes.formControl}>
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={controller.checkbox === 1 || controller.status === 1}
                                onChange={() => handleInputValue(1)}
                                name="status"
                                value={1}
                                disabled={isDetailSession}
                                color="primary"
                              />
                            }
                            label="Bapak"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={controller.checkbox === 2 || controller.status === 2}
                                onChange={() => handleInputValue(2)}
                                name="status"
                                value={2}
                                disabled={isDetailSession}
                                color="primary"
                              />
                            }
                            label="Ibu"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={controller.checkbox === 3 || controller.status === 3}
                                onChange={() => handleInputValue(3)}
                                name="status"
                                value={3}
                                disabled={isDetailSession}
                                color="primary"
                              />
                            }
                            label="Saudara"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={controller.checkbox === 4 || controller.status === 4}
                                onChange={() => handleInputValue(4)}
                                name="status"
                                value={4}
                                disabled={isDetailSession}
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

                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <label htmlFor="name" className={classes.label}>
                        Nama Lengkap
                      </label>
                      <Box className={classes.formControl}>
                        <TextField
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          name="name"
                          disabled={isDetailSession}
                          id="name"
                          placeholder="Nama Lengkap"
                          size="small"
                          onChange={(e) => controller.setName(e.target.value)}
                          inputRef={register({ required: true })}
                        />
                        {errors &&
                          errors.name &&
                          errors.name.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.nameField}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <label htmlFor="address" className={classes.label}>
                        Alamat Tinggal Donatur
                      </label>
                      <Box className={classes.formControl}>
                        <Controller
                          as={
                            <TextField
                              aria-label="minimum height"
                            

                              disabled={isDetailSession}
                              style={{
                                width: "100%",
                              }}
                              color="primary"
                              placeholder="Alamat"
                              variant="outlined"
                              className={classes.cssOutlinedInput}
                              onChange={(e) =>
                                controller.setAddress(e.target.value)
                              }
                              name="address"
                              id="standard-textarea"
                              rows={4}
                              multiline
                            />
                          }
                          name="address"
                          rules={{ required: true }}
                          control={control}
                          onChange={(e) =>
                            controller.setAddress(e[0].target.value)
                          }
                          defaultValue={address}
                        />
                        {errors &&
                          errors.address &&
                          errors.address.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.addressField}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <label htmlFor="province_id" className={classes.label}>
                        Provinsi
                      </label>
                      <Box className={classes.formControl}>
                        <Controller
                          as={
                            <SelectWithSearch
                              async
                              isDisabled={isDetailSession}
                              onChange={(selectedValue) => {
                                const e = {
                                  target: {
                                    name: "province_id",
                                    value: selectedValue.value,
                                  },
                                };
                                onChange(e);
                              }}
                              value={provinceId}
                              data={controller.province}
                              name="province_id"
                              label="Provinsi"
                              placeholder={controller.provinceId || "Pilih Provinsi"}
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
                          defaultValue={provinceId}
                        />
                        {errors &&
                          errors.province_id &&
                          errors.province_id.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.provinceId}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <label htmlFor="regency_id" className={classes.label}>
                        Kota
                      </label>
                      <Box className={classes.formControl}>
                        <Controller
                          as={
                            <SelectWithSearch
                              async
                              isDisabled={isDetailSession}
                              onChange={(value) => {
                                const e = {
                                  target: {
                                    name: "regency_id",
                                    value: value.value,
                                  },
                                };
                                onChange(e);
                              }}
                              value={regencyId}
                              data={controller.regency}
                              name="regency_id"
                              label="Pilih Kota"
                              placeholder={controller.regencyId || "Pilih Kota"}
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
                          defaultValue={regencyId}
                        />
                        {errors &&
                          errors.regency_id &&
                          errors.regency_id.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.regencyId}
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={6} mb={4}>
                      <label htmlFor="pos_code" className={classes.label}>
                        Kode Pos
                      </label>
                      <Box className={classes.formControl}>
                        <TextField
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          name="pos_code"
                          id="pos_code"
                          disabled={isDetailSession}
                          placeholder="Kode Pos"
                          size="small"
                          onChange={(e) =>
                            controller.setPosCode(e.target.value)
                          }
                          inputRef={register({
                            required: true,
                            pattern: /^[0-9]*$/i,
                          })}
                        />
                        {errors &&
                          errors.pos_code &&
                          errors.pos_code.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.poscodeField}
                            </p>
                          )}
                              {errors &&
                          errors.phone &&
                          errors.phone.type === "pattern" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              Kode pos hanya boleh diisi dengan angka
                            </p>
                          )}
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <Typography component="h4" className={classes.subTitle}>
                        Kontak Donatur
                      </Typography>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <label htmlFor="phone" className={classes.label}>
                        No Handphone
                      </label>
                      <Box className={classes.formControl}>
                        <TextField
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          name="phone"
                          id="phone"
                          disabled={isDetailSession}
                          placeholder="e.g. 08567XXXXXXX"
                          size="small"
                          onChange={(e) => controller.setPhone(e.target.value)}
                          inputRef={register({
                            required: true,
                            pattern: /^[0-9]*$/i,
                          })}
                        />
                        {errors &&
                          errors.phone &&
                          errors.phone.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.phoneField}
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
                      <label htmlFor="email" className={classes.label}>
                        Alamat Surel
                      </label>
                      <Box className={classes.formControl}>
                        <TextField
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          name="email"
                          id="email"
                          disabled={isDetailSession}
                          type="email"
                          placeholder="e.g. andre@mail.com"
                          size="small"
                          onChange={(e) => controller.setEmail(e.target.value)}
                           inputRef={register({
                                    required: true,
                                    pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
                                  })}
                                />
                                {errors &&
                                  errors.email &&
                                  errors.email.type === "required" && (
                                    <p
                                      style={{
                                        color: "red",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {errorMessage.emailField}
                                    </p>
                                  )}
                                {errors &&
                                  errors.email &&
                                  errors.email.type === "pattern" && (
                                    <p
                                      style={{
                                        color: "red",
                                        fontSize: "12px",
                                      }}
                                    >
                                      Email tidak valid
                                    </p>
                                  )}  
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <Typography component="h4" className={classes.subTitle}>
                        Keterangan Tambahan
                      </Typography>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <label htmlFor="npwp" className={classes.label}>
                        Nomor NPWP
                      </label>
                      <Box className={classes.formControl}>
                        <TextField
                          style={{
                            width: "100%",
                          }}
                          variant="outlined"
                          disabled={isDetailSession}
                          name="npwp"
                          id="npwp"
                          placeholder="Nomor NPWP"
                          size="small"
                          inputRef={register}
                          onChange={(e) => controller.setNpwp(e.target.value)}
                        />
                      </Box>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.marginBottom}>
                    <GridItem xs={12} sm={12} md={12} mb={4}>
                      <label htmlFor="info" className={classes.label}>
                        Info Donatur
                      </label>
                      <Box className={classes.formControl}>
                        <Controller
                          as={
                            <TextField
                              aria-label="minimum height"
                              rows={4}
                              style={{
                                width: "100%",
                              }}
                              color="primary"
                              variant="outlined"
                              disabled={isDetailSession}
                              placeholder="Info Donatur"
                              className={classes.cssOutlinedInput}
                              onChange={(e) =>
                                controller.setInfo(e.target.value)
                              }
                              name="info"
                              id="standard-textarea"
                              multiline
                            />
                          }
                          name="info"
                          control={control}
                          onChange={(e) =>
                            controller.setInfo(e[0].target.value)
                          }
                          defaultValue={info}
                        />
                      </Box>
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
                <GridItem xs={12} sm={12} md={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Button
                          style={{
                            color: "#fff",
                            marginTop: "20px",
                            fontWeight: 600,
                          }}
                          color="primary"
                          type="submit"
                          onClick={e => null}
                          disabled={isDetailSession}
                        >
                          Simpan & Lanjutkan
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </Box>
                </GridItem>
              </GridContainer>
            </form>
          </Paper>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

const RetailInput = () => {
  return (
    <DonorController>
      <ToastProvider>

      <DataInput />
      </ToastProvider>
    </DonorController>
  );
};

export default RetailInput;
