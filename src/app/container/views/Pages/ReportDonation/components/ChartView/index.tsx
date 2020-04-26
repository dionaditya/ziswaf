import React, { useContext } from "react";
import PieChart from "../PieChart";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CustomTooltip from "@/app/container/commons/CustomTooltip";
import { ReportDonationContext } from "../../Controller";

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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F8F8F8",
      padding: 0,
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
  })
);

const style = {
  labelStyle: [
    {
      fontSize: 8,
      fill: "#6A7088",
      fontFamily: "roboto",
      lineHeight: "18px",
      letterSpacing: "1px",
    },
    {
      fontSize: 22,
      fill: "#C61CCA",
      fontWeight: "bold",
      fontFamily: "roboto",
    },
    {
      fontSize: 8,
      fill: "#6A7088",
      fontFamily: "roboto",
      lineHeight: "18px",
      letterSpacing: "1px",
    },
    {
      fontSize: 14,
      fill: "#161616",
      fontWeight: "bold",
      fontFamily: "roboto",
    },
  ],
};

const ChartView = () => {
  const classes = useStyles();
  const controller = useContext(ReportDonationContext);
  const statementReport = controller.statementReportTotal;
  const transformData = statementReport['donation_report'].map((item, i) => {
    return {
        x: i,
        y: item.total_percent,
        label: [`${item.name}`, `${item.total_percent}%`],
    }   
  })
  return (
    <>
      <Card>
        <CardHeader className={classes.cardHeader}>
          <h4 className={classes.cardTitle}>Donasi Uang & Jenis Donasinya</h4>
        </CardHeader>
        <CardBody>
          <PieChart
            data={transformData.length > 0 ? transformData : [{
                x: 0,
                y: 100,
                label: ['Tidak ada data donasi', `${0}%`],
            }]}
            innerRadius={80}
            labelProps={{
              style: style.labelStyle,
            }}
            label={["Donasi Bentuk Dana", `${statementReport['total_row_count']}`, "Sejumlah", `${statementReport['total']}`]}
            pieProps={{
              colorScale: transformData.length > 0 ? ["#3EC5D3", "#FED84F", "#FD887A", "#063EFD", "#FFB946", ,"#E546FF", "#2ED47A", "#F7685B", "#00959E", "#5BEEF7"] : ['#F2F2F2'],
              labelRadius: 80,
              labelComponent: <CustomTooltip />,
            }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default ChartView;
