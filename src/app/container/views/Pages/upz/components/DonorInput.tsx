import React, { useContext } from "react";
import { Input, Textarea } from "@/app/container/components/index";
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
  Grid,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  TextareaAutosize,
  Paper,
} from "@material-ui/core";
import Card from "@/app/container/commons/Card/Card";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import SelectWithSearch from "@/app/container/components/SelectWithSearch";
import ModalWarningData from "../../Retail/components/ModalWarningData";
import _ from "lodash";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

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
    formMargin: {
      margin: theme.spacing(1),
    },
    formContainer: {
      marginTop: theme.spacing(2),
      width: "100%",
      marginRight: 20,
      marginLeft: 20,
    },
    formControl: {
      marginTop: theme.spacing(2),
      width: "100%",
    },
    cardTitle: {
      color: "#3A3B3F",
    },
    label: {
      color: "#323C47",
      fontSize: 12,
      fontWeight: 800,
      marginTop: theme.spacing(1),
    },
  })
);

const DonorInput = ({ index, setIndex }) => {
  const controller = useContext(CorporateContext);
  const history = useHistory();
  const classes = useStyles();
  const [statusModal, setStatusModal] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    control,
  } = useForm();
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
      { province_id: province_id },
      { position: position },
      { pos_code: pos_code },
      { regency_id: regency_id },
      { phone: phone },
      { email: email },
      { name: name },
    ]);
  }, []);

  React.useEffect(() => {
    setValue([
      { company_name: company_name },
      { status: status },
      { address: address },
      { npwp: npwp },
      { info: info },
      { province_id: province_id },
      { position: position },
      { pos_code: pos_code },
      { regency_id: regency_id },
      { phone: phone },
      { email: email },
      { name: name },
    ]);
  }, [controller.selected, controller.selectedDonatur, ]);

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

  const handleInputSubmit = async (e) => {
    if (controller.DonaturInfo.status === "") {
      setError(true);
    } else {
      if (_.isEmpty(errors)) {
      
        if (controller.selected) {
          history.push(
            `/dashboard/upz-transaction/${controller.DonationInfo.donor_id}?is_company=${controller.DonaturInfo.is_company}&kwitansi=${controller.DonationInfo.kwitansi}&tanggal=${controller.DonationInfo.created_at}&employee_id=${controller.DonationInfo.employee_id}`
          );
        } else {
          const [status, response] = await controller.postData();
          if (status === "error") {
            setStatusModal(true);
          } else {
            history.push(
              `/dashboard/upz-transaction/${response.data.data.id}?is_company=${controller.DonaturInfo.is_company}&kwitansi=${controller.DonationInfo.kwitansi}&tanggal=${controller.DonationInfo.created_at}&employee_id=${controller.DonationInfo.employee_id}`
            );
          }
        }
      }
    }
  };

  const handleUpdateInput = async () => {
    const resp = await controller.postUpdateData();
    if (resp) {
      history.push(`/dashboard/retail-input/${resp.id}`);
    }
  };

  console.log(controller.DonaturInfo);

  return (
    <React.Fragment>
      <ThemeProvider theme={innerTheme}>
        <Paper
          elevation={0}
          style={{
            padding: "20px",
          }}
        >
          <GridContainer>
            <GridItem sm={12} md={12}>
              <form onSubmit={handleSubmit(handleInputSubmit)}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        style={{
                          marginBottom: "20px",
                        }}
                      >
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
                    </GridContainer>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <Card className={classes.container}>
                      <GridItem xs={12} sm={12} md={12}>
                        <Box display="flex" flexDirection="column" style={{
                          marginBottom: '15px'
                        }}>
                          <label
                            htmlFor="comp-name"
                            className={
                              errors && errors.company_name
                                ? "red-text"
                                : "black-text"
                            }
                          >
                            {controller.DonaturInfo.is_company
                              ? "Pilih Status Perusahaan"
                              : "Pilih Status"}
                          </label>
                          {controller.DonaturInfo.is_company ? (
                            <>
                              <Controller
                                as={
                                  <SelectWithSearch
                                    async={false}
                                    isDisabled={controller.selected}
                                    onChange={(e) => {
                                      let selectedCompany = {
                                        target: {
                                          name: "status",
                                          value: e.value,
                                        },
                                      };
                                      onChange(selectedCompany);
                                    }}
                                    value={status || ""}
                                    data={CoorporateStatus.slice(4, -1)}
                                    name="status"
                                    placeholder="Status Perusahaan atau Organisasi"
                                    label="Status Perusahaan atau Organisasi"
                                  />
                                }
                                name="status"
                                onChange={(value) => {
                                  let selectedCompany = {
                                    target: {
                                      name: "status",
                                      value: value[0].value,
                                    },
                                  };
                                  onChange(selectedCompany);
                                  return value[0].value;
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
                            </>
                          ) : (
                            <>
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
                              {error && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  Belum memilih status
                                </p>
                              )}
                            </>
                          )}

                          <div className="row">
                            {controller.DonaturInfo.is_company ? (
                              <div className="col s12" style={{
                                  marginTop: '15px',
                                  marginBottom: '15px'
                                }}>
                                <Box display="flex" flexDirection="column" >
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
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {errorMessage.companyName}
                                    </p>
                                  )}
                                </Box>
                              
                              </div>
                            ) : (
                              <div className="col s12" style={{
                                marginBottom: '20px'
                              }}>
                                <label
                                  htmlFor="comp-name"
                                  className={
                                    errors && errors.name
                                      ? "red-text"
                                      : "black-text"
                                  }
                                >
                                  Nama Lengkap
                                </label>
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
                              </div>
                            )}
                          </div>
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
                          <Controller
                            as={
                              <TextField
                                name="address"
                                multiline
                                rows={4}
                                variant="outlined"
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
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                }}
                              >
                                {errorMessage.address}
                              </p>
                            )}
                          <label style={{
                            marginTop: '20px'
                          }}>Provinsi</label>
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
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                }}
                              >
                                {errorMessage.province}
                              </p>
                            )}
                          <label style={{
                            marginTop: '20px'
                          }}>Kota</label>
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
                          <label
                          style={{
                            marginTop: '20px'
                          }}
                            htmlFor="zipcode"
                            className={
                              errors && errors.pos_code
                                ? "red-text"
                                : "black-text"
                            }
                          >
                            Kode Pos
                          </label>
                          <TextField
                            variant="outlined"
                            id="pos_code"
                            name="pos_code"
                            type="text"
                            style={{ width: "100%", marginBottom: '20px' }}
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
                          <div className="col s8">
                            {controller.DonaturInfo.is_company ? (
                              <div>
                                <label
                                  htmlFor="comp-email"
                                  className={
                                    errors && errors.email
                                      ? "red-text"
                                      : "black-text"
                                  }
                                  style={{
                            marginTop: '20px'
                          }}
                                >
                                  Surel Perusahaan
                                </label>
                                <TextField
                                  id="email"
                                  name="email"
                                  disabled={controller.selected}
                                  variant="outlined"
                                  type="email"
                                  style={{ width: "100%" }}
                                  placeholder="Alamat Surel"
                                  onChange={onChange}
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
                                      {errorMessage.email}
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
                                />
                              </div>
                            ) : (
                              <div />
                            )}
                          </div>
                        </Box>
                      </GridItem>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <Card>
                      <GridItem xs={12} sm={12} md={12}>
                        {/* <Box display="flex" flexDirection="column"> */}
                        <GridItem xs={12} sm={12} md={12}>
                          <label className={classes.label} style={{
                            fontSize: '16px'
                          }}>
                            Kontak Donatur
                          </label>
                        </GridItem>
                        {controller.DonaturInfo.is_company ? (
                          <>
                            <GridItem xs={12} sm={12} md={12}>
                              <label
                                htmlFor="contact-person"
                                className={
                                  errors && errors.name
                                    ? "red-text"
                                    : "black-text"
                                }
                                style={{
                            marginTop: '20px'
                          }}
                              >
                                Nama Kontak Person
                              </label>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <TextField
                                id="name"
                                name="name"
                                variant="outlined"
                                disabled={controller.selected}
                                type="text"
                                placeholder="Nama Kontak Person"
                                onChange={onChange}
                                inputRef={register({ required: true })}
                                style={{
                                  width: '100%',
                                  marginBottom: '20px'
                                }}
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
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <label
                                htmlFor="level-person"
                                className={
                                  errors && errors.position
                                    ? "red-text"
                                    : "black-text"
                                }
                                style={{
                            marginTop: '20px'
                          }}
                              >
                                Jabatan Kontak Person
                              </label>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <TextField
                                id="position"
                                name="position"
                                variant="outlined"
                                type="text"
                                disabled={controller.selected}
                                placeholder="Jabatan Kontak Person"
                                onChange={onChange}
                                style={{
                                  width: '100%',
                                  marginBottom: '20px'
                                }}
                                inputRef={register}
                                className={
                                  errors && errors.position
                                    ? "invalid"
                                    : "validate"
                                }
                              />
                              {errors &&
                                errors.position &&
                                errors.position.type === "required" && (
                                  <div className="red-text error-message">
                                    {errorMessage.position}
                                  </div>
                                )}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <label
                                htmlFor="phone"
                                className={
                                  errors && errors.phone
                                    ? "red-text"
                                    : "black-text"
                                }
                                style={{
                            marginTop: '20px'
                          }}
                              >
                                No Handphone
                              </label>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <TextField
                                id="phone"
                                name="phone"
                                variant="outlined"
                                type="tel"
                                disabled={controller.selected}
                                style={{ width: "100%", marginBottom: '20px'}}
                                placeholder="No Handphone"
                                onChange={onChange}
                                inputRef={register({
                                  required: true,
                                  pattern: /^[0-9]*$/i,
                                })}
                              />
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
                                    Hanya Boleh diisi dengan angka
                                  </p>
                                )}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <label className={classes.label} style={{
                                fontSize: '16px',
                                marginBottom: '20px'
                              }}>
                                Keterangan Tambahan
                              </label>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <label htmlFor="npwp" className="black-text" style={{
                            marginTop: '20px'
                          }}>
                                No NPWP
                              </label>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <TextField
                                id="npwp"
                                name="npwp"
                                variant="outlined"
                                type="text"
                                disabled={controller.selected}
                                placeholder="No NPWP"
                                inputRef={register}
                                style={{
                                  width: '100%',
                                  marginBottom: '20px'
                                }}
                                onChange={onChange}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <label htmlFor="info-donatur" style={{
                            marginTop: '20px',
                            fontSize: '16px'
                          }}>Info Donatur</label>
                            </GridItem>
                            <Controller
                              as={
                                <TextField
                                  className="text-area"
                                  id="info"
                                      variant="outlined"
                                  disabled={controller.selected}
                                  name="info"
                                  multiline
                                  rows={4}
                                  placeholder="Info Donatur"
                                  onChange={onChange}
                                  style={{
                                    minHeight: "100px",
                                    width: "100%",
                                    marginBottom: '15px'
                                  }}
                                />
                              }
                              name="info"
                              onChange={(value) => {
                                onChange(value[0]);
                                return value[0].target.value;
                              }}
                              rules={{ required: true }}
                              control={control}
                              defaultValue={info}
                            />
                          </>
                        ) : (
                          <>
                            <GridItem xs={12} sm={12} md={12}>
                              <Box display="flex" flexDirection="column">
                                <label
                                  htmlFor="phone"
                                  className={
                                    errors && errors.phone
                                      ? "red-text"
                                      : "black-text"
                                  }
                                  style={{
                            marginTop: '20px'
                          }}
                                >
                                  No Handphone
                                </label>
                                <TextField
                                  id="phone"
                                  name="phone"
                                  variant="outlined"
                                  type="tel"
                                  disabled={controller.selected}
                                  style={{ width: "100%", marginBottom: '15px'}}
                                  placeholder="No Handphone"
                                  onChange={onChange}
                                  inputRef={register({
                                    required: true,
                                    pattern: /^[0-9]*$/i,
                                  })}
                                />
                                {errors &&
                                  errors.phone &&
                                  errors.phone.type === "required" && (
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {errorMessage.phone}
                                    </p>
                                  )}
                                {errors &&
                                  errors.phone &&
                                  errors.phone.type === "pattern" && (
                                    <p
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      Hanya Boleh diisi dengan angka
                                    </p>
                                  )}
                                <div className="row">
                                  <label
                                    htmlFor="comp-email"
                                    className={
                                      errors && errors.email
                                        ? "red-text"
                                        : "black-text"
                                    }
                                    style={{
                            marginTop: '20px'
                          }}
                                  >
                                    Alamat Surel
                                  </label>
                                  <TextField
                                    id="email"
                                    name="email"
                                    disabled={controller.selected}
                                    variant="outlined"
                                    type="email"
                                    style={{ width: "100%", marginBottom: '20px' }}
                                    placeholder="Alamat Surel"
                                    onChange={onChange}

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
                                        {errorMessage.email}
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
                                  
                                </div>
                                <label className={classes.label} style={{
                            marginTop: '20px',
                            marginBottom: '15px'
                          }}>
                                  Keterangan Tambahan
                                </label>
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
                                
                                  inputRef={register}
                                  onChange={onChange}
                                />
                                <label style={{
                            marginTop: '20px',
                        
                          }}>
                                  Info Donatur
                                </label>
                                <Controller
                                  as={
                                   <TextField
                                  className="text-area"
                                  id="info"
                                  disabled={controller.selected}
                                  name="info"
                                  multiline
                                  variant="outlined"
                                  rows={4}
                                  placeholder="Info Donatur"
                                  onChange={onChange}
                                  style={{
                                    minHeight: "100px",
                                    width: "100%",
                                    marginBottom: '70px'
                                  }}
                                />
                                  }
                                  name="info"
                                  onChange={(value) => {
                                    onChange(value[0]);
                                    return value[0].target.value;
                                  }}
                                  rules={{ required: true }}
                                  control={control}
                                  defaultValue={info}
                                />
                              </Box>
                            </GridItem>
                          </>
                        )}
                      </GridItem>
                    </Card>
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
                          color="success"
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
      </ThemeProvider>
    </React.Fragment>
  );
};

export default DonorInput;
