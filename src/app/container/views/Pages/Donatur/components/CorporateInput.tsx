import React, { useContext, useState } from "react";
import BackNavigation from "@/app/container/components/BackNav";
import { CoorporateStatus } from "@/domain/entities/AllOptions";
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
import _ from "lodash";
import { ToastProvider, useToasts } from "react-toast-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import ModalWarningData from "../../Retail/components/ModalWarningData";
import Alert from "@material-ui/lab/Alert";
import InputMask from "react-input-mask";

const errorMessage = {
  compField: "Nama perusahaan tidak boleh kosong",
  nameField: "Nama tidak boleh kosong",
  addressField: "Alamat tidak boleh kosong",
  emailField: "Email tidak boleh kosong",
  poscodeField: "Kode pos hanya dapat di isi angka",
  phoneField: "No telepon hanya dapat di isi angka",
  positionField: "Posisi tidak boleh kosong",
  email: "Emaul tidak boleh kosong",
  provinceId: "Belum memilih provinsi asal",
  regencyId: "Belum memilih kota asal",
  status: "Belum memilih status perusahaan",
};

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
    labelOpsional: {
      color: '#BCBCBC',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  })
);

const DataInput = () => {
  const controller = useContext(DonorContext);
  const listStatus = CoorporateStatus.slice(4, 9);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    watch,
  } = useForm();
  const classes = useStyles();
  const { addToast } = useToasts();
  const [statusModal, setStatusModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const {
    companyName,
    name,
    address,
    posCode,
    email,
    status,
    provinceId,
    regencyId,
    phone,
    position,
    npwp,
    info,
    isDetailSession,
  } = controller;

  const title = {
    input: "Input Donatur Corporate",
    info: "Info Donatur Corporate",
  };

  const infoWarning = `Catatan: Jika menemui info error nama dan email perusahaan yang sama walaupun nama kontaknya berbeda. Silahkan dapat memperbarui nama kontak person perusahaan di fitur edit donatur terlebih dahulu`;

  React.useEffect(() => {
    setValue([
      { company_name: companyName },
      { name: name },
      { address: address },
      { pos_code: posCode },
      { email: email },
      { status: status },
      { province_id: provinceId },
      { regency_id: regencyId },
      { phone: phone },
      { position: position },
      { npwp: npwp },
      { info: info },
    ]);
  }, [controller]);

  const isValid = (phoneNumber) => {
    if(phoneNumber[0] === '+') {
      return Number(phoneNumber[3]) !== 0 ? true : false
    } else {
      return Number(phoneNumber[0]) !== 0 ? true : false
    }
  }


  const onSubmit = async (e: any) => {
    setLoading(true);
    if (_.isEmpty(errors)) {
      if (isValid(phone)) {
        setError(false);
        const [status, response] = await controller._onStoreCorporate(e);

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
            history.push(`/dashboard/donatur?all=true`);
          }, 1000);
        }
      } else {
        setLoading(false);
        setError(true);
      }
    }
  };

  const handleSubmitButton = () => {
    const { companyName, name, address, posCode, email } = controller;
    if (companyName !== "" && name !== "" && address !== "" && posCode !== 0) {
      return false;
    }
    return true;
  };

  const onChange = (e) => {
    controller.handleInput(e);
  };

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

  const handleUpdateInput = async () => {
    const [status, response] = await controller.postUpdateData();
    if (status === "success") {
      addToast("Data donatur telah berhasil diperbarui", {
        appearance: "success",
      });
      setTimeout(() => {
        history.push(`/dashboard/donatur`);
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
                      Status Perusahaan/Organisasi
                    </label>
                    <Box className={classes.formControl}>
                      <Controller
                        as={
                          <SelectWithSearch
                            async={false}
                            isDisabled={isDetailSession}
                            value={status}
                            data={listStatus}
                            name="status"
                            label="Status Perusahaan/Organisasi"
                            placeholder="Status Perusahaan/Organisasi"
                          />
                        }
                        name="status"
                        rules={{ required: true }}
                        control={control}
                        onChange={(selectedValue) => {
                          controller.setStatus(selectedValue[0].value);
                          return selectedValue[0].value;
                        }}
                        defaultValue={status}
                      />
                      {errors &&
                        errors.status &&
                        errors.status.type === "required" && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {errorMessage.status}
                          </p>
                        )}
                    </Box>
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.marginBottom}>
                  <GridItem xs={12} sm={12} md={12} mb={4}>
                    <label htmlFor="company_name" className={classes.label}>
                      Nama Perusahaan/Organisasi/Institusi
                    </label>
                    <Box className={classes.formControl}>
                      <TextField
                        style={{
                          width: "100%",
                        }}
                        variant="outlined"
                        disabled={isDetailSession}
                        name="company_name"
                        id="company_name"
                        placeholder="Nama Perusahaan/Organisasi/Institusi"
                        size="small"
                        onChange={(e) =>
                          controller.setCompanyName(e.target.value)
                        }
                        inputRef={register({ required: true })}
                      />
                      {errors &&
                        errors.company_name &&
                        errors.company_name.type === "required" && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {errorMessage.compField}
                          </p>
                        )}
                    </Box>
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.marginBottom}>
                  <GridItem xs={12} sm={12} md={12} mb={4}>
                    <label htmlFor="address" className={classes.label}>
                      Alamat
                    </label>
                    <Box className={classes.formControl}>
                      <Controller
                        as={
                          <TextField
                            multiline
                            rows={4}
                            id="standard-textarea"
                            variant="outlined"
                            style={{
                              width: "100%",
                            }}
                            color="primary"
                            disabled={isDetailSession}
                            placeholder="Alamat"
                            className={classes.cssOutlinedInput}
                            onChange={(e) =>
                              controller.setAddress(e.target.value)
                            }
                            name="address"
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
                            placeholder={
                              controller.provinceId || "Pilih Provinsi"
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
                            placeholder={
                              controller.regencyId || "Pilih Provinsi"
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
                    <Box className={classes.formControl} style={{marginTop:'25px'}}>
                      <TextField
                        style={{
                          width: "100%",
                        }}
                        name="pos_code"
                        id="standard-textarea"
                        variant="outlined"
                        disabled={isDetailSession}
                        placeholder="Kode Pos"
                        size="small"
                        onChange={(e) => controller.setPosCode(e.target.value)}
                        inputRef={register({ required: true })}
                      />
                      {errors &&
                        errors.pos_code &&
                        errors.pos_code.type === "required" && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {errorMessage.poscodeField}
                          </p>
                        )}
                    </Box>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <label htmlFor="email" className={classes.label}>
                      Surel Perusahaan
                    </label>
                    <label className={classes.labelOpsional}>
                        Opsional
                      </label>
                      </Box>
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
                        placeholder="Surel Perusahaan"
                        size="small"
                        onChange={(e) => controller.setEmail(e.target.value)}
                        inputRef={register}
                      />
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
                    <label htmlFor="name" className={classes.label}>
                      Nama Kontak Person
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
                        placeholder="Nama Kontak Person"
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
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <label htmlFor="position" className={classes.label}>
                      Jabatan Kontak Person
                    </label>
                    <label className={classes.labelOpsional}>
                        Opsional
                      </label>
                      </Box>
                    <Box className={classes.formControl}>
                      <TextField
                        style={{
                          width: "100%",
                        }}
                        variant="outlined"
                        name="position"
                        id="position"
                        disabled={isDetailSession}
                        placeholder="Jabatan Kontak Person"
                        size="small"
                        onChange={(e) => controller.setPosition(e.target.value)}
                        inputRef={register}
                      />
                    </Box>
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.marginBottom}>
                  <GridItem xs={12} sm={12} md={12} mb={4}>
                    <label htmlFor="phone" className={classes.label}>
                      No Handphone
                    </label>
                    <Box className={classes.formControl}>
                      <Controller 
                        as={
                          <InputMask
                          mask="+6299 999 999 999"
                          disabled={isDetailSession}
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
                              disabled={isDetailSession}
                              placeholder="Contoh: +628567XXXXXXX"
                              size="small"
                            
                            />
                          )}
                        </InputMask>
                        }
                        control={control}
                        name="phone"
                        onChange={(e) => {
                          controller.setPhone(e[0].target.value);
                          return e[0].target.value
                        }}
                        rules={{required: true}}
                        defaultValue={phone}
                      
                      />
                     
                      {errors &&
                        errors.phone &&
                        errors.phone.type === "required" && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {errorMessage.phoneField}
                          </p>
                        )}
                      {error && isValid(phone) === false && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          No Handphone tidak valid. Silahkan coba kembali
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
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <label htmlFor="npwp" className={classes.label}>
                      Nomor NPWP
                    </label>
                    <label className={classes.labelOpsional}>
                        Opsional
                      </label>
                      </Box>
                    <Box className={classes.formControl}>
                      <TextField
                        style={{
                          width: "100%",
                        }}
                        variant="outlined"
                        name="npwp"
                        id="npwp"
                        disabled={isDetailSession}
                        placeholder="No NPWP"
                        size="small"
                        inputRef={register({ pattern: /^[0-9]*$/i })}
                        onChange={(e) => controller.setNpwp(e.target.value)}
                      />
                      {errors &&
                        errors.npwp &&
                        errors.npwp.type === "pattern" && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            Hanya Boleh diisi dengan angka saja
                          </p>
                        )}
                    </Box>
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.marginBottom}>
                  <GridItem xs={12} sm={12} md={12} mb={4}>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <label htmlFor="info" className={classes.label}>
                      Info Donatur
                    </label>
                    <label className={classes.labelOpsional}>
                        Opsional
                      </label>
                      </Box>
                    <Box className={classes.formControl}>
                      <Controller
                        as={
                          <TextField
                            aria-label="minimum height"
                            rows={6}
                            style={{
                              width: "100%",
                            }}
                            color="primary"
                            disabled={isDetailSession}
                            placeholder="Info Donatur"
                            className={classes.cssOutlinedInput}
                            onChange={(e) => controller.setInfo(e.target.value)}
                            name="info"
                            id="standard-textarea"
                            multiline
                            variant="outlined"
                          />
                        }
                        name="info"
                        control={control}
                        onChange={(e) => controller.setInfo(e[0].target.value)}
                        defaultValue={info}
                      />
                    </Box>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                  </GridItem>
                </GridContainer>
              </GridItem>
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
                        onClick={(e) => null}
                        type="submit"
                        isLoading
                        disabled={isDetailSession || loading}
                        loading={loading}
                      >
                        Simpan & Lanjutkan
                      </Button>
                    </GridItem>
                  </GridContainer>
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
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

const InputCorporate = () => {
  return (
    <DonorController>
      <ToastProvider>
        <DataInput />
      </ToastProvider>
    </DonorController>
  );
};

export default InputCorporate;
