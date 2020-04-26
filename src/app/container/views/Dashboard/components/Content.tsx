import React, { useContext, useState } from "react";
import "../../../assets/css/App.css";
import { MyChart } from "@/app/container/components/Chart";
import Greetings from "@/app/container/components/Greetings";
import "react-datepicker/dist/react-datepicker.css";
import UnitSelect from "../../../components/UnitSelect";
import Box from "@material-ui/core/Box";
import moment from 'moment';
import SummaryDashboardReport from "@/app/container/components/SummaryDashboardReport";
import DonationTypeChartLegend from "@/app/container/components/DonationTypeChartLegend";
import SummaryByCategory from "@/app/container/components/SummaryByCaegory";
import { DashboardContext } from "../Controller";

import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import DateTimePicker from "@/app/container/commons/DateTimePicker";

import Card from "@/app/container/commons/Card/Card.js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rows: {
      width: "auto",
    },
    cardHeader: {
      padding: "0px 30px",
      backgroundColor: "#F8F8F8",
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
      fontSize: 14,
    },
    filterSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "row",
      backgroundColor: "#000",
    },
    input: {
      height: 10,
    },
    datepicker: {
      height: "50px",
    },
  })
);

const Content = () => {
  const classes = useStyles();
  const controller = useContext(DashboardContext);
  
  const handleFilterUnit = (value) => {
    controller.role !== 2
      ? controller.setFilterParamAdmin((prevState) => ({
          ...prevState,
          filter: {
            ...prevState.filter,
            school_id: value,
          },
        }))
      : controller.setFilterParam((prevState) => ({
          ...prevState,
          filter: {
            ...prevState.filter,
            school_id: value,
          },
        }));
  };

  const handleSearchSchool = (value) => {
    controller.getSchoolData(value);
  };

  const handleFilterDate = (field, value) => {
    controller.role !== 2
      ? controller.setFilterParamAdmin((prevState) => ({
          ...prevState,
          filter: {
            ...prevState.filter,
            [field]: moment(value).toISOString(),
          },
        }))
      : controller.setFilterParam((prevState) => ({
          ...prevState,
          filter: {
            ...prevState.filter,
           [field]: moment(value).toISOString(),
            school_id: controller.idSchool,
          },
        }));
  };

  const startDateAdmin = controller.filterParamAdmin.filter.start_date;
  const startDateOperator = controller.filterParam.filter.start_date;

  const formatEndDate = (date, type, step) => {
    const format = step === 'start' ? moment(date).startOf(type).toDate() : moment(date).endOf(type).toDate()
    return format;
  }

  const defaultValueOperator = {
    label: controller.filterParam.filter.school_name,
    value: controller.filterParam.filter.school_id,
  };
  const showColor = controller.selectedSeries.map((val) => val.color);


  return (
    <div>
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={12} className={classes.rows}>
          <Greetings status={controller.role} name={controller.name} />
          {controller.loading && <span style={{height: 7, width: "auto", backgroundColor: "#FFA500", fontSize: 12, padding: "1px 5px", borderRadius: 5, color: "#FFFFFF"}}>Loading...</span>}
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <span className={classes.label} style={{ marginRight: 5 }}>
            Unit
          </span>
          <UnitSelect
            valState={controller.labelSearch}
            inputLabel="Semua Unit"
            handleSearch={handleSearchSchool}
            options={controller.filterDataSchool}
            isDisabled={controller.role === 2}
            defaultValue={
              controller.role === 1
                ? controller.labelSearch
                : defaultValueOperator
            }
            handleChange={(value) => {
              controller.setLabelSearch(value.label);
              handleFilterUnit(value.value);
            }}
          />
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={classes.label}
              style={{ marginRight: 5, marginLeft: 20 }}
            >
              from
            </span>
            <DateTimePicker
              // openTo="year"
              // views={["year"]}
              minDate={formatEndDate(
                controller.role !== 2 ? startDateAdmin : startDateOperator,
                controller.role !== 2 ? 'year' : 'month',
                'start'
              )}
              maxDate={formatEndDate(
                controller.role !== 2 ? startDateAdmin : startDateOperator,
                controller.role !== 2 ? 'year' : 'month',
                'end'
              )}
              handleDateChange={(value) =>
                handleFilterDate("start_date", value)
              }
              format="dd/MM/yyyy"
              selectedDate={
                controller.role !== 2 ? startDateAdmin : startDateOperator
              }
            />
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={classes.label}
              style={{ marginRight: 5, marginLeft: 5 }}
            >
              to
            </span>
            <DateTimePicker
              minDate={formatEndDate(
                controller.role !== 2 ? startDateAdmin : startDateOperator,
                controller.role !== 2 ? 'year' : 'month',
                'start'
              )}
              maxDate={formatEndDate(
                controller.role !== 2 ? startDateAdmin : startDateOperator,
                controller.role !== 2 ? 'year' : 'month',
                'end'
              )}
              handleDateChange={(value) => handleFilterDate("end_date", value)}
              format="dd/MM/yyyy"
              selectedDate={
                controller.role !== 2
                  ? controller.filterParamAdmin.filter.end_date
                  : controller.filterParam.filter.end_date
              }
            />
          </Box>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <SummaryDashboardReport
            summary={controller.role !== 2 ? controller.dataDashboard : controller.dataDashboardOperator}
            dataCompare={controller.dataCompare}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Box style={{marginTop: 20}}>
          <Card>
            <div style={{ padding: "20px 10px 10px 10px", borderRadius: 5 }}>
              <div style={{ marginBottom: 0, marginLeft: 15 }}>
                <span
                  style={{
                    fontFamily: "roboto",
                    fontSize: "18px",
                    color: "#31394D",
                  }}
                >
                  Grafik Donasi Per Jenis Donasi
                </span>
              </div>
              <GridContainer style={{ alignItems: "center" }}>
                <GridItem xs={12} sm={12} md={10}>
                  <Box display="flex" flexWrap="wrap" p={1} m={1}>
                    <DonationTypeChartLegend
                      colors={controller.colors}
                      series={controller.dataSeries}
                      selected={controller.selectedSeries}
                      onClick={controller.handleClick}
                    />
                  </Box>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        marginTop: "5px",
                        height: "100%",
                        marginRight: "5px",
                      }}
                    >
                      <div
                        style={{
                          height: "1px",
                          width: "30px",
                          border: "1px solid  #4072EE",
                          backgroundColor: "#4072EE",
                        }}
                      />
                      <div
                        className="legend"
                        style={{
                          width: "15px",
                          height: "15px",
                          border: "2px solid  #4072EE",
                          borderRadius: "50%",
                          position: "absolute",
                          left: "8px",
                          top: "-7px",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Total penerimaan
                    </span>
                  </div>
                </GridItem>
              </GridContainer>
              <MyChart
                type="line"
                width="100%"
                role={controller.role}
                series={controller.selectedSeries}
                categories={controller.categories}
                categoriesPerday={controller.categoriesPerDay}
                colors={showColor}
              />
            </div>
          </Card>
        
          </Box>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          {controller.role === 1 && (
            <SummaryByCategory
              summary={controller.dataDashboard}
              dataRetail={controller.dataPerMonthRetail}
              categoriesRetail={Object.keys(controller.dataRetailPerMonth)}
              dataUpz={controller.dataPerMonthUpz}
              categoriesUpz={Object.keys(controller.dataUpzPerMonth)}
              dataCorporate={controller.dataPerMonthCorporate}
              categoriesCorporate={Object.keys(
                controller.dataCorporatePerMonth
              )}
            />
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Content;
