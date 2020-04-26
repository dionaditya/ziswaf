import React, { useContext } from "react";
import Modal from "@/app/container/commons/Modal/index.js";
import Box from "@material-ui/core/Box";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ContentFilters from "../ContentFilters";
import  { ReportDonationContext } from "../../Controller";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    labels: {
      fontSize: 14,
      fontWeight: 800,
      marginBottom: 15,
      color: "#757575",
    },
    subLabel: {
      fontSize: 12,
      marginLeft: 10,
      color: "#757575",
    },
  })
);

const ModalFilter: React.FC<{}> = ({}) => {
  const classes = useStyles();
  const controller = useContext(ReportDonationContext);

  return (
    <>
      <Modal
        size="xs"
        isOpen={controller.modalFilter}
        title={"Filter Laporan"}
        onHandle={(e) => controller.handleModalFilter(false)}
      >
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
                        style={{ backgroundColor: "#00923F", fontWeight: 800 }}
                        onClick={(e) => {
                          controller.handleCreateReport()
                          controller.handleModalFilter(false)
                        }}
                      >
                        BUAT LAPORAN
                      </Button>
                    </Box>
                  </GridItem>
                </GridContainer>
              </GridItem>
      </Modal>
    </>
  );
};

export default ModalFilter;
