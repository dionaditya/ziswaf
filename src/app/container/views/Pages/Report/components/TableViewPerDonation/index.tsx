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

const division = [
  {
    name: "Corporate",
    nameOperator: "corporate",
    label: "Corp",
  },
  {
    name: "Upz",
    nameOperator: "upz",
    label: "UPZ",
  },
  {
    name: "Ritel",
    nameOperator: "ritel",
    label: "Retail",
  },
];

const statements = [
  {
    name: "ZakatMaal",
    nameOperator: 'zakat_maalDivision',
    label: "Z. Mall",
  },
  {
    name: "ZakatFitrah",
    nameOperator: 'zakat_fitrahDivision',
    label: "Z. Fitrah",
  },
  {
    name: "Infaq",
    nameOperator: 'infaqDivision',
    label: "Infaq Sodaqoh",
  },
  {
    name: "Wakaf",
    nameOperator: 'wakafDivision',
    label: "Wakaf",
  },
  {
    name: "Kurban",
    nameOperator: 'kurbanDivision',
    label: "Qurban",
  },
  {
    name: "Other",
    nameOperator: 'otherDivision',
    label: "Lain",
  }
];

const TableViewPerDonation = (props) => {
    const { role, dataAdmin, dataOperator } = props;

    const transformData = () => {
        const data: Array<object> = [];
        division.map((divisi) => {
          statements.map((statement) => {
            const name = `total${divisi["name"]}${statement.name}`
            const nameOperator = `total_${divisi["nameOperator"]}_${statement.nameOperator}`
            data.push({
              name: `${name}`,
              label: `${divisi.label} - ${statement.label}`,
              total: role === 1 ? dataAdmin[name] : dataOperator[nameOperator],
            });
          });
        });
      
        return data;
      };

  const classes = useStyles();
  const dataDonation = transformData();
  
  return (
    <GridContainer>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        style={{ margin: "10px 15px 0px 15px" }}
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer
                  style={{
                    backgroundColor: "#3D5770",
                  }}
                >
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.tabHeader}
                  >
                    <p className={classes.labels}>Jenis Dana</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.tabHeader}
                  >
                    <p className={classes.labels}>Jumlah</p>
                  </GridItem>
                </GridContainer>
              </GridItem>
              {dataDonation.map((donation, i) => (
                <>
                  {i <= 9 && (
                    <GridItem xs={12} sm={12} md={12}>
                      <GridContainer
                        style={{
                          backgroundColor: i % 2 !== 0 ? "#EFF2F5" : "#FFFFFF",
                        }}
                      >
                        <GridItem
                          xs={12}
                          sm={12}
                          md={6}
                          className={classes.tabBody}
                        >
                          <p className={classes.subLabel}>
                            {donation["label"]}
                          </p>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={6}
                          className={classes.tabBody}
                        >
                          <p className={classes.subLabel}>
                            {formatPrice(donation["total"] || 0)}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  )}
                </>
              ))}
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 5px",
              }}
            >
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer
                  style={{
                    backgroundColor: "#3D5770",
                    margin: "0 10px",
                  }}
                >
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.tabHeader}
                  >
                    <p className={classes.labels}>Jenis Dana</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.tabHeader}
                  >
                    <p className={classes.labels}>Jumlah</p>
                  </GridItem>
                </GridContainer>
              </GridItem>
              {dataDonation.map((donation, i) => (
                <>
                  {i > 9 && (
                    <GridItem xs={12} sm={12} md={12}>
                      <GridContainer
                        style={{
                          backgroundColor: i % 2 !== 0 ? "#EFF2F5" : "#FFFFFF",
                        }}
                      >
                        <GridItem
                          xs={12}
                          sm={12}
                          md={6}
                          className={classes.tabBody}
                        >
                          <p className={classes.subLabel}>
                            {donation["label"]}
                          </p>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={6}
                          className={classes.tabBody}
                        >
                          <p className={classes.subLabel}>
                            {formatPrice(donation["total"] || 0)}
                          </p>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  )}
                </>
              ))}
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer
                  style={{
                    backgroundColor: "#00923F",
                    margin: "0 10px",
                  }}
                >
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.tabHeader}
                  >
                    <p className={classes.labels}>Total</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.tabHeader}
                  >
                    <p className={classes.labels}>{role === 1 ? formatPrice(props.dataAdmin.total || 0) : formatPrice(dataOperator.totalOperator || 0)}</p>
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

export default TableViewPerDonation;
