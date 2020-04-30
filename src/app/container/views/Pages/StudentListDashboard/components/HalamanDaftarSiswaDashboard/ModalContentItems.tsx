import React, { useContext } from "react";
import SelectOptions2 from "@/app/container/components/SelectOptions2";
import { Input } from "@/app/container/components";
import {
  StudentStatus,
  EducationStatus,
  age,
} from "@/domain/entities/AllOptions";
import {
  StudentListController,
  ActionType,
  StudentListDashboardContext,
} from "../../Controller";
import moment from "moment";
import SelectWithSearch from "@/app/container/components/SelectWithSearch";
import { KeyboardDatePicker } from "@material-ui/pickers";
import _ from "lodash";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/date-fns';


const asyncDefaultValue = {
  name: 'SEMUA',
  id: ""
}

const nonasyncDefaultValue = ["", "SEMUA"]

const transformData = age.map(val => {
  return  [val[0], val[1].toString()]
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginOptions: {
      marginBottom: "20px",
    },
  })
);

const ModalContentItems = () => {
  const controller = React.useContext(StudentListDashboardContext);
  const classes = useStyles();

  const {
    school_id,
    regency,
    province,
    education_status,
    sosial_status,
    age_start,
    age_end,
    registered_start,
    registered_end,
  } = controller.filterStatus.filter;

  const handleChange = (value) => {
    controller.handleChangeFilter(value)
  };

  return (
        <MuiPickersUtilsProvider utils={MomentUtils}>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box className={classes.marginOptions}>
                      {controller.userInfo.role === 2 ? (
                        <>
                          <label htmlFor="">UNIT MADRASAH</label>
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
                            placeholder="SEMUA"
                          />
                        </>
                      ) : (
                        <>
                          <label htmlFor="">UNIT MADRASAH</label>
                          <SelectWithSearch
                            async
                            isDisabled={false}
                            onChange={(selectedValue) => {
                              controller.setFilterStatus((prevState) => ({
                                ...prevState,
                                filter: {
                                  ...prevState.filter,
                                  school_id: selectedValue.value,
                                },
                              }));
                            }}
                            value={school_id}
                            data={[
                              asyncDefaultValue,
                              ...controller.school
                            ]}
                            name="school_id"
                            label="UNIT MADRASAH"
                            placeholder={controller.loading ? "Loading..." : "SEMUA UNIT"}
                          />
                        </>
                      )}
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box className={classes.marginOptions}>
                      <label htmlFor="">PROVINSI MADRASAH</label>
                      <SelectWithSearch
                        async
                        isDisabled={false}
                        onChange={(selectedValue) => {
                          const e = {
                            target: {
                              name: 'province',
                              value: selectedValue.value
                            }
                          }
                          handleChange(e)
                        }}
                        value={province}
                        data={[
                          asyncDefaultValue,
                          ...controller.province
                        ]}
                        name="province"
                        label="PROVINSI MADRASAH"
                        placeholder={controller.loading ? "Loading..." : "SEMUA PROVINSI"}
                      />
                    </Box>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box className={classes.marginOptions}>
                    <label htmlFor="">KOTA MADRASAH</label>
                    <SelectWithSearch
                    async
                    isDisabled={false}
                    onChange={(selectedValue) => {
                      controller.setFilterStatus((prevState) => ({
                        ...prevState,
                        filter: {
                          ...prevState.filter,
                          regency: selectedValue.value,
                        },
                      }));
                    }}
                    value={regency}
                    data={[
                      asyncDefaultValue,
                      ...controller.regency
                    ]}
                    name="regency"
                    label="KOTA MADRASAH"
                    placeholder={controller.loading ? "Loading..." : "SEMUA KOTA"}
                  />
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box className={classes.marginOptions}>
                      <label htmlFor="">STATUS SOSIAL</label>
                    <SelectWithSearch
                    async={false}
                    isDisabled={false}
                    onChange={(selectedValue) => {
                      controller.setFilterStatus((prevState) => ({
                        ...prevState,
                        filter: {
                          ...prevState.filter,
                          sosial_status: selectedValue.value,
                        },
                      }));
                    }}
                    value={sosial_status}
                    name="sosial_status"
                    data={[
                      nonasyncDefaultValue,
                      ...StudentStatus
                    ]}
                    label="STATUS SOSIAL"
                    placeholder="SEMUA"
                  />
                    </Box>
                  </GridItem>
                </GridContainer>
            
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Typography component="h5" style={{
                      fontWeight: 'bold'
                    }}>Usia Siswa</Typography>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box className={classes.marginOptions}>
                      <label htmlFor="">Mulai</label>
                    <SelectWithSearch
                      async={false}
                      onChange={(selectedValue) => {
                        controller.setFilterStatus((prevState) => ({
                          ...prevState,
                          filter: {
                            ...prevState.filter,
                            age_start: selectedValue.value,
                          },
                        }));
                      }}
                      value={controller.filterStatus.filter.age_start}
                      name="age_start"
                      data={[
                        nonasyncDefaultValue,
                        ...transformData
                      ]}
                      label="Mulai"
                      placeholder="Mulai"
                    />
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box className={classes.marginOptions}>
                    <label htmlFor="">Hingga</label>
                    <SelectWithSearch
                      async={false}
                      isDisabled={false}
                      onChange={(selectedValue) => {
                        controller.setFilterStatus((prevState) => ({
                          ...prevState,
                          filter: {
                            ...prevState.filter,
                            age_end: selectedValue.value,
                          },
                        }));
                      }}
                      value={controller.filterStatus.filter.age_end}
                      name="age_end"
                      data={[
                        nonasyncDefaultValue,
                        ...transformData
                      ]}
                      label="Hingga"
                      placeholder="Hingga"
                    />
                    </Box>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Typography component="h5" style={{
                      fontWeight: 'bold'
                    }}>Tahun Masuk</Typography>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box className={classes.marginOptions}>
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
                      registered_start === ""
                        ? "Tahun Masuk"
                        : moment(registered_start).toString()
                    }
                    id="date-picker-inline"
                    label=""
                    value={
                      registered_start === ""
                        ? null : moment(registered_start).toDate()
                    }
                    onChange={(date: any) => {
                      controller.setFilterStatus((prevState) => ({
                        ...prevState,
                        filter: {
                          ...prevState.filter,
                          registered_start: moment(date).format("YYYY"),
                        },
                      }));
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                    </Box>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Box className={classes.marginOptions}>
                      <label htmlFor="">Hingga</label>
                    {_.toNumber(registered_end) < _.toNumber(registered_start) ? (
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          views={["year"]}
                          inputVariant="outlined"
                          style={{
                            width: "100%",
                          }}
                          placeholder={
                            registered_end === ""
                              ? "Tahun Masuk"
                              : moment(registered_end).toString()
                          }
                          id="date-picker-inline"
                          label=""
                          value={registered_start}
                          onChange={(date: any) => {
                            controller.setFilterStatus((prevState) => ({
                              ...prevState,
                              filter: {
                                ...prevState.filter,
                                registered_end: moment(date).format("YYYY"),
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
                            registered_end === ""
                              ? "Tahun Masuk"
                              : moment(registered_end).toString()
                          }
                          id="date-picker-inline"
                          label=""
                          style={{
                            width: "100%",
                          }}
                          value={
                            registered_end === ""
                              ? null
                              : moment(registered_end).toDate()
                          }
                          onChange={(date: any) => {
                            controller.setFilterStatus((prevState) => ({
                              ...prevState,
                              filter: {
                                ...prevState.filter,
                                registered_end: moment(date).format("YYYY"),
                              },
                            }));
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      )}
                    </Box>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
        </MuiPickersUtilsProvider>
  );
};

export default ModalContentItems;
