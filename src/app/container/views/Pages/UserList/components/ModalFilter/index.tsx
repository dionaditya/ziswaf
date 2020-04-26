import React, { useState } from "react";
import { removeAuthCredential } from "@/app/infrastructures/misc/Cookies";
import history from "@/app/infrastructures/misc/BrowserHistory";
import Modal from "@/app/container/commons/Modal/index.js";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SimpleSelect from "@/app/container/components/SelectMUI";
import DateTimePicker from "@/app/container/commons/DateTimePicker";
import moment from "moment";

import { UserRole } from "@/domain/entities/AllOptions";

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

const ModalFilter: React.FC<{ controller; actionType; handleChange }> = ({
  controller,
  actionType,
  handleChange,
}) => {
  const classes = useStyles();
  const logout = () => {};

  const handleModalFilter = (e) => {
    controller.handleModalFilters(e)(controller.dispatch)(
      actionType.handleCTAFiltekr
    );
  };

  const handleModalClose = (e) => {
    controller.handleModalFilters(e)(controller.dispatch)(
      actionType.handleModalFilters
    )
  }

  const dataSchool = [{ id: 0, name: "Unit Madrasah" }].concat(
    controller.school
  );

  const getValueDate = (selectedDate) => {
    const currentDate = moment(new Date()).format("dd/MM/yyyy");
    const selectedTime = moment(selectedDate).format("YYYY-MM-DD");
    const filteredDate = !selectedDate ? currentDate : selectedTime;
    return filteredDate;
  };

  const handleDateChange = (name, date) => {
    const target = {
      target: {
        name: name,
        value: date,
      },
    };
    handleChange(target);
  };

  return (
    <>
      <Modal
        size="xs"
        isOpen={controller.statusModalFilters}
        title="FILTER USER"
        onHandle={(e) => handleModalClose(e)}
      >
        <GridContainer style={{ padding: "10px 20px" }}>
          <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <GridContainer display="flex" alignItems="center">
              <GridItem xs={12} sm={12} md={6}>
                <Box style={{ width: "100%" }}>
                  <span className={classes.labels}>UNIT MADRASAH</span>
                  <SimpleSelect
                    onChange={(e) => handleChange(e)}
                    value={controller.filterStatus.filter.school_id || 0}
                    async
                    name="school_id"
                    data={dataSchool}
                    label=""
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Box style={{ width: "100%" }}>
                  <span className={classes.labels}>ROLE</span>
                  <SimpleSelect
                    onChange={(e) => handleChange(e)}
                    value={controller.filterStatus.filter.role || 0}
                    async={false}
                    name="role"
                    data={UserRole}
                    label=""
                  />
                </Box>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <span className={classes.labels}>TAHUN DIBUAT</span>
            <GridContainer display="flex" alignItems="center">
              <GridItem xs={12} sm={12} md={6}>
                <Box style={{ width: "100%", paddingLeft: 5 }}>
                  <span className={classes.subLabel}>Mulai</span>
                  <DateTimePicker
                    // openTo="year"
                    views={["year"]}
                    handleDateChange={(value) =>
                      handleDateChange("created_at_start", value)
                    }
                    format="yyyy"
                    selectedDate={
                      controller.filterStatus.filter.created_at_start ||
                      new Date()
                    }
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Box style={{ width: "100%", paddingLeft: 5 }}>
                  <span className={classes.subLabel}>Hingga</span>
                  <DateTimePicker
                    openTo="year"
                    views={["year"]}
                    minDate={
                      controller.filterStatus.filter.created_at_start ||
                      new Date()
                    }
                    handleDateChange={(value) =>
                      handleDateChange("created_at_end", value)
                    }
                    format="yyyy"
                    selectedDate={
                      controller.filterStatus.filter.created_at_end ||
                      new Date()
                    }
                  />
                </Box>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <span className={classes.labels}>LAST LOGIN</span>
            <GridContainer display="flex" alignItems="center">
              <GridItem xs={12} sm={12} md={6}>
                <Box style={{ width: "100%", paddingLeft: 5 }}>
                  <span className={classes.subLabel}>Mulai</span>
                  <DateTimePicker
                    handleDateChange={(value) =>
                      handleDateChange("last_login_start", value)
                    }
                    format="dd/MM/yyyy"
                    selectedDate={
                      controller.filterStatus.filter.last_login_start ||
                      new Date()
                    }
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Box style={{ width: "100%", paddingLeft: 5 }}>
                  <span className={classes.subLabel}>Hingga</span>
                  <DateTimePicker
                    minDate={
                      controller.filterStatus.filter.last_login_start ||
                      new Date()
                    }
                    handleDateChange={(value) =>
                      handleDateChange("last_login_end", value)
                    }
                    format="dd/MM/yyyy"
                    selectedDate={
                      controller.filterStatus.filter.last_login_end ||
                      new Date()
                    }
                  />
                </Box>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer  style={{ marginTop: 20 }}>
              <GridItem xs={12} sm={12} md={6}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button color="transparent" style={{color: "#00923F", fontWeight: 800}} onClick={(e) =>  {
                    controller.handleResetFilter(controller.dispatch)(actionType.resetFilter)
                  }}>
                    CLEAR ALL
                  </Button>
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button color="success" style={{backgroundColor: "#00923F", fontWeight: 800}} onClick={(e) => {
                    controller.handleCTAFilter(e)(controller.dispatch)(
                      actionType.handleCTAFilter
                    )
                  }}>
                    TERAPKAN FILTER
                  </Button>
                </Box>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Modal>
    </>
  );
};

export default ModalFilter;
