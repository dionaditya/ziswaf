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
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setValue,
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
      { position: position },
      { province_id: province_id },
      { pos_code: pos_code },
      { regency_id: regency_id },
      { phone: phone },
      { email: email },
      { name: name },
    ]);
  }, [controller.selected]);

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
    if (_.isEmpty(errors)) {
      const [status, response] = await controller.postData();
      if (controller.selected) {
        history.push(
          `/dashboard/corporate-transaction/${controller.DonationInfo.donor_id}`
        );
      } else {
        if (status === "error") {
          if(response.data.message === 'Email must be a valid email ') {
              setError(true)
          } else {
             setStatusModal(true);
             setError(false)
          }
          
        } else {
          history.push(
            `/dashboard/corporate-transaction/${response.data.data.id}`
          );
        }
      }
    }
  };

  const handleUpdateInput = async () => {
    const resp = await controller.postUpdateData();
    if (resp) {
      history.push(`/dashboard/corporate-transaction/${resp.id}`);
    }
  };

  console.log(controller.DonaturInfo);

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
                          inputRef={register({ required: true })}
                        />
                        {errors &&
                          errors.email &&
                          errors.email.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errorMessage.email}
                            </p>
                          )}
                          {
                            error &&
                                <p style={{ color: "red", fontSize: "12px" }}>
                              Email bukan email yang valid
                            </p>

                          }
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
                        <TextField
                          id="phone"
                          name="phone"
                          variant="outlined"
                          type="tel"
                          disabled={controller.selected}
                          style={{ width: "100%" }}
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
                          inputRef={register}
                          onChange={onChange}
                        />
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
                          rules={{ required: true }}
                          control={control}
                          defaultValue={info}
                        />
                      </Box>
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
