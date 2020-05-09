import React, { useContext } from "react";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import  history  from '@/app/infrastructures/misc/BrowserHistory';

import ContentFilters from "../ContentFilters";
import { ReportContext } from "../../Controller";

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
      fontSize: 12,
      fontWeight: 800,
    },
  })
);

const PageFilters = () => {
  const classes = useStyles();
  const controller = useContext(ReportContext);
  const filterData = controller.filterData;


  const handleFieldSelected = (field, data, valueAll) => {
    const label =
      filterData[field].length > 0
        ? `${filterData[field][0].label}`
        : "Semua";
    const selected =
      filterData[field].length > 0
        ? filterData[field]
        : [{ name: valueAll, label: "Semua" }];

    return {
      label: label,
      selected: selected,
    };
  };

  const citySelected = handleFieldSelected("citySelected", "cityData", 0).label
  const unitSelected = handleFieldSelected("unitSelected", "unitData", 0).label

  return (
    <React.Fragment>
      <GridContainer className={classes.container}>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Box style={{ width: window.innerWidth > 959 ? "50%" : "100%" }}>
            <Card>
              <CardHeader className={classes.cardHeader}>
                <h4 className={classes.cardTitle}>Buat Laporan</h4>
              </CardHeader>
              <CardBody>
                <ContentFilters />
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer style={{ marginTop: 20 }}>
                    <GridItem xs={6} sm={6} md={6}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          color="transparent"
                          style={{ color: "#00923F", fontWeight: 800 }}
                          onClick={(e) => controller.handleClearFilter()}
                        >
                          CLEAR ALL
                        </Button>
                      </Box>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Button
                          color="success"
                          style={{
                            backgroundColor: "#00923F",
                            fontWeight: 800,
                          }}
                          onClick={(e) => controller.fetchReportData(history.push(`/dashboard/reports?city=${citySelected};unit=${unitSelected}`)) 
                          }
                        >
                          {controller.loading && (
                            <CircularProgress
                              variant="indeterminate"
                              disableShrink
                              size={18}
                              thickness={4}
                            />
                          )}
                          <span
                            style={{ marginLeft: controller.loading ? 10 : 0 }}
                          >
                            {" "}
                            TERAPKAN FILTER
                          </span>
                        </Button>
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </CardBody>
            </Card>
          </Box>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default PageFilters;
