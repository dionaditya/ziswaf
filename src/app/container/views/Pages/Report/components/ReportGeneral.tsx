/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import PieChart from "./PieChart";
import {
  ComboChartGeneral,
  ComboChartOperator,
} from "@/app/container/components/Chart";
import ArrowForwardSharp from "@material-ui/icons/ArrowForwardIosSharp";

import Box from "@material-ui/core/Box";
import formatPrice from "@/app/infrastructures/misc/Utils";
import { ReportContext } from "../Controller";
import HSBar from "react-horizontal-stacked-bar-chart";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import { isEmpty } from "lodash";

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
      backgroundColor: "#F8F8F8",
    },
    cardTitle: {
      fontSize: 12,
      marginLeft: 10,
      color: "#757575",
    },
  })
);

const ReportGeneral = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const Location = useLocation()
  const controller = useContext(ReportContext);
  const ref = React.createRef<HTMLDivElement>();
  const options = {
    orientation: "landscape",
    unit: "in",
  };

  const cardInfoZiswaf = (
    color,
    title,
    fieldAdmin,
    fieldOperator,
    field = ""
  ) => {
    return (
      <Box
        style={{
          backgroundColor: color,
          padding: 20,
          borderRadius: 4,
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <span style={{ fontSize: 12, color: "#f2f2f2" }}>{title}</span>
        <span style={{ fontSize: 18, fontWeight: 800 }}>
          {field !== "" && (
            <>
              {controller.role !== 2
                ? controller.generalReport[fieldAdmin] || 0
                : controller.generalReportOperator[fieldOperator] || 0}
            </>
          )}

          {field === "" && (
            <>
              {controller.role !== 2
                ? formatPrice(controller.generalReport[fieldAdmin] || 0)
                : formatPrice(
                    controller.generalReportOperator[fieldOperator] || 0
                  )}
            </>
          )}
        </span>
        <span style={{ fontSize: 12, color: "#FFFFFF" }}>
          {field === "donasi" && "Donasi"}
          {field === "donatur" && "Donatur"}
        </span>
      </Box>
    );
  };

  const cardAllData = (
    color,
    title,
    percentageAdmin,
    percentOperator,
    totalAdmin,
    totalOperator,
    totalRowAdmin,
    totalRowOperator
  ) => {
    const data =
      controller.role !== 2
        ? controller.generalReport
        : controller.generalReportOperator;
    return (
      <Box
        style={{
          backgroundColor: "#FFFFFF",
          padding: 10,
          borderRadius: 6,
          color: "#6A7088",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "15vh",
          marginBottom: 20,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06",
        }}
      >
        <span
          style={{
            fontSize: 22,
            color: color,
            marginBottom: 5,
          }}
        >
          {controller.role === 1
            ? data[percentageAdmin] || 0
            : data[percentOperator] || 0}{" "}
          %
        </span>
        <span style={{ fontSize: 12, color: "#6A7088" }}>
          {" "}
          Terkumpul dari {title}
        </span>
        <span style={{ fontSize: 18, fontWeight: 800, padding: 5 }}>
          {controller.role === 1
            ? formatPrice(data[totalAdmin] || 0)
            : formatPrice(data[totalOperator] || 0)}
        </span>
        <span style={{ fontSize: 12, color: "#6A7088" }}>
          <span style={{ fontWeight: 800 }}>
            {controller.role === 1
              ? data[totalRowAdmin] || 0
              : data[totalRowOperator] || 0}
          </span>{" "}
          Donatur
        </span>
      </Box>
    );
  };

  const cardPerdivision = (
    color,
    title,
    fieldAdmin,
    fieldOperator,
    percentage
  ) => {
    const data =
      controller.role === 1
        ? controller.generalReport[fieldAdmin]
        : controller.generalReportOperator[fieldOperator];
    return (
      <Box
        style={{
          backgroundColor: "#FFFFFF",
          padding: 10,
          borderRadius: 6,
          color: "#6A7088",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "7vh",
          marginBottom: 20,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06",
        }}
      >
        <span style={{ fontSize: 12, color: "#6A7088" }}>{title}</span>
        <span style={{ fontSize: 18, fontWeight: 800, padding: 3 }}>
          {formatPrice(data || 0)}
        </span>
        <div
          style={{
            margin: "5px 0px",
            height: 4,
            borderRadius: 2,
            width: `100%`,
            backgroundColor: "#EBEBEB",
          }}
        >
          <div
            style={{
              height: 4,
              borderRadius: 2,
              width: `${percentage}%`,
              backgroundColor: `${color}`,
            }}
          ></div>
        </div>
      </Box>
    );
  };

  const ziswafPercentage =
    controller.role !== 2
      ? controller.totalZiswafPercent
      : controller.totalZiswafPercentOperator;
  const cardTypeDonasi = (color, title, fieldAdmin, fieldOperator, percent) => {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 10, color: "#6A7088" }}>{title}</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#161616" }}>
            {controller.role !== 2
              ? formatPrice(controller.generalReport[fieldAdmin])
              : formatPrice(controller.generalReportOperator[fieldOperator])}
          </span>
          <div
            style={{
              margin: "5px 0px",
              height: 4,
              borderRadius: 2,
              width: `100%`,
              backgroundColor: "#EBEBEB",
            }}
          >
            <div
              style={{
                height: 4,
                borderRadius: 2,
                width: `${ziswafPercentage[percent]}%`,
                backgroundColor: `${color}`,
              }}
            ></div>
          </div>
        </Box>
        <span style={{ fontSize: 18, color: color }}>
          {ziswafPercentage[percent]}%
        </span>
      </Box>
    );
  };

  const dataDonation = [
    {
      color: "#063EFD",
      title: "Zakat Mall",
      fieldAdmin: "totalZakatMaal",
      fieldOperator: "total_zakat_mall",
      percent: "zakatMaalPersent",
    },
    {
      color: "#2ED47A",
      title: "Infaq/Shadqah",
      fieldAdmin: "totalInfaq",
      fieldOperator: "total_infaq",
      percent: "infaqPersent",
    },
    {
      color: "#FFB946",
      title: "Zakat Fitrah",
      fieldAdmin: "totalZakatFitrah",
      fieldOperator: "total_zakat_fitrah",
      percent: "zakatFitrahPersent",
    },
    {
      color: "#F7685B",
      title: "Wakaf",
      fieldAdmin: "totalWakaf",
      fieldOperator: "total_wakaf",
      percent: "waqafPersent",
    },
    {
      color: "#E546FF",
      title: "Penerimaan Lain",
      fieldAdmin: "totalOther",
      fieldOperator: "total_other",
      percent: "otherPersent",
    },
    {
      color: "#5BEEF7",
      title: "Kurban",
      fieldAdmin: "totalKurban",
      fieldOperator: "total_kurban",
      percent: "qurbanPersent",
    },
  ];

  const getDataPieChart = () => {
    const transformData = dataDonation.map((item) => {
      return {
        label: item.title,
        color: item.color,
        percent:
          ziswafPercentage[item.percent] === undefined
            ? 0
            : ziswafPercentage[item.percent],
      };
    });
    return transformData;
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    {cardInfoZiswaf(
                      "#2C39C2",
                      "Total Ziswaf Terkumpul",
                      "total",
                      "total"
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    {cardInfoZiswaf(
                      "#FFA500",
                      "Total Donasi Masuk",
                      "totalRowCount",
                      "total_row_count",
                      "donasi"
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    {cardInfoZiswaf(
                      "#32CD32",
                      "Total Donatur",
                      "totalRowDonorCount",
                      "total_row_donor_count",
                      "donatur"
                    )}
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
                <Card>
                  <CardBody>
                    {controller.role !== 2 ? (
                      <ComboChartGeneral
                        title="Realisasi"
                        title2="Prognosis"
                        width="100%"
                        type="line"
                        role={controller.role}
                        color={["#f0871d", "#F7685B"]}
                        dataPrognosis={Object.values(
                          controller.tableCommonReport
                        )}
                        dataTransaction={Object.values(
                          controller.tablePermonthReport
                        )}
                        dataPerDay={Object.values(controller.tableRetailOp)}
                        dataPerDayProp={Object.keys(controller.tableRetailOp)}
                      />
                    ) : (
                      <ComboChartOperator
                        title="Realisasi Retail"
                        width="100%"
                        type="line"
                        color={["#00923F"]}
                        dataTransaction={Object.values(
                          controller.tableRetailOp
                        )}
                        dataPerDayProp={Object.keys(controller.tableRetailOp)}
                      />
                    )}
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <Card>
              <CardHeader className={classes.cardHeader}>
                <h4 className={classes.cardTitle}>Donasi Per Jenis ZISWAF</h4>
              </CardHeader>
              <CardBody>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PieChart
                    type="donut"
                    width="100%"
                    status
                    series={getDataPieChart().map((item) => {
                      return item.percent;
                    })}
                    total={getDataPieChart()
                      .map((item) => {
                        return item.percent;
                      })
                      .reduce((a, b) => a + b, 0)}
                    data={getDataPieChart()}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    {dataDonation.map((item) => (
                      <GridItem
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: 10 }}
                      >
                        {cardTypeDonasi(
                          item.color,
                          item.title,
                          item.fieldAdmin,
                          item.fieldOperator,
                          item.percent
                        )}
                      </GridItem>
                    ))}
                  </GridContainer>
                </GridItem>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer style={{ display: "flex", alignItems: "flex-end" }}>
          <GridItem xs={12} sm={12} md={5}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                {cardAllData(
                  "#3059FF",
                  "Corp",
                  "totalPersentCompanyDonor",
                  "total_percent_company_donor",
                  "totalCompanyDonor",
                  "total_company_donor",
                  "totalCompanyDonorRowCount",
                  "total_company_donor_row_count"
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                {cardAllData(
                  "#C61CCA",
                  "Perorangan",
                  "totalPersentPersonDonor",
                  "total_percent_person_donor",
                  "totalPersonDonor",
                  "total_person_donor",
                  "totalPersonDonorRowCount",
                  "total_person_donor_row_count"
                )}
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <span
                  style={{ fontSize: 18, fontWeight: 700, color: "#323C47" }}
                >
                  Penerimaan berdasarkan Divisi
                </span>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Box style={{ padding: "10px 0px" }}>
                  <HSBar
                    height={10}
                    data={[
                      {
                        value: controller.role === 1 ? controller.divPercent.percentUpz || 0 : controller.divisionReportOperator.total_percent_upzDivision || 0,
                        color: "#F2685B",
                      },
                      {
                        value: controller.role === 1 ? controller.divPercent.percentRetail || 0 : controller.divisionReportOperator.total_percent_retailDivision || 0,
                        color: "#50D47A",
                      },
                      {
                        value: controller.role === 1 ? controller.divPercent.percentCorporate || 0 : controller.divisionReportOperator.total_percent_corporateDivision || 0,
                        color: "#F6B946",
                      },
                    ]}
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    {cardPerdivision(
                      "#F7685B",
                      "Terkumpul dari Div.Ritel",
                      "totalUpz",
                      "total_upz",
                      controller.divPercent.percentUpz || 0
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    {cardPerdivision(
                      "#2ED47A",
                      "Terkumpul dari Div.Corp",
                      "totalRetail",
                      "total_retail",
                      controller.divPercent.percentRetail || 0
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    {cardPerdivision(
                      "#FFB946",
                      "Terkumpul dari Div.UPZ",
                      "totalCorporate",
                      "total_corporate",
                      controller.divPercent.percentCorporate || 0
                    )}
                  </GridItem>
                </GridContainer>
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
            cursor: 'pointer'
          }}
          onClick={() => controller.setReportType('division')}
        >
          <span style={{marginRight: 10}}>Selanjutnya</span>
          <i className="material-icons" style={{ fontSize: 18 }}>
            arrow_forward
          </i>
        </Box>
      </GridItem>
    </GridContainer>
  );
};

export default ReportGeneral;
