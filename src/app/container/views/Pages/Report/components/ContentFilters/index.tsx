import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import DateTimePicker from "@/app/container/commons/DateTimePicker";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MultiSelect from "@/app/container/components/MultipleColumnSelect";
import { ReportContext } from "../../Controller";
import RadioButtonSelect from "@/app/container/commons/RadioButtonSelect";

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
  })
);

const ContentFilters: React.FC<{}> = () => {
  const classes = useStyles();
  const controller = useContext(ReportContext);
  const filterData = controller.filterData;

  const handleFilter = (field, value) => {
    const dateSelected = {
      ...filterData["dateSelected"],
      [field]: value
    }
    controller.handleSetFilter('dateSelected', dateSelected);
  }

  const handleChange = (field, e) => {
    const name = e.target.value;
    const label = e.target.name;
    const parseName = parseInt(name, 10);

    if (label !== "Semua") {
      const data = [{ name: parseName, label: label }];
      controller.handleSetFilter(field, data);
    } else {
      controller.handleSetFilter(field, []);
    }
  };

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
  

  const formatResponse = (val) => {
    switch (val) {
      case 'Data Not Found':
          return 'Data Tidak Ditemukan'
      default:
        return val
    }
  }

  return (
    <GridContainer style={{ padding: "10px 20px" }}>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <span className={classes.labels}>TANGGAL</span>
        <GridContainer
          display="flex"
          alignItems="center"
          style={{ marginTop: 10 }}
        >
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%", paddingLeft: 5 }}>
              <span className={classes.subLabel}>Mulai</span>
              <DateTimePicker
                handleDateChange={(value) =>
                  handleFilter("start_date", value)
                }
                format="dd/MM/yyyy"
                minDate={filterData["dateSelected"]["start_date"]}
                maxDate={filterData["dateSelected"]["end_date"]}
                selectedDate={
                  filterData["dateSelected"]["start_date"] || new Date()
                }
              />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%", paddingLeft: 5 }}>
              <span className={classes.subLabel}>Hingga</span>
              <DateTimePicker
                minDate={filterData["dateSelected"]["start_date"]}
                maxDate={filterData["dateSelected"]["end_date"]}
                handleDateChange={(value) =>
                  handleFilter("end_date", value)
                }
                format="dd/MM/yyyy"
                selectedDate={
                  filterData["dateSelected"]["end_date"] || new Date()
                }
              />
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.labels}>UNIT</span>
              <Box className={classes.boxSelect}>
                <RadioButtonSelect
                  label={
                    !filterData["unitDataLoading"]
                      ? handleFieldSelected("unitSelected", "unitData", 0).label
                      : "loading..."
                  }
                  options={[{ name: 0, label: 'Semua' }].concat(filterData["unitData"])}
                  disabled={filterData["unitDataLoading"]}
                  handleChange={(e) => handleChange("unitSelected", e)}
                  checked={
                    handleFieldSelected("unitSelected", "unitData", 0).selected
                  }
                />
              </Box>
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.labels}>KOTA</span>
              <Box className={classes.boxSelect}>
                <RadioButtonSelect
                  label={
                    !filterData["cityDataLoading"]
                      ? handleFieldSelected("citySelected", "cityData", 0).label
                      : "Loading..."
                  }
                  options={filterData["cityData"]}
                  disabled={filterData["cityDataLoading"]}
                  checkboxDisabled={filterData["unitDataLoading"]}
                  handleChange={(e) => handleChange("citySelected", e)}
                  checked={
                    handleFieldSelected("citySelected", "cityData", 0).selected
                  }
                />
              </Box>
            </Box>
          </GridItem>
        </GridContainer>
        {
          controller.message && <GridContainer>
            <GridItem xs={12} sm={12} md={12} style={{ marginTop: 10, display: 'flex', justifyContent: 'center', }}>
              <span style={{ fontWeight: 800, color: 'red' }}>{formatResponse(controller.message)}</span>
            </GridItem>
          </GridContainer>
        }
      </GridItem>
    </GridContainer>
  );
};

export default ContentFilters;
