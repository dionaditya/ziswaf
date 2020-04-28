import React from "react";
import formatPrice from "@/app/infrastructures/misc/Utils";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import cx from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    title: {
      fontSize: 24,
      fontWeight: 700,
      color: "#FFFFFF",
    },
    labels: {
      fontSize: 14,
      fontWeight: 700,
      color: "#FFFFFF",
    },
    subLabel: {
      fontSize: 12,
      color: "#52575A",
    },
    subLabelFooter: {
      fontSize: 12,
      fontWeight: 800,
      color: "#FFFFFF",
    },
    boxSelect: {
      marginTop: 10,
    },
    tabHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "20%",
    },
    tabBody: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "20%",
    },
  })
);

const DataTableReportPencapaianDivisi = ({
  column,
  data,
  role,
  general,
  dashboardData,
  dataOperator,
  generalOperator,
}) => {
  const classes = useStyles();
  const prognosisRetail = data.totalPrognosisRetail;
  const prognosisCorporate = data.totalPrognosisCorporate;
  const prognosisUpz = data.totalPrognosisUpz;
  const totalPrognosis = prognosisRetail + prognosisCorporate + prognosisUpz;

  const valueRetail =
    role === 1 ? dashboardData.totalRetail : generalOperator.total_retail;
  const valueCorporate =
    role === 1 ? dashboardData.totalCorporate : generalOperator.total_corporate;
  const valueUpz =
    role === 1 ? dashboardData.totalUpz : generalOperator.total_upz;
  const totalValue = valueRetail + valueCorporate + valueUpz;

  const percentageRetail =
    role === 1
      ? data.totalPersentRetail
      : dataOperator.total_percent_retailDivision;
  const percentageCorporate =
    role === 1
      ? data.totalPersentCorporate
      : dataOperator.total_percent_corporateDivision;
  const percentageUpz =
    role === 1 ? data.totalPersentUpz : dataOperator.total_percent_upzDivision;
  const totalPercent = percentageRetail + percentageCorporate + percentageUpz;

  const selisihRetail = valueRetail - prognosisRetail;
  const selisihCorporate = valueCorporate - prognosisCorporate;
  const selisihUpz = valueUpz - prognosisUpz;
  const totalSelisih = selisihRetail + selisihCorporate + selisihUpz;

  return (
    <GridContainer>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        style={{ margin: "10px 15px 0px 15px" }}
      >
        <GridContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#3D5770",
            padding: "0px 10px",
          }}
        >
          <Box className={classes.tabHeader}>
            <p className={classes.labels}>DIVISI</p>
          </Box>
          {role === 1 && (
            <Box className={classes.tabHeader}>
              <p className={classes.labels}>Prognosis</p>
            </Box>
          )}
          <Box className={classes.tabHeader}>
            <p className={classes.labels}>Terkumpul</p>
          </Box>
          {role === 1 && (
            <>
              <Box className={classes.tabHeader}>
                <p className={classes.labels}>Selisih</p>
              </Box>
              <Box className={classes.tabHeader}>
                <p className={classes.labels}>Pencapaian</p>
              </Box>
            </>
          )}
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ margin: "0px 15px 0px 15px" }}>
        <GridContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            padding: "0px 10px",
          }}
        >
          <Box className={classes.tabBody}>
            <p className={classes.subLabel}>RITEL</p>
          </Box>
          {role === 1 && (
            <Box className={classes.tabBody}>
              <p className={classes.subLabel}>
                {formatPrice(prognosisRetail || 0)}
              </p>
            </Box>
          )}
          <Box className={classes.tabBody}>
            <p className={classes.subLabel}>{formatPrice(valueRetail || 0)}</p>
          </Box>
          {role === 1 && (
            <>
              <Box className={classes.tabBody}>
                <p className={classes.subLabel}>{formatPrice(selisihRetail)}</p>
              </Box>
              <Box className={classes.tabBody}>
                <p className={classes.subLabel}>{percentageRetail}%</p>
              </Box>
            </>
          )}
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ margin: "0px 15px 0px 15px" }}>
        <GridContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            padding: "0px 10px",
          }}
        >
          <Box className={classes.tabBody}>
            <p className={classes.subLabel}>CORP</p>
          </Box>
          {role === 1 && (
            <Box className={classes.tabBody}>
              <p className={classes.subLabel}>
                {formatPrice(prognosisCorporate)}
              </p>
            </Box>
          )}
          <Box className={classes.tabBody}>
            <p className={classes.subLabel}>{formatPrice(valueCorporate)}</p>
          </Box>
          {role === 1 && (
            <>
              <Box className={classes.tabBody}>
                <p className={classes.subLabel}>
                  {formatPrice(selisihCorporate)}
                </p>
              </Box>
              <Box className={classes.tabBody}>
                <p className={classes.subLabel}>{percentageCorporate}%</p>
              </Box>
            </>
          )}
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ margin: "0px 15px 0px 15px" }}>
        <GridContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            padding: "0px 10px",
          }}
        >
          <Box className={classes.tabBody}>
            <p className={classes.subLabel}>UPZ</p>
          </Box>
          {role === 1 && (
            <Box className={classes.tabBody}>
              <p className={classes.subLabel}>{formatPrice(prognosisUpz)}</p>
            </Box>
          )}
          <Box className={classes.tabBody}>
            <p className={classes.subLabel}>{formatPrice(valueUpz)}</p>
          </Box>
          {role === 1 && (
            <>
              <Box className={classes.tabBody}>
                <p className={classes.subLabel}>{formatPrice(selisihUpz)}</p>
              </Box>

              <Box className={classes.tabBody}>
                <p className={classes.subLabel}>{percentageUpz}%</p>
              </Box>
            </>
          )}
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ margin: "0px 15px 0px 15px" }}>
        <GridContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#00923F",
            padding: "0px 15px",
          }}
        >
          <Box className={classes.tabBody}>
            <p className={classes.subLabelFooter}>
              {role === 1 ? "NASIONAL" : "TOTAL"}
            </p>
          </Box>
          {role === 1 && (
            <Box className={classes.tabBody}>
              <p className={classes.subLabelFooter}>
                {formatPrice(totalPrognosis)}
              </p>
            </Box>
          )}
          <Box className={classes.tabBody}>
            <p className={classes.subLabelFooter}>{formatPrice(totalValue)}</p>
          </Box>
          {role === 1 && (
            <>
              <Box className={classes.tabBody}>
                <p className={classes.subLabelFooter}>
                  {formatPrice(totalSelisih)}
                </p>
              </Box>
              <Box className={cx(classes.tabBody, { width: "10%" })}>
                <p className={classes.subLabelFooter}>{totalPercent}%</p>
              </Box>
            </>
          )}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default DataTableReportPencapaianDivisi;
