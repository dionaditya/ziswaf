import React, { useState } from "react";
import { Input } from "@/app/container/components/index";
import InputMask from "@/app/container/components/InputMask";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import OutlinedInput from "@/app/container/commons/OutlinedInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0",
    },
    formContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
      marginTop: 10
    },
    box: {
      marginTop:  window.innerWidth > 959 ? 0 : 10,
    }
  })
);

const MonthlyItem: React.FC<{ state; isFirst; firstTotal; onChange; monthName }> = ({
  state,
  isFirst,
  firstTotal,
  onChange,
  monthName,
}) => {
  const classes = useStyles();

  const textLabel = {
    fontFamily: "roboto",
    fontSize: 14,
  };

  const handleOnChange = (month, value) => {
    const number = !isNaN(value) && value ? value : "";
    const total = isFirst ? firstTotal : state.prog_total;
    const nominal = (total / 100) * number;

    handleChangeNominal(month, nominal);
    handleSetValue(`${month}_percentage`, number);
  };

  const handleChangeNominal = (name, percentage) => {
    handleSetValue(`${name}_nominal`, percentage);
  };

  const handleSetValue = (name, value) => {
    onChange(name, value);
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <React.Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          {monthName.map((month, i) => {
            const stateNamePercentage = `${month}_percentage`;
            const stateNameNominal = `${month}_nominal`;
            if (i < 6) {
              return (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Box className={classes.formContainer}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <label className="black-text" style={textLabel}>
                            {capitalize(month)}
                          </label>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={3}>
                          <Box className={classes.box}>
                            <OutlinedInput
                              value={state[stateNamePercentage]}
                              onChange={(value) => handleOnChange(month, value)}
                              adornment="%"
                            />
                          </Box>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                          <Box className={classes.box}>
                            <InputMask
                              disabled
                              defaultValue={state[stateNameNominal]}
                              placeholder="Rp. 0"
                              type="text"
                              onChange={(value) => {}}
                            />
                          </Box>
                        </GridItem>
                      </GridContainer>
                    </Box>
                  </GridItem>
                </GridContainer>
              );
            }
          })}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {monthName.map((month, i) => {
            const stateNamePercentage = `${month}_percentage`;
            const stateNameNominal = `${month}_nominal`;
            if (i > 5) {
              return (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Box className={classes.formContainer}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <label className="black-text" style={textLabel}>
                            {capitalize(month)}
                          </label>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={3}>
                          <Box className={classes.box}>
                            <OutlinedInput
                              value={state[stateNamePercentage]}
                              onChange={(value) => handleOnChange(month, value)}
                              adornment="%"
                            />
                          </Box>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                          <Box className={classes.box}>
                            <InputMask
                              disabled
                              defaultValue={state[stateNameNominal]}
                              placeholder="Rp. 0"
                              type="text"
                              onChange={(value) => {}}
                            />
                          </Box>
                        </GridItem>
                      </GridContainer>
                    </Box>
                  </GridItem>
                </GridContainer>
              );
            }
          })}
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default MonthlyItem;
