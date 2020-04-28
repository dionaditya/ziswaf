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
  const {
    donaturData,
    categoryDonationData,
    unitData,
    fundSourceData,
    cityData,
    categorySourceData,
    donationTypeData,
    handleMultiSelectedFilter,
    handleSetState,
    dateSelected,
  } = useContext(ReportDonationContext);
  const controller = useContext(ReportDonationContext);
  const handleChange = (field, e) => {
    handleMultiSelectedFilter(field, e.target.name, e.target.value);
  };

  const handleFieldSelected = (field, data, valueAll) => {
    const label =
      controller[field].length > 0
        ? `${controller[field].length} to ${controller[data].length - 1} selected`
        : "Semua";
    const selected =
      controller[field].length > 0
        ? controller[field]
        : [{ name: valueAll, label: "Semua" }];
    return {
      label,
      selected,
    };
  };

  const handleSetDate = (field, name, value) => {
    handleSetState(field, name, value);
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
                // openTo="year"
                // views={["year"]}
                handleDateChange={(value) =>
                  handleSetDate("dateSelected", "start_date", value)
                }
                format="dd/MM/yyyy"
                selectedDate={dateSelected["start_date"] || new Date()}
              />
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%", paddingLeft: 5 }}>
              <span className={classes.subLabel}>Hingga</span>
              <DateTimePicker
                // openTo="year"
                // views={["year"]}
                minDate={dateSelected["start_date"]}
                handleDateChange={(value) =>
                  handleSetDate("dateSelected", "end_date", value)
                }
                format="dd/MM/yyyy"
                selectedDate={dateSelected["end_date"] || new Date()}
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
                <MultiSelect
                  label={
                    !controller.unitDataLoading
                      ? handleFieldSelected("unitSelected", "unitData", 0).label
                      : "loading..."
                  }
                  options={unitData}
                  disabled={controller.unitDataLoading}
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
                <MultiSelect
                  label={
                    !controller.cityDataLoading
                      ? handleFieldSelected("citySelected", "cityData", 0).label
                      : "Loading..."
                  }
                  options={cityData}
                  disabled={controller.cityDataLoading}
                  checkboxDisabled={controller.unitDataLoading}
                  handleChange={(e) => handleChange("citySelected", e)}
                  checked={
                    handleFieldSelected("citySelected", "cityData", 0).selected
                  }
                />
              </Box>
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.labels}>KATEGORI DONATUR</span>
              <Box className={classes.boxSelect}>
                <MultiSelect
                  label={
                    handleFieldSelected("donaturSelected", "donaturData", 2)
                      .label
                  }
                  options={donaturData}
                  handleChange={(e) => handleChange("donaturSelected", e)}
                  checked={
                    handleFieldSelected("donaturSelected", "donaturData", 2)
                      .selected
                  }
                />
              </Box>
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.labels}>KATEGORI SUMBER</span>
              <Box className={classes.boxSelect}>
                <MultiSelect
                  label={
                    handleFieldSelected(
                      "categorySourceSelected",
                      "categorySourceData",
                      0
                    ).label
                  }
                  options={categorySourceData}
                  handleChange={(e) =>
                    handleChange("categorySourceSelected", e)
                  }
                  checked={
                    handleFieldSelected(
                      "categorySourceSelected",
                      "categorySourceData",
                      0
                    ).selected
                  }
                />
              </Box>
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.labels}>JENIS DONASI</span>
              <Box className={classes.boxSelect}>
                <MultiSelect
                  label={
                    handleFieldSelected(
                      "donationTypeSelected",
                      "donationTypeData",
                      0
                    ).label
                  }
                  options={donationTypeData}
                  handleChange={(e) => handleChange("donationTypeSelected", e)}
                  checked={
                    handleFieldSelected(
                      "donationTypeSelected",
                      "donationTypeData",
                      0
                    ).selected
                  }
                />
              </Box>
            </Box>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.labels}>KATEGORI DONASI</span>
              <Box className={classes.boxSelect}>
                <MultiSelect
                  label={
                    controller.categoryDonationDataLoading
                      ? "Loading..."
                      : handleFieldSelected(
                        "categoryDonationSelected",
                        "categoryDonationData",
                        0
                      ).label
                  }
                  options={categoryDonationData}
                  disabled={controller.categoryDonationDataLoading}
                  handleChange={(e) =>
                    handleChange("categoryDonationSelected", e)
                  }
                  checked={
                    handleFieldSelected(
                      "categoryDonationSelected",
                      "categoryDonationData",
                      0
                    ).selected
                  }
                />
              </Box>
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
        <GridContainer display="flex" alignItems="center">
          <GridItem xs={12} sm={12} md={6}>
            <Box style={{ width: "100%" }}>
              <span className={classes.labels}>TUNAI / NON TUNAI</span>
              <Box className={classes.boxSelect}>
                <MultiSelect
                  label={
                    handleFieldSelected(
                      "fundSourceSelected",
                      "fundSourceData",
                      0
                    ).label
                  }
                  options={fundSourceData}
                  handleChange={(e) => handleChange("fundSourceSelected", e)}
                  checked={
                    handleFieldSelected(
                      "fundSourceSelected",
                      "fundSourceData",
                      0
                    ).selected
                  }
                />
              </Box>
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default ContentFilters;
