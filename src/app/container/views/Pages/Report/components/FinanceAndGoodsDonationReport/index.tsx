/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import PieChart from "../PieChart/index";
import DataDetailPosisiKeuangan from "@/app/container/components/ReportDataTables/DetailPosisiKeuangan";
import "react-datepicker/dist/react-datepicker.css";
import formatPrice from "@/app/infrastructures/misc/Utils";
import { ReportContext } from "../../Controller";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import { Box, makeStyles, Theme, createStyles } from "@material-ui/core";
// import { PieChart } from '@/app/container/components/Chart';

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
      backgroundColor: "#ffffff",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "1px solid #F8F8F8",
    },
    cardTitle: {
      fontSize: 12,
      color: "#323C47",
    },
    title: {
      fontSize: 18,
      color: "#323C47",
    },
    titleItem: { fontSize: 12, color: "#6A7088", marginTop: 10 },
    boxItem: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px 0px",
    },
    cardBody: {},
    card: {
      width: "100%",
    },
  })
);
const LaporanKeuanganDanBarang = () => {
  const [value, setValue] = React.useState(2);
  const controller = useContext(ReportContext);
  const classes = useStyles();
  const ref = React.createRef<HTMLDivElement>();
  const dataAdmin = controller.cashAndGoodsReport;
  const dataOperator = controller.cashAndGoodsReportOperator;
  const role = controller.role;
  const handleChange = (e, value) => {
    setValue(value);
  };

  const cardInfoBarang = (color) => {
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
          height: "13vh",
          marginBottom: 20,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06",
        }}
      >
        <Box display="flex" flexDirection="row">
          <span
            style={{
              fontSize: 22,
              color: color,
              marginBottom: 5,
            }}
          >
            {controller.role === 1
              ? controller.cashAndGoodsReport.totalGoodCount || 0
              : controller.cashAndGoodsReportOperator.total_good_count || 0}
          </span>
          <Box
            display="flex"
            flexDirection="column"
            style={{ marginLeft: 10, marginBottom: 10 }}
          >
            <span style={{ fontSize: 12, color: "#6A7088" }}> Donasi</span>
            <span style={{ fontSize: 12, color: "#6A7088" }}>
              Bentuk Barang
            </span>
          </Box>
        </Box>
        <span style={{ fontSize: 12, color: "#6A7088" }}>Sejumlah</span>
        <span style={{ fontSize: 18, fontWeight: 800, padding: 5 }}>
          {controller.role === 1
            ? formatPrice(controller.cashAndGoodsReport.totalGood || 0)
            : formatPrice(
                controller.cashAndGoodsReportOperator.total_good || 0
              )}
        </span>
      </Box>
    );
  };

  const cardDonasiEachItem = () => {
    const data =
      controller.role !== 2
        ? controller.generalReport
        : controller.generalReportOperator;
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: "#323C47",
          }}
        >
          Detail Barang per Jenis
        </span>
        <Box
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 6,
            color: "#6A7088",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            padding: "10px 30px",
            flexWrap: "wrap",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06",
          }}
        >
          <Box className={classes.boxItem}>
            <span style={{ fontWeight: 800 }}>
              {controller.role === 1
                ? controller.cashAndGoodsReport.totalGoodCollect || 0
                : controller.cashAndGoodsReportOperator.total_good_collect || 0}
            </span>{" "}
            <span className={classes.titleItem}>Barang Tercollect</span>
          </Box>
          <div
            style={{
              borderLeft: "1px solid",
              height: "6vh",
              borderColor: "#A6A6A6",
            }}
          ></div>
          <Box className={classes.boxItem}>
            <span style={{ fontWeight: 800 }}>
              {controller.role === 1
                ? controller.cashAndGoodsReport.totalGoodNotMoveCount || 0
                : controller.cashAndGoodsReportOperator.total_good_move_count ||
                  0}
            </span>{" "}
            <span className={classes.titleItem}>Asset Tidak Bergerak</span>
          </Box>
          <div
            style={{
              borderLeft: "1px solid",
              height: "6vh",
              borderColor: "#A6A6A6",
            }}
          ></div>
          <Box className={classes.boxItem}>
            <span style={{ fontWeight: 800 }}>
              {controller.role === 1
                ? controller.cashAndGoodsReport.totalGoodMoveCount || 0
                : controller.cashAndGoodsReportOperator.total_good_move_count ||
                  0}
            </span>{" "}
            <span className={classes.titleItem}>Asset Bergerak</span>
          </Box>
          <div
            style={{
              borderLeft: "1px solid",
              height: "6vh",
              borderColor: "#A6A6A6",
            }}
          ></div>
          <Box className={classes.boxItem}>
            <span style={{ fontWeight: 800 }}>
              {controller.role === 1
                ? controller.cashAndGoodsReport.totalGoodFoodCount || 0
                : controller.cashAndGoodsReportOperator.total_good_food_count ||
                  0}
            </span>{" "}
            <span className={classes.titleItem}>Makanan/Minuman</span>
          </Box>
          <div
            style={{
              borderLeft: "1px solid",
              height: "6vh",
              borderColor: "#A6A6A6",
            }}
          ></div>
          <Box className={classes.boxItem}>
            <span style={{ fontWeight: 800 }}>
              {controller.role === 1
                ? controller.cashAndGoodsReport.totalGoodOtherCount || 0
                : controller.cashAndGoodsReportOperator
                    .total_good_other_count || 0}
            </span>{" "}
            <span className={classes.titleItem}>Bentuk Lainnya</span>
          </Box>
        </Box>
      </Box>
    );
  };

  const ziswafPercentage =
    controller.role !== 2
      ? dataAdmin.total_cash_percent || {}
      : dataOperator.total_cash_percent || {};

  const dataDonation = [
    {
      color: "#063EFD",
      title: "TUNAI",
      fieldAdmin: "totalCash",
      fieldOperator: "total_cash",
      percent: "cash_percent",
    },
    {
      color: "#2ED47A",
      title: "NON-TUNAI MUAMALAT",
      fieldAdmin: "totalNonCashMuamalat",
      fieldOperator: "total_non_cash_muamalat",
      percent: "non_cash_muamalat_percent",
    },
    {
      color: "#FFB946",
      title: "NON-TUNAI MANDIRI",
      fieldAdmin: "totalNonCashMandiri",
      fieldOperator: "total_non_cash_mandiri",
      percent: "non_cash_mandiri_percent",
    },
    {
      color: "#F7685B",
      title: "NON-TUNAI BSM",
      fieldAdmin: "totalNonCashBsm",
      fieldOperator: "total_non_cash_bsm",
      percent: "non_cash_bsm_percent",
    },
    {
      color: "#E546FF",
      title: "NON TUNAI BRI SYARIAH",
      fieldAdmin: "totalNonCashBri",
      fieldOperator: "total_non_cash_bri",
      percent: "non_cash_bri_percent",
    },
    {
      color: "#5BEEF7",
      title: "NON TUNAI BNI SY LAMP",
      fieldAdmin: "totalNonCashBniLamp",
      fieldOperator: "total_non_cash_bni_lamp",
      percent: "non_cash_bni_lamp_percent",
    },
    {
      color: "#39959E",
      title: "NON TUNAI BNI SY",
      fieldAdmin: "totalNonCashBniSy",
      fieldOperator: "total_non_cash_bni_sy",
      percent: "non_cash_bni_sy_percent",
    },
    {
      color: "#2C3240",
      title: "NON TUNAI BCA",
      fieldAdmin: "totalNonCashBca",
      fieldOperator: "total_non_cash_bca",
      percent: "non_cash_bca_percent",
    },
  ];

  const getDataPieChart = () => {
    const transformData = dataDonation.map((item) => {
      return {
        label: item.title,
        color: item.color,
        percent:
          typeof ziswafPercentage[item.percent] === "undefined"
            ? 0
            : ziswafPercentage[item.percent],
      };
    });
    return transformData;
  };

  function createData(name, data) {
    return { name, data };
  }

  const rowsDataLeft = [
    createData(
      "TUNAI",
      role !== 2
        ? formatPrice(dataAdmin.totalCash)
        : formatPrice(dataOperator.total_cash)
    ),
    createData(
      "NON TUNAI-MUAMALAT",
      role !== 2
        ? formatPrice(dataAdmin.totalNonCashMuamalat)
        : formatPrice(dataOperator.total_non_cash_muamalat)
    ),
    createData(
      "NON TUNAI-MANDIRI",
      role !== 2
        ? formatPrice(dataAdmin.totalNonCashMandiri)
        : formatPrice(dataOperator.total_non_cash_mandiri)
    ),
    createData(
      "NON TUNAI-BSM",
      role !== 2
        ? formatPrice(dataAdmin.totalNonCashBsm)
        : formatPrice(dataOperator.total_non_cash_bsm)
    ),
  ];

  const rowsDataRight = [
    createData(
      "NON TUNAI-BRI SYARIAH",
      role !== 2
        ? formatPrice(dataAdmin.totalNonCashBri)
        : formatPrice(dataOperator.total_non_cash_bri)
    ),
    createData(
      "NON TUNAI-BNI SY LAMP",
      role !== 2
        ? formatPrice(dataAdmin.datatotalNonCashBniLamp)
        : formatPrice(dataOperator.total_non_cash_bni_lamp)
    ),
    createData(
      "NON TUNAI-BNI SY",
      role !== 2
        ? formatPrice(dataAdmin.datatotalNonCashBniSy)
        : formatPrice(dataOperator.total_non_cash_bni_sy)
    ),
    createData(
      "NON TUNAI-BCA",
      role !== 2
        ? formatPrice(dataAdmin.datatotalNonCashBca)
        : formatPrice(dataOperator.total_non_cash_bca)
    ),
  ];

  return (
    <GridContainer style={{ paddingLeft: window.innerWidth > 959 ? 20 : 0 }}>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
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
                <span className={classes.title}>Donasi Barang</span>
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
                  onClick={() => controller.setReportType("division")}
                >
                  <i className="material-icons" style={{ fontSize: 18 }}>
                    arrow_back
                  </i>
                  <span style={{ marginLeft: 10 }}>Kembali</span>
                </Box>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                {cardInfoBarang("#C61CCA")}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                {cardDonasiEachItem()}
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
            <span className={classes.title}>Donasi Uang</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            style={{ marginTop: 20, width: "100%" }}
          >
            <GridContainer style={{ width: "100%" }}>
              <GridItem xs={12} sm={12} md={4} style={{ width: "100%" }}>
                <Card className={classes.card}>
                  <CardHeader className={classes.cardHeader}>
                    <h4 className={classes.cardTitle}>
                      Donasi Uang Dan Posisinya
                    </h4>
                  </CardHeader>
                  <CardBody className={classes.cardBody}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        style={{
                          position: "absolute",
                          marginLeft: 10,
                          marginBottom: 20,
                          margin: 10,
                        }}
                      >
                        <Box display="flex" flexDirection="row">
                          <span
                            style={{
                              fontSize: 22,
                              color: "#C61CCA",
                              marginBottom: 5,
                            }}
                          >
                            {controller.role === 1
                              ? dataAdmin.totalCashCount || 0
                              : dataOperator.total_cash_count || 0}
                          </span>
                          <Box
                            display="flex"
                            flexDirection="column"
                            style={{ marginLeft: 10, marginBottom: 10 }}
                          >
                            <span style={{ fontSize: 12, color: "#6A7088" }}>
                              {" "}
                              Donasi
                            </span>
                            <span style={{ fontSize: 12, color: "#6A7088" }}>
                              Bentuk Dana
                            </span>
                          </Box>
                        </Box>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#6A7088",
                            textAlign: "center",
                          }}
                        >
                          Sejumlah
                        </span>
                        <span
                          style={{ fontSize: 18, fontWeight: 800, padding: 5 }}
                        >
                          {controller.role === 1
                            ? formatPrice(dataAdmin.totalAllCash || 0)
                            : formatPrice(dataOperator.total_all_cash || 0)}
                        </span>
                      </Box>
                      <PieChart
                        type="donut"
                        width="120%"
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
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} style={{marginBottom: 20}}>
                    <span style={{ fontSize: 18, color: "#323C47" }}>
                      Detail Posisi Keuangan
                    </span>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <DataDetailPosisiKeuangan
                      show={false}
                      rowsData={rowsDataLeft}
                      total
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <DataDetailPosisiKeuangan
                      show
                      rowsData={rowsDataRight}
                      total={
                        role !== 2
                          ? dataAdmin.totalAllCash
                          : dataOperator.total_all_cash
                      }
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default LaporanKeuanganDanBarang;
