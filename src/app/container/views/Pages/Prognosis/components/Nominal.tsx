import React from "react";
import InputMask from "@/app/container/components/InputMask"
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Button from "@/app/container/commons/CustomButtons/Button.tsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0"
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

const Nominal: React.FC<{data, handleNominalChange, handleSaveAndContinue}> = ({data, handleNominalChange, handleSaveAndContinue}) => {
    const classes = useStyles();  
    const { totalPrognosisRetail, totalPrognosisCorporate, totalPrognosisUpz } = data
    const total = totalPrognosisRetail + totalPrognosisCorporate + totalPrognosisUpz;
    const handleOnChange = (name, value) => {
      handleNominalChange(name, value)
      handleNominalChange('totalPrognosis', total)
    };

  return (
    <React.Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitle}>Metode Nominal</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <Box className={classes.formContainer}>
                <GridItem xs={12} sm={12} md={12}>
                  <label className={classes.label}> Prognosis Retail </label>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Box className={classes.formControl}>
                      <InputMask defaultValue={totalPrognosisRetail} placeholder="Rp. 0" type="text" onChange={(value) => handleOnChange('totalPrognosisRetail', value)} />
                    </Box>
                </GridItem>
              </Box>
              <Box className={classes.formContainer}>
                <GridItem xs={12} sm={12} md={12}>
                  <label className={classes.label}> Prognosis Corporate </label>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Box className={classes.formControl}>
                      <InputMask defaultValue={totalPrognosisCorporate} placeholder="Rp. 0" type="text" onChange={(value) => handleOnChange('totalPrognosisCorporate', value)} />
                    </Box>
                </GridItem>
              </Box>
              <Box className={classes.formContainer}>
                <GridItem xs={12} sm={12} md={12}>
                  <label className={classes.label}> Prognosis UPZ </label>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Box className={classes.formControl}>
                    <InputMask defaultValue={totalPrognosisUpz} placeholder="Rp. 0" type="text" onChange={(value) => handleOnChange('totalPrognosisUpz', value)} />
                    </Box>
                </GridItem>
              </Box>
              <Box className={classes.formContainer} style={{marginTop: "5vh"}}>
                <GridItem xs={12} sm={12} md={12}>
                  <label className={classes.label}> Jumlah Prognosis Ziswaf </label>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Box className={classes.formControl}>
                    <InputMask disabled defaultValue={total} placeholder="Rp. 0" type="text" onChange={(value) => {}} />
                    </Box>
                </GridItem>
              </Box>
            </GridContainer>
            <Box style={{marginTop: "5vh"}} display="flex" justifyContent="center">
              <Button style={{backgroundColor: '#00923F', color: '#FFFFFF'}} color="success" onClick={(e) =>  handleSaveAndContinue(1)}>
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

export default Nominal;
