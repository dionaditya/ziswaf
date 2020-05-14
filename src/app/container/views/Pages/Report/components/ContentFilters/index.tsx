import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import DateTimePicker from "@/app/container/commons/DateTimePicker";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MultiSelect from "@/app/container/components/MultipleColumnSelect";
import { ReportContext } from "../../Controller";
import RadioButtonSelect from "@/app/container/commons/RadioButtonSelect";
import moment from "moment";
import SelectWithSearch, {
  SelectWithSearchWithDebounced,
} from "@/app/container/components/SelectWithSearch";

const asyncDefaultValue = {
  name: "SEMUA",
  id: "",
};

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
  const endDate = moment(filterData["dateSelected"]["start_date"])
    .endOf("year")
    .format();

  const handleFilter = (field, value) => {
    if (
      field === "start_date" &&
      moment(value).year() >
        moment(filterData["dateSelected"]["end_date"]).year()
    ) {
      const dateSelected = {
        ...filterData["dateSelected"],
        [field]: moment(value)
          .utcOffset("+07:00")
          .format(),
        end_date: moment(value)
          .utcOffset("+07:00")
          .endOf("year")
          .format(),
      };
      controller.handleSetFilter("dateSelected", dateSelected);
    } else if (field === "start_date") {
      const dateSelected = {
        ...filterData["dateSelected"],
        [field]: moment(value)
          .utcOffset("+07:00")
          .format(),
        end_date: moment(value)
          .utcOffset("+07:00")
          .endOf("year")
          .format(),
      };
      controller.handleSetFilter("dateSelected", dateSelected);
    } else {
      const dateSelected = {
        ...filterData["dateSelected"],
        [field]: moment(value)
          .utcOffset("+07:00")
          .format(),
      };
      controller.handleSetFilter("dateSelected", dateSelected);
    }
  };

  const handleChange = (field, e) => {
    const name = e.target.value;
    const label = e.target.name;

    if (label !== "Semua") {
      const data = [{ name: name, label: label }];
      controller.handleSetFilter(field, data);
    } else {
      controller.handleSetFilter(field, []);
    }
  };

  const handleFieldSelected = (field, data, valueAll) => {
    const label =
      filterData[field].length > 0 ? `${filterData[field][0].label}` : "Semua";
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
      case "Data Not Found":
        return "Data Tidak Ditemukan";
      default:
        return val;
    }
  };

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
                handleDateChange={(value) => handleFilter("start_date", value)}
                disableToolbar={false}
                format="dd/MM/yyyy"
                maxDate={moment(new Date()).endOf("year")}
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
                disableToolbar={false}
                minDate={filterData["dateSelected"]["start_date"]}
                handleDateChange={(value) => handleFilter("end_date", value)}
                format="dd/MM/yyyy"
                selectedDate={
                  Number(
                    moment(filterData["dateSelected"]["start_date"]).year()
                  ) >
                  Number(moment(filterData["dateSelected"]["end_date"]).year())
                    ? endDate
                    : filterData["dateSelected"]["end_date"]
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
                <SelectWithSearchWithDebounced
                  isDisabled={filterData["unitDataLoading"]}
                  loadOptions={controller.loadSchool}
                  onChange={(e) => {
                    const data = {
                      target: {
                        name: e.label,
                        value: e.value,
                      },
                    };
                    handleChange("unitSelected", data);
                  }}
                  value={
                    handleFieldSelected("unitSelected", "unitData", 0).selected
                  }
                  data={[asyncDefaultValue, ...filterData["unitDataRaw"]]}
                  name="school_id"
                  label="UNIT"
                  debounced={controller.debouncedSchool}
                  placeholder={
                    !filterData["unitDataLoading"]
                      ? handleFieldSelected(
                          "unitSelected",
                          "unitData",
                          0
                        ).label.toUpperCase()
                      : "loading..."
                  }
                />
              </Box>
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.labels}>KOTA</span>
              <Box className={classes.boxSelect}>
                <SelectWithSearch
                  async
                  isDisabled={filterData["cityDataLoading"]}
                  onChange={(selectedValue) => {
                    console.log(selectedValue);
                    const data = {
                      target: {
                        name: selectedValue.label,
                        value: selectedValue.value,
                      },
                    };
                    handleChange("citySelected", data);
                  }}
                  value={
                    handleFieldSelected("citySelected", "cityData", 0).selected
                  }
                  data={[asyncDefaultValue, ...filterData["cityData"]]}
                  name="city"
                  label="SEMUA"
                  placeholder={
                    !filterData["cityDataLoading"]
                      ? handleFieldSelected(
                          "citySelected",
                          "cityData",
                          0
                        ).label.toUpperCase()
                      : "Loading..."
                  }
                />
              </Box>
            </Box>
          </GridItem>
        </GridContainer>
        {controller.message && (
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontWeight: 800, color: "red" }}>
                {formatResponse(controller.message)}
              </span>
            </GridItem>
          </GridContainer>
        )}
      </GridItem>
    </GridContainer>
  );
};

export default ContentFilters;
