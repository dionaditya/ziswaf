import React, { useState } from "react";
import { Input } from "@/app/container/components/index";
import SelectOptions from "@/app/container/components/SelectOptions";
import ModalWarning from "./ModalWarning";
import { useForm, Controller } from "react-hook-form";
import AutoSearch from "@/app/container/components/AutoCompleteSearch";
import { CorporateContext } from "../Controller";
import moment from "moment";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import {
  Box,
  Radio,
  makeStyles,
  createStyles,
  Theme,
  TextField,
  Paper,
} from "@material-ui/core";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import _ from "lodash";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
      padding: "30px 20px  ",
      minHeight: "200px",
      height: "100%",
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
    input: {
      height: 10,
    },
  })
);

const UpzInput = ({ index, setIndex }) => {
  const { register, handleSubmit, watch, errors, control } = useForm();
  const controller = React.useContext(CorporateContext);
  const classes = useStyles();
  const [showComponent, setShowComponent] = useState(0);
  const [receipt_date, setDate] = React.useState(new Date());

  const onChange = (e: any) => {
    controller.handleInput(e);
  };

  const handleChange = (e: any) => {
    setShowComponent(parseInt(e.target.value));
  };

  const onSubmit = (data) => {
    console.log(data)
    controller.handleSubmit(data, showComponent);
  };

  console.log(controller.selectedEmployee);

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ThemeProvider theme={innerTheme}>
          <Paper
            elevation={0}
            style={{
              width: "100%",
              minHeight: "100vh",
              height: "100%",
              padding: "20px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Card className={classes.container}>
                    <GridItem xs={12} sm={12} md={12}>
                      <label className={classes.label}>Search</label>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <AutoSearch
                        value={controller.employeeQuery}
                        data={controller.employeeOptions}
                        handleChange={(e) => controller.handleEmployeeQuery(e)}
                        onSelect={(e) => controller.handleSelectedEmployee(e)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <label className={classes.label}>Nama Petugas</label>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <TextField
                        id="name"
                        name="name"
                        type="text"
                        disabled
                        variant="outlined"
                        style={{ width: "100%" }}
                        placeholder="Nama Petugas"
                        value={controller.selectedEmployee.name || ""}
                        onChange={onChange}
                        inputRef={register({ required: true })}
                      />
                      {_.isEmpty(controller.selectedEmployee) &&
                        errors &&
                        errors.name &&
                        errors.name.type === "required" && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            Belum memilih personel ma'had
                          </p>
                        )}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <label className={classes.label}>Unit</label>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <TextField
                        id="school_name"
                        name="school_name"
                        type="text"
                        variant="outlined"
                        style={{ width: "100%" }}
                        placeholder="Unit"
                        disabled
                        value={controller.selectedEmployee.school_id || ""}
                        onChange={onChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <label className={classes.label}>Kota</label>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        id="regency_name"
                        name="regency"
                        type="text"
                        disabled
                        variant="outlined"
                        style={{ width: "100%" }}
                        placeholder="Kota"
                        value={controller.selectedEmployee.regency_id || ""}
                        onChange={onChange}
                      />
                    </GridItem>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <Card className={classes.container}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <label className={classes.label}>
                          Tanggal Kwitansi
                        </label>
                        <Controller
                          as={
                            <KeyboardDatePicker
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              style={{
                                width: "100%",
                              }}
                              format="dd/MM/yyyy"
                              placeholder={"Tanggal Kwitansi"}
                              name="receipt_date"
                              inputRef={register({ required: true })}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                              onChange={(date: any) => {
                                setDate(date);
                              }}
                              value={receipt_date}
                            />
                          }
                          name="receipt_date"
                          rules={{ required: true }}
                          control={control}
                        />
                        {errors &&
                          errors.receipt_date &&
                          errors.receipt_date.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              Belum mengisi tanggal kwitansi
                            </p>
                          )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <label className={classes.label}>No Kwitansi</label>
                        <TextField
                          id="kwitansi"
                          name="kwitansi"
                          type="text"
                          variant="outlined"
                          style={{ width: "100%" }}
                          placeholder="No Kwitansi"
                          inputRef={register({ required: true })}
                          onChange={onChange}
                        />
                        {errors &&
                          errors.kwitansi &&
                          errors.kwitansi.type === "required" && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              Belum mengisi nomor kwitansi
                            </p>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                        <h2 className="black-text">Kategori Donatur</h2>
                      </GridItem>

                      <Box display="flex" flexDirection="row" marginLeft="20px">
                        <FormControlLabel
                          control={
                            <Checkbox
                              icon={<CircleUnchecked />}
                              color="primary"
                              checkedIcon={<CircleCheckedFilled />}
                              checked={showComponent === 0 ? true : false}
                              onChange={(e) => setShowComponent(0)}
                              name="is_company"
                            />
                          }
                          label="Perorangan"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              icon={<CircleUnchecked />}
                              color="primary"
                              checkedIcon={<CircleCheckedFilled />}
                              checked={showComponent === 1 ? true : false}
                              onChange={(e) => setShowComponent(1)}
                              name="is_company"
                            />
                          }
                          label="Perusahaan"
                        />
                      </Box>
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        style={{ position: "absolute", bottom: "20px" }}
                      >
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="flex-end"
                        >
                          <Button
                            type="submit"
                            value="Simpan dan Lanjutkan"
                            onClick={() => {}}
                            color="primary"
                          >
                            Simpan & Lanjutkan
                          </Button>
                        </Box>
                      </GridItem>
                    </GridContainer>
                  </Card>
                </GridItem>
              </GridContainer>
            </form>
          </Paper>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default UpzInput;

// <TextField
//                       id="receipt_date"
//                       name="receipt_date"
//                       type="date"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       inputRef={register({ required: true })}
//                       placeholder="receipt_date"
//                       onChange={onChange}
//                     />
