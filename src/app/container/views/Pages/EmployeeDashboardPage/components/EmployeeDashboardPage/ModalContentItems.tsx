import React, { useContext } from "react";
import { EmployeeStatus } from "@/domain/entities/AllOptions";
import { StudentListDashboardContext } from "../../Controller";
import SelectWithSearch, {
  SelectWithSearchWithDebounced,
} from "@/app/container/components/SelectWithSearch";
import moment from "moment";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {

  KeyboardDatePicker,
} from "@material-ui/pickers";
import _ from "lodash";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const asyncDefaultValue = {
  name: 'SEMUA',
  id: ""
}

const nonasyncDefaultValue = ["", "SEMUA"]

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: "bold",
    },
  })
);

const ModalContentItems = () => {
  const controller = React.useContext(StudentListDashboardContext);
  const [startDate, setStartDate] = React.useState<any>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(
    controller.filterStatus.filter.register_end
  );

  const classes = useStyles();

  const {
    school_id,
    regency,
    province,
    status,
    register_start,
    register_end,
  } = controller.filterStatus.filter;

  const handleChange = (e) => {
    controller.handleChangeFilter(e)(controller.dispatch);
  };


  const isAdmin = controller.userInfo.role === 1;

  return (
    <GridContainer>
      <ThemeProvider theme={innerTheme}>
          <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <label htmlFor="">Asal Unit</label>
            {isAdmin ? (
               <SelectWithSearchWithDebounced
               isDisabled={false}
               loadOptions={controller.loadData}
               onChange={(e) => {
                 controller.setFilterStatus((prevState) => ({
                   ...prevState,
                   filter: {
                     ...prevState.filter,
                     school_id: e.value,
                   },
                 }));
               }}
               value={school_id}
               data={[asyncDefaultValue, ...controller.school]}
               name="school_id"
               label="UNIT"
               debounced={controller.debounce}
               placeholder={controller.loading ? "loading..." : "SEMUA"}
             />
            ) : (
              <SelectWithSearch
                async
                isDisabled
                onChange={handleChange}
                value={controller.userInfo.school.id}
                data={[
                  {
                    id: controller.userInfo.school.id,
                    name: controller.userInfo.school.name,
                  },
                ]}
                name="school_id"
                label="UNIT MADRASAH"
              />
            )}
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <label htmlFor="">Provinsi</label>
            <SelectWithSearch
              async
              isDisabled={false}
              onChange={(e) => {
                controller.setFilterStatus((prevState) => ({
                  ...prevState,
                  filter: {
                    ...prevState.filter,
                    province: e.value,
                  },
                }));
              }}
              value={province}
              data={[
                asyncDefaultValue,
                ...controller.province
              ]}
              name="province"
              label="SEMUA PROVINSI"
              placeholder="SEMUA PROVINSI"
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{
              marginBottom: "20px",
            }}
          >
            <label htmlFor="">Kota</label>
            <SelectWithSearch
              async
              isDisabled={false}
              onChange={(e) => {
                controller.setFilterStatus((prevState) => ({
                  ...prevState,
                  filter: {
                    ...prevState.filter,
                    regency: e.value,
                  },
                }));
              }}
              value={regency}
              data={[
                asyncDefaultValue,
                ...controller.regency
              ]}
              name="regency"
              placeholder="SEMUA KOTA"
              label="SEMUA KOTA"
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{
              marginBottom: "20px",
            }}
          >
            <label htmlFor="">Status Pegawai</label>
            <SelectWithSearch
              async={false}
              isDisabled={false}
              onChange={(e) => {
                controller.setFilterStatus((prevState) => ({
                  ...prevState,
                  filter: {
                    ...prevState.filter,
                    status: e.value,
                  },
                }));
              }}
              value={status}
              name="status"
              placeholder="STATUS PEGAWAI"
              data={[
                nonasyncDefaultValue,
                ...EmployeeStatus
              ]}
              label="STATUS PEGAWAI"
            />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            style={{
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Typography className={classes.title}>Tahun Masuk</Typography>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{
              marginBottom: "10px",
            }}
          >
            <label htmlFor="registered_year_start">Mulai</label>
            <KeyboardDatePicker
              variant="inline"
              format="dd-MM-yyyy"
              style={{
                width: "100%",
              }}
              inputVariant="outlined"
              placeholder={
                register_start === null
                  ? 'Tahun Masuk'
                  : moment(register_start).toString()
              }
              id="date-picker-inline"
              label=""
              value={
                register_start === null
                  ? null
                  : moment(register_start).toDate()
              }
              onChange={(date: any) => {
                controller.setFilterStatus((prevState) => ({
                  ...prevState,
                  filter: {
                    ...prevState.filter,
                    register_start: moment(date).toISOString(),
                  },
                }));
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={{
              marginBottom: "10px",
            }}
          >
            <label htmlFor="registered_year_start">Hingga</label>
            <KeyboardDatePicker
                variant="inline"
                format="dd-MM-yyyy"
                minDate={moment(register_start).toDate()}
                inputVariant="outlined"
                placeholder={
                  register_end === null
                    ?  'Tahun Masuk'
                    : moment(register_end).toString()
                }
                id="date-picker-inline"
                label=""
                style={{
                  width: "100%",
                }}
                value={
                  register_end === null
                    ? null : moment(register_end).toDate()
                }
                onChange={(date: any) => {
                  controller.setFilterStatus((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      register_end: moment(date).toISOString(),
                    },
                  }));
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
          </GridItem>
        </GridContainer>
      </GridItem>
      </ThemeProvider>>
    
    </GridContainer>
  );
};

export default ModalContentItems;
