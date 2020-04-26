import React, { useState, useContext, useEffect } from "react";
import Button from "@/app/container/commons/CustomButtons/Button.tsx";
import MonthlyItem from "./MonthlyItem";
import PrognosisTotal from "./PrognosisTotal";
import { PrognosisContext } from "../Controller";
import ModalSubmit from "./ModalSubmit";
import GridItem from "@/app/container/commons/Grid/GridItem.tsx";
import GridContainer from "@/app/container/commons/Grid/GridContainer.tsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "30px 0",
    },
    formContainer: {
      marginTop: theme.spacing(2),
      width: "100%",
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
      fontWeight: 800,
    },
  })
);

const PrognosisMonthly = (props) => {
  const classes = useStyles();
  const { handleBack, handleNext, step } = props;
  const controller = useContext(PrognosisContext);
  const {
    state,
    selectedYearlyOption,
    handleSendData,
    handleSetState,
  } = controller;

  const stepName = ["Upz", "Retail", "Corporate"];
  const stepItem = [
    "itemPrognosisUpz",
    "itemPrognosisRetail",
    "itemPrognosisCorporate",
  ];
  const stepTotalProg = [
    "totalPrognosisUpz",
    "totalPrognosisRetail",
    "totalPrognosisCorporate",
  ];

  const months = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];

  const defaultStatePersentase = months
    .map((month) => {
      const itemName = `${month}_percentage`;
      return {
        name: itemName,
        itemName: 0,
      };
    })
    .reduce((obj, item) => {
      obj[item.name] = item.itemName;
      return obj;
    }, {});

  const defaultStateNominal = months
    .map((month) => {
      const itemName = `${month}_nominal`;
      return {
        name: itemName,
        itemName: 0,
      };
    })
    .reduce((obj, item) => {
      obj[item.name] = item.itemName;
      return obj;
    }, {});

  const defaultValue = {
    isFirstState: false,
    prog_total: 0,
    prog_persentase: 100,
    division_id: 0,
    ...defaultStatePersentase,
    ...defaultStateNominal,
  };
  const [value, setValue] = useState(defaultValue);
  const [dataTemp, setDataTemp] = useState({
    Retail: [],
    Corporate: [],
    Upz: [],
  });

  useEffect(() => {
    const stepList = state[stepItem[step]];
    const totalSum = state[stepTotalProg[step]];
    stepList &&
      stepList.map((list) => {
        const getMonthName = months[list.month - 1];
        const getMonthPercentageName = `${getMonthName}_percentage`;
        const getMonthNominalName = `${getMonthName}_nominal`;
        handleGetPercentage(getMonthPercentageName, totalSum, list.total);
        handleSetValue(getMonthNominalName, list.total);
        handleSetValue("division_id", list.division_id);
        handleSetValue("prog_total", totalSum);
      });
    if (stepList && stepList.length === 0) {
      setValue(defaultValue);
      handleSetValue("division_id", step + 1);
      handleSetValue("isFirstState", true);
    }
  }, [state[stepItem[step]], state[stepTotalProg[step]]]);

  const handleSetValue = (name, value) => {
    setValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleGetTotalPercentage = () => {
    const percentage = months
      .map((month) => {
        const stateNamePercentage = `${month}_percentage`;
        return parseFloat(value[stateNamePercentage]);
      })
      .reduce((total, amount) => total + amount);
    return Math.round(percentage);
  };

  const handleGetTotalNominal = () => {
    const nominal = months
      .map((month) => {
        const stateNamePercentage = `${month}_nominal`;
        return parseFloat(value[stateNamePercentage]);
      })
      .reduce((total, amount) => total + amount);
    return controller.isFirst ? controller.state[stepTotalProg[step]] : nominal;
  };

  const handleGetPercentage = (name, total, value) => {
    const percentage = (value / total) * 100;
    handleSetValue(name, percentage);
  };

  const handleSaveAndNext = async (e) => {
    const totalMonthly = await months.map((month, i) => {
      const stateNamePercentage = `${month}_nominal`;
      const monthNumber = i + 1;
      return {
        total: value[stateNamePercentage],
        month: monthNumber,
        year: selectedYearlyOption,
        division_id: value.division_id,
      };
    });
    setDataTemp((prevState) => {
      return { ...prevState, [stepName[step]]: totalMonthly };
    });

    if (step !== 2) {
      handleNext();
    } else {
      handleSetState("isModalConfirm", true);
    }
  };

  const handleSendToDB = async () => {
    handleSendData(dataTemp);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: window.innerWidth > 959 ? 100 : 0,
        paddingRight: window.innerWidth > 959 ? 100 : 0,
      }}
    >
      <ModalSubmit
        handleSubmit={() => handleSendToDB()}
        handleClose={() => handleSetState("isModalConfirm", false)}
        open={state["isModalConfirm"]}
        isLoading={state["isLoadingSubmit"]}
      />
      <GridContainer>
        <Box className={classes.formContainer}>
          <GridItem xs={12} sm={12} md={12}>
            <PrognosisTotal
              data={value}
              totalPercentage={handleGetTotalPercentage()}
              totalNominal={handleGetTotalNominal()}
              progname={stepName[step]}
              isFirst={controller.isFirst}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <MonthlyItem
              isFirst={controller.isFirst}
              firstTotal={controller.state[stepTotalProg[step]]}
              state={value}
              monthName={months}
              onChange={(name, value) => handleSetValue(name, value)}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Box style={{marginTop: "5vh"}} display="flex" justifyContent="flex-end" alignItems="center">
              {step !== 0 && (
                <Button style={{
                  background: "#ffffff",
                  color: "#00923F",
                  borderRadius: "2px",
                  border: "1px solid #00923F"
                }} color="transparent" onClick={handleBack}>
                Kembali
              </Button>
              )}
              <Button
                style={{
                  background: "#00923F",
                  color: "#ffffff",
                  marginLeft: "4px",
                }}
                disabled={
                  handleGetTotalPercentage() !== 100 &&
                  handleGetTotalNominal() !== value.prog_total
                }
                onClick={handleSaveAndNext}
              >
                Simpan & {step === 2 ? "Keluar" : "Lanjutkan"}
              </Button>
            </Box>
          </GridItem>
        </Box>
      </GridContainer>
    </div>
  );
};

export default PrognosisMonthly;
