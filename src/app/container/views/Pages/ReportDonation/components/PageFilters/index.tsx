import React, { useContext } from "react";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";

import ContentFilters from "../ContentFilters";
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
  const controller = useContext(ReportDonationContext);

  return (
    <React.Fragment>
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={12} style={{display: "flex", justifyContent: "center"}}>
          <Box style={{width: window.innerWidth > 959 ? "50%" : "100%"}}>
            <Card>
              <CardHeader className={classes.cardHeader}>
                <h4 className={classes.cardTitle}>Buat Laporan Jenis Donasi</h4>
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
                          onClick={(e) => controller.handleCreateReport()}
                        >
                          BUAT LAPORAN
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
