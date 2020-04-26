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
              <SelectWithSearch
              async
              isDisabled={false}
              onChange={(e) => {
                controller.setFilterStatus((prevState) => ({
                  ...prevState,
                  filter: {
                    ...prevState.filter,
                    school_id: e.value,
                  },
                }));
              }}
              value={controller.filterStatus.filter.school_id}
              data={controller.school}
              name="school_id"
              label="UNIT MADRASAH"
              placeholder="UNIT MADRASAH"
            />
            ) : (
              <SelectWithSearch
                async
                isDisabled
                onChange={handleChange}
                value={controller.userInfo.school_id}
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
              data={controller.province}
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
              data={controller.regency}
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
              data={EmployeeStatus}
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
              disableToolbar
              variant="inline"
              views={["year"]}
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
                    register_start: moment(date).format("YYYY"),
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
            {_.toNumber(register_end) < _.toNumber(register_start) ? (
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                views={["year"]}
                inputVariant="outlined"
                style={{
                  width: "100%",
                }}
                placeholder={
                  register_end === null
                    ?  'Tahun Masuk'
                    : moment(register_end).toString()
                }
                id="date-picker-inline"
                label=""
                value={register_start}
                onChange={(date: any) => {
                  controller.setFilterStatus((prevState) => ({
                    ...prevState,
                    filter: {
                      ...prevState.filter,
                      register_end: moment(date).format("YYYY"),
                    },
                  }));
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            ) : (
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                views={["year"]}
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
                      register_end: moment(date).format("YYYY"),
                    },
                  }));
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            )}
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default ModalContentItems;
