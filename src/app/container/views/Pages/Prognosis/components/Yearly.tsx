import React, { useState, useContext} from "react";
import Select from '@material-ui/core/Select';
import Nominal from "./Nominal";
import Presentase from "./Presentase";
import { PrognosisContext } from "../Controller";
import ErrorBoundary from './ErrorBoundary'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
      height: 20,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    label: {
      color: "#757575",
    }
  }),
);

const Yearly: React.FC<{}> = () => {
  const classes = useStyles();
  const controller = useContext(PrognosisContext)
  const [selectedMethod, setSelectMethod] = useState("nominal");
  const { state, handleSetState } = controller;

  const optionMetode = [
    {
      value: 'percentage',
      label: 'Persentase'
    },
    {
      value: 'nominal',
      label: 'Nominal'
    },
  ];

  const handleChangeMethod = (e: any) => {
    setSelectMethod(e.target.value);
  };

  const handleChangeYear = (e: any) => {
    controller._setYearlyOption(e.target.value)
  }

  const handleChangeNominal = (name, value) => {
    const formatNumber = parseInt(value, 10)
    handleSetState(name, formatNumber)
  }

  const handleSaveAndContinue = (value) => {
    handleSetState('selectedTab', value)
  }

  return (
    <ErrorBoundary>
      <Box className={classes.container}>
        <GridContainer>
          <GridItem sm={12} md={12}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <label className={classes.label}>Tahun Prognosis</label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <Select
                                labelId="select-year"
                                id="select-year"
                                className={classes.formControl}
                                value={controller.selectedYearlyOption}
                                onChange={handleChangeYear}
                              >
                                {controller.yearlyOption.map(option => (
                                  <MenuItem value={option['value']}>{option['label']}</MenuItem>
                                ))}
                              </Select>
                          </GridItem>
                        </Box>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" style={{marginTop: 30}}>
                          <GridItem xs={12} sm={12} md={4}>
                            <label className={classes.label}>Pilih Metode</label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                              <Select
                                labelId="select-method"
                                id="select-method"
                                value={selectedMethod}
                                className={classes.formControl}
                                onChange={handleChangeMethod}
                              >
                                {optionMetode.map(option => (
                                  <MenuItem value={option['value']}>{option['label']}</MenuItem>
                                ))}
                              </Select>
                          </GridItem>
                        </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={6} mt={2}>
                  {
                    selectedMethod === "nominal" ? <Nominal data={state} handleNominalChange={(name, value) => handleChangeNominal(name, value)} handleSaveAndContinue={handleSaveAndContinue}/> 
                    : <Presentase data={state} handleNominalChange={(name, value) => handleChangeNominal(name, value)} handleSaveAndContinue={handleSaveAndContinue}/>}
                </GridItem>
              </GridContainer>
            </GridItem>
        </GridContainer>
      </Box>
    </ErrorBoundary>
  );
};

export default Yearly;
