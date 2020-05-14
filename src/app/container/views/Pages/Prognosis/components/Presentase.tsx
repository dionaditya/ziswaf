import React, { useState, useEffect } from "react";
import InputMask from "@/app/container/components/InputMask"
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import OutlinedInput from '@/app/container/commons/OutlinedInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0"
    },
    formPercentage: {
      height: 40
    },
    formContainer: {
      marginTop: theme.spacing(2),
      width: "100%",
      marginRight: 20,
      marginLeft: 20
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
      fontWeight: 800
    }
  }),
);

const Presentase: React.FC<{ data, handleNominalChange, handleSaveAndContinue }> = ({ data, handleNominalChange, handleSaveAndContinue }) => {
  const classes = useStyles();
  const { totalPrognosis, totalPrognosisRetail, totalPrognosisCorporate, totalPrognosisUpz } = data
  const total = totalPrognosisRetail + totalPrognosisCorporate + totalPrognosisUpz;
  const [percentage, setPercentage] = useState({
    retail: 0,
    corporate: 0,
    upz: 0
  });

  const handleOnChange = (name, value) => {
    handleNominalChange(name, value)
  };

  const handleNominalBaseOnPercentage = (name, value) => {
    let prognosisName = '';
    switch (name) {
      case 'retail':
        prognosisName = 'totalPrognosisRetail';
        break;
      case 'corporate':
        prognosisName = 'totalPrognosisCorporate';
        break;
      case 'upz':
        prognosisName = 'totalPrognosisUpz';
        break;
      default:
        prognosisName = '';
    }
    const nominal = totalPrognosis / 100 * value;
    handleNominalChange(prognosisName, nominal)
  }

  const handleOnChangePercentage = (name, value) => {
    const number = !isNaN(value) && value ? value : ""
    const percentage = number
    handleNominalBaseOnPercentage(name, percentage);
    setPercentage(prevState => {
      return { ...prevState, [name]: percentage };
    });
  }

  const getPercentage = (value) => {
    let percentage = value ? value / totalPrognosis * 100 : 0;
    return percentage;
  }

  const handleSetState = (name, value) => {
    const percentage = getPercentage(value)
    setPercentage(prevState => {
      return { ...prevState, [name]: percentage };
    });
  }


  useEffect(() => {
    handleSetState('retail', totalPrognosisRetail);
    handleSetState('corporate', totalPrognosisCorporate);
    handleSetState('upz', totalPrognosisUpz);
  }, [totalPrognosisRetail, totalPrognosisCorporate, totalPrognosisUpz])


  const getTotalPercentage = () => {
    const totalPercentage = percentage.retail + percentage.corporate + percentage.upz;
    return Math.round(totalPercentage)
  }

  const totals = getTotalPercentage();
  return (
    <React.Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitle}>Metode Prosentase</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Box className={classes.formContainer}>
                  <GridItem xs={12} sm={12} md={12}>
                    <label className={classes.label}> Prognosis Ziswaf </label>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Box className={classes.formControl}>
                      <InputMask defaultValue={totalPrognosis === 0 ? '' : totalPrognosis} placeholder="Rp. 0" type="text" onChange={(value) => handleOnChange('totalPrognosis', value)} />
                    </Box>
                  </GridItem>
                </Box>
                <Box className={classes.formContainer}>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>% Retail </label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <Box className={classes.formControl}>
                              <OutlinedInput
                                value={percentage.retail}
                                onChange={(value) => handleOnChangePercentage('retail', value)}
                                adornment="%"
                              />
                            </Box>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>Prognosis Retail </label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <Box className={classes.formControl}>
                              <InputMask disabled defaultValue={Number(totalPrognosis * (percentage.retail / 100)).toFixed()} placeholder="Rp. 0" type="text" onChange={(value) => { }} />
                            </Box>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </Box>
                <Box className={classes.formContainer}>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>% Corporate </label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <Box className={classes.formControl}>
                              <OutlinedInput
                                value={percentage.corporate}
                                onChange={(value) => handleOnChangePercentage('corporate', value)}
                                adornment="%"
                              />
                            </Box>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>Prognosis Corporate </label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <Box className={classes.formControl}>
                              <InputMask disabled defaultValue={Number(totalPrognosis * (percentage.corporate / 100)).toFixed()} placeholder="Rp. 0" type="text" onChange={(value) => { }} />
                            </Box>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </Box>
                <Box className={classes.formContainer}>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>% UPZ </label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <Box className={classes.formControl}>
                              <OutlinedInput
                                value={percentage.upz}
                                onChange={(value) => handleOnChangePercentage('upz', value)}
                                adornment="%"
                              />
                            </Box>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>Prognosis UPZ </label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <Box className={classes.formControl}>
                              <InputMask disabled defaultValue={Number(totalPrognosis * (percentage.upz / 100)).toFixed()} placeholder="Rp. 0" type="text" onChange={(value) => { }} />
                            </Box>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </Box>
                <Box className={classes.formContainer}>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <label className={classes.label}>Total Prognosis </label>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <Box className={classes.formControl}>
                              <OutlinedInput
                                disabled
                                value={totals}
                                onChange={(value) => { }}
                                adornment="%"
                              />
                            </Box>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <span style={{ color: `${totals === 100 ? '#00923F' : 'red'}`, fontSize: "12px" }}>
                          Jumlah % yang diinput dari keseluruhan prognosis harus 100%
                        </span>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </Box>
              </GridContainer>
              <Box style={{ marginTop: "5vh" }} display="flex" justifyContent="center">
                <Button disabled={totals !== 100} style={{ backgroundColor: '#00923F', color: '#FFFFFF' }} color="success" onClick={(e) => handleSaveAndContinue(1)} >
                  Simpan & Lanjutkan
              </Button>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default Presentase;
