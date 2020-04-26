import React, { useState } from "react";
import { Input } from "@/app/container/components/index";
import InputMask from "@/app/container/components/InputMask";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import OutlinedInput from '@/app/container/commons/OutlinedInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0",
    },
    formContainer: {
      marginTop: window.innerWidth > 959 ? 0 : 10,
    }
  })
);

const PrognosisTotal: React.FC<{
  data;
  totalPercentage;
  progname;
  totalNominal;
  isFirst;
}> = ({ data, totalPercentage, progname, totalNominal, isFirst }) => {
  const classes = useStyles();

  const getLabelIndicator = () => {
    const isFirstData = isFirst ? totalPercentage === 100 : data.prog_total === totalNominal;
    return isFirstData
  }
  return (
    <React.Fragment>
      <GridContainer>
        <Box className={classes.container}>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Box className={classes.formContainer}>
                  <label htmlFor="prog_retail" className="black-text">
                    Prognosis {progname}
                  </label>
                  <InputMask
                    disabled
                    defaultValue={isFirst ? totalNominal : data.prog_total}
                    placeholder="Rp. 0"
                    type="text"
                    onChange={(value) => {}}
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Box className={classes.formContainer}>
                  <label htmlFor="prog_total" className="black-text">
                    Total % Prognosis
                  </label>
                  <OutlinedInput
                    disabled
                    value={totalPercentage}
                    onChange={(value) => {}}
                    adornment="%"
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Box className={classes.formContainer}>
                  <span
                    style={{
                      color: getLabelIndicator() ? "#00923F" : "red",
                      fontSize: "12px",
                    }}
                  >
                    Jumlah % yang diinput dari keseluruhan prognosis harus 100%
                  </span>
                </Box>
              </GridItem>
            </GridContainer>
          </GridItem>
        </Box>
      </GridContainer>
    </React.Fragment>
  );
};

export default PrognosisTotal;
