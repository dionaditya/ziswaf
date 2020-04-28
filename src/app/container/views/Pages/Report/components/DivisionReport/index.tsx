/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import { ComboCharts } from "@/app/container/components/Chart";
import "react-datepicker/dist/react-datepicker.css";
import DataTableReportPencapaianDivisi from "@/app/container/components/ReportDataTables/PencapaianDivisi";
import { ReportContext } from "../../Controller";
import Box from "@material-ui/core/Box";

import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import TableViewPerDonation from "../TableViewPerDonation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    labels: {
      fontSize: 14,
      fontWeight: 700,
      color: "#757575",
    },
    subLabel: {
      fontSize: 12,
      marginLeft: 10,
      color: "#757575",
    },
    boxSelect: {
      marginTop: 10,
    },
    cardHeader: {
      borderBottom: "1px solid #EBEFF2",
    },
    cardTitle: {
      fontSize: 18,
      marginLeft: 10,
      color: "#323C47",
    },
  })
);

const stackprogress = (color, percent) => {
  return (
    <Box style={{ marginBottom: 20 }}>
      <span style={{ color: "#6A7088", fontSize: 16 }}>
        Pencapaian Prognosis:{" "}
        <span style={{ fontWeight: 800 }}>{percent} %</span>
      </span>
      <div
        style={{
          margin: "5px 0px",
          height: 6,
          borderRadius: 2,
          width: `100%`,
          backgroundColor: "#EBEBEB",
        }}
      >
        <div
          style={{
            height: 6,
            borderRadius: 2,
            width: `${percent > 100 ? 100 : percent}%`,
            backgroundColor: `${color}`,
          }}
        ></div>
      </div>
    </Box>
  );
};
const LaporanDivisi = () => {
  const classes = useStyles();
  const controller = useContext(ReportContext);

  return (
    <GridContainer style={{ paddingLeft: window.innerWidth > 959 ? 20 : 0 }}>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem
            xs={12}
            sm={6}
            md={6}
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <span style={{ fontSize: 18, color: "#323C47", fontWeight: 800 }}>
              Grafik Pencapaian Per Divisi
            </span>
          </GridItem>
          <GridItem
            xs={12}
            sm={6}
            md={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box
              style={{
                color: "#00923F",
                fontWeight: 800,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => controller.setReportType("general")}
            >
              <i className="material-icons" style={{ fontSize: 18 }}>
                arrow_back
              </i>
              <span style={{ marginLeft: 10 }}>Kembali</span>
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginTop: 27 }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    {" "}
                    <span className={classes.cardTitle}>Div Ritel</span>
                  </CardHeader>
                  <CardBody>
                    <Box style={{ padding: "0px 10px" }}>
                      {controller.role === 1 &&
                        stackprogress(
                          "#00796B",
                          controller.divisionReport.totalPersentRetail || 0
                        )}
                      <ComboCharts
                        width="100%"
                        type="line"
                        title="Realisasi Retail"
                        title2={controller.role === 1 && "Prognosis Retail"}
                        role={controller.role}
                        color={["#00796B", "#00796B"]}
                        dataPrognosis={Object.values(
                          controller.PrognosisRetail
                        )}
                        dataPerMonth={Object.values(controller.retailPermonth)}
                        dataPerDay={controller.tableRetailOp}
                        dataPerDayProp={Object.keys(controller.tableRetailOp)}
                      />
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    {" "}
                    <span className={classes.cardTitle}>Div Corporate</span>
                  </CardHeader>
                  <CardBody>
                    <Box style={{ padding: "0px 10px" }}>
                      {controller.role === 1 &&
                        stackprogress(
                          "#B71C1C",
                          controller.divisionReport.totalPersentCorporate || 0
                        )}
                      <ComboCharts
                        width="100%"
                        type="line"
                        title="Realisasi Corporate"
                        title2={controller.role === 1 && "Prognosis Corporate"}
                        color={["#EA8A8A", "#B71C1C"]}
                        role={controller.role}
                        dataPrognosis={Object.values(
                          controller.prognosisCorporate
                        )}
                        dataPerMonth={Object.values(
                          controller.corporatePermonth
                        )}
                        dataPerDay={controller.tableCoprOp}
                        dataPerDayProp={Object.keys(controller.tableCoprOp)}
                      />
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader className={classes.cardHeader}>
                    {" "}
                    <span className={classes.cardTitle}>Div UPZ</span>
                  </CardHeader>
                  <CardBody>
                    <Box style={{ padding: "0px 10px" }}>
                      {controller.role === 1 &&
                        stackprogress(
                          "#1976D2",
                          controller.divisionReport.totalPersentUpz || 0
                        )}
                      <ComboCharts
                        width="100%"
                        type="line"
                        title="Realisasi Upz"
                        title2={controller.role === 1 && "Prognosis UPZ"}
                        role={controller.role}
                        color={["#6697C8", "#1976D2"]}
                        dataPrognosis={Object.values(controller.prognosisUpz)}
                        dataPerMonth={Object.values(controller.upzPermonth)}
                        dataPerDay={controller.tableUpzOp}
                        dataPerDayProp={Object.keys(controller.tableUpzOp)}
                      />
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <span className={classes.labels}>Pencapaian Per Divisi</span>
                <DataTableReportPencapaianDivisi
                  role={controller.role}
                  column=""
                  general={controller.generalReport}
                  data={controller.divisionReport}
                  dashboardData={controller.dashboardData}
                  dataOperator={controller.divisionReportOperator}
                  generalOperator={controller.generalReportOperator}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
                <span className={classes.labels}>
                  Jumlah Dana Per Divisi dan Kategori
                </span>
                <TableViewPerDonation
                  dataAdmin={controller.divisionReport}
                  dataOperator={controller.divisionReportOperator}
                  role={controller.role}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "30px 0px",
        }}
      >
        <Box
          style={{
            color: "#00923F",
            fontWeight: 800,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => controller.setReportType("finance")}
        >
          <span style={{ marginRight: 10 }}>Selanjutnya</span>
          <i className="material-icons" style={{ fontSize: 18 }}>
            arrow_forward
          </i>
        </Box>
      </GridItem>
    </GridContainer>
  );
};

export default LaporanDivisi;
