import React, { useState, Fragment } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import PrognosisMonthly from "./PrognosisMonthly";
import Success from "./Success";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "transparent",
      color: "#eaeaf0",
      display: "flex",
      height: 22,
    },
    active: {
      "& $line": {
        borderColor: "#784af4",
      },
      color: "black",
    },
    completed: {
      "& $line": {
        borderColor: "#784af4",
      },
      color: "red",
    },
    stepIcon: {
      color: "#00923F",
      "&$active": {
        color: "#00923F",
      },
      "&$completed": {
        color: "#00923F",
      },
      border: "2px solid #00923F",
      width: 25,
      height: 25,
      borderRadius: "50%",
    },
  })
);

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    backgroundColor: "black",
  },
  active: {
    "& $line": {
      borderColor: "#00923F",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#00923F",
    },
  },
  line: {
    borderColor: "#cccccc",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const StepForm = () => {
  const classes = useStyles();
  const [steps, setSteps] = useState(0);
  const labels = ["Upz", "Corporate", "Retail"];

  const handleNext = () => setSteps(steps + 1);
  const handleBack = () => setSteps(steps - 1);

  return (
    <Fragment>
      {steps === labels.length ? (
        <Success />
      ) : (
        <Fragment>
          <Stepper
            activeStep={steps}
            style={{ paddingTop: 30 }}
            alternativeLabel
            className={classes.root}
            connector={<QontoConnector />}
          >
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    classes: {
                      root: classes.stepIcon,
                      completed: classes.completed,
                      active: classes.active,
                    },
                  }}
                >
                  {" "}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <PrognosisMonthly
            step={steps}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default StepForm;
