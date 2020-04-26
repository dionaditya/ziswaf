import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import SimpleSelect from "@/app/container/components/SelectMUI";
import DateTimePicker from "@/app/container/commons/DateTimePicker";
import moment from "moment";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MultiSelect from "@/app/container/components/MultipleColumnSelect";
import { ReportDonationContext } from "../../Controller";
import TableView from "../TableView";
import ChartView from "../ChartView";
import ModaFilters from "../ModalFilters";

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
      color: "#757575",
    },
    subLabel: {
      fontSize: 12,
      marginLeft: 10,
      color: "#757575",
    },
    subLabelSelected: {
        fontSize: 12,
        marginLeft: 10,
        color: "#757575",
        backgroundColor: "#F2F2F2",
        border: "1px solid #F2F2F2",
        borderRadius: 4,
        padding: 5
      },
    boxSelect: {
      marginTop: 10,
    },
  })
);

const selectedData = [
    {
      name: `Unit Ma'had`,
      selectedField: "unitSelected",
      fieldData: "unitData",
    },
    {
      name: `Kategori Donatur`,
      selectedField: "donaturSelected",
      fieldData: "donaturData",
    },
    {
      name: `Jenis Donasi`,
      selectedField: "donationTypeSelected",
      fieldData: "donationTypeData",
    },
    {
      name: `Tunai/Non Tunai`,
      selectedField: "fundSourceSelected",
      fieldData: "fundSourceData",
    },
    {
      name: `Kota`,
      selectedField: "citySelected",
      fieldData: "cityData",
    },
    {
      name: `Kategori Sumber`,
      selectedField: "categorySourceSelected",
      fieldData: "categorySourceData",
    },
    {
      name: `Kategori Donasi`,
      selectedField: "categoryDonationSelected",
      fieldData: "categoryDonationData",
    },
  ];

const PageViewFilter: React.FC<{}> = () => {
  const classes = useStyles();
  const {
    donaturData,
    handleClearFilter,
    categoryDonationData,
    unitData,
    fundSourceData,
    cityData,
    categorySourceData,
    donationTypeData,
    handleMultiSelectedFilter,
    handleSetState,
    dateSelected,
    handleCreateReport,
  } = useContext(ReportDonationContext);
  const controller = useContext(ReportDonationContext);

  const formatDate = (date) => {
    return date ? moment(date).format("MMMM YYYY") : "N/A";
  };

  const handleFieldSelected = (selected, data) => {
    return controller[selected].length > 0
      ? `${controller[selected].length} to ${controller[data].length -
          1} Selected`
      : "Select Semua";
  };

  return (
    <>
      <ModaFilters />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <GridContainer
            display="flex"
            alignItems="center"
            style={{ marginTop: 10 }}
          >
            <GridItem xs={12} sm={12} md={6}>
              <Box style={{ width: "100%", paddingLeft: 5 }}>
                <span className={classes.title}>Laporan Jenis Donasi</span>
              </Box>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Box
                style={{
                  width: "100%",
                  paddingLeft: 5,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    marginRight: 20,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <span className={classes.subLabel}>
                    from {formatDate(dateSelected["start_date"])} to{" "}
                    {formatDate(dateSelected["end_date"])}
                  </span>
                </Box>
                <Button
                  color="success"
                  style={{ backgroundColor: "#00923F", fontWeight: 800 }}
                  onClick={(e) => controller.handleModalFilter(true)}
                >
                  <i className="material-icons" style={{ fontSize: 20 }}>
                    filter_list
                  </i>{" "}
                  Filter
                </Button>
              </Box>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <GridContainer
            display="flex"
            alignItems="center"
            style={{ marginTop: 10 }}
          >
            { selectedData.map((item) => (
                <GridItem xs={6} sm={6} md={3} style={{ marginTop: 3, marginBottom: 3, width: "100%"}}>
                    <Box style={{ marginTop: 10, width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span className={classes.subLabel}>{item.name}</span>
                        <span className={classes.subLabelSelected}>
                            {handleFieldSelected(item['selectedField'], item['fieldData'])}
                        </span>
                    </Box>
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <GridContainer display="flex" style={{ marginTop: 10 }}>
            <GridItem xs={12} sm={12} md={5}>
              <ChartView />
            </GridItem>
            <GridItem xs={12} sm={12} md={7} mt={5}>
              <TableView />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default PageViewFilter;
