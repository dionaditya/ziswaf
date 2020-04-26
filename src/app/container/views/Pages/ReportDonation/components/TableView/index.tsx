import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import  { ReportDonationContext } from "../../Controller";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    title: {
      fontSize: 24,
      fontWeight: 700,
      color: "#323C47",
    },
    labels: {
      fontSize: 14,
      fontWeight: 700,
      color: "#22272C",
    },
    subLabel: {
      fontSize: 12,
      color: "#757575",
    },
    boxSelect: {
      marginTop: 10,
    },
  })
);

const TableView = () => {
  const classes = useStyles();
  const controller = useContext(ReportDonationContext);
  const statementReport = controller.statementReportTotal;
  const data = [
    {
      name: "he",
      total: 1000,
      total_percent: 90,
    },
    {
      name: "ho",
      total: 1000,
      total_percent: 90,
    },
    {
      name: "ho",
      total: 1000,
      total_percent: 90,
    },
    {
      name: "ho",
      total: 1000,
      total_percent: 90,
    },
  ];

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#F7F9FA",
          }}
        >
          <GridItem xs={5} sm={5} md={5}>
            <p className={classes.labels}>Kategori Donasi</p>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <p className={classes.labels}>Jumlah</p>
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <p className={classes.labels}>Prosentase</p>
          </GridItem>
        </GridContainer>
      </GridItem>
      {controller.isLoadingFetchReport && (
           <GridItem xs={12} sm={12} md={12} style={{display: "flex", flexDirection: "center"}}>
               <p className={classes.subLabel}>Loading</p>
           </GridItem>
      )}
      {!controller.isLoadingFetchReport && statementReport['donation_report'].map((item, i) => (
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: (i + 1) % 2 === 0 ?  "#F7F9FA" : "#FFFFFF",
            }}
          >
            <GridItem xs={5} sm={5} md={5}>
              <p className={classes.subLabel}>{item.name}</p>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <p className={classes.subLabel}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.total)}</p>
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              <p className={classes.subLabel}>{item.total_percent}%</p>
            </GridItem>
          </GridContainer>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default TableView;
