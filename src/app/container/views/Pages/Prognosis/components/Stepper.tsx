import React, { useState, Fragment } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import TotalRetail from "./PrognosisMonthly";
import Success from "./Success";

const labels = ["Retail", "Corporate", "Upz"];

const StepForm = () => {
  const [steps, setSteps] = useState(0);

  const handleNext = () => setSteps(steps + 1);
  const handleBack = () => setSteps(steps - 1);

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return <TotalRetail handleNext={handleNext} />;
      case 1:
        return <TotalRetail handleNext={handleNext} />;
      case 2:
        return  <TotalRetail handleNext={handleNext} />;
      default:
        break;
    }
  };

  return (
    <Fragment>
      {steps === labels.length ? (
        <Success />
      ) : (
        <Fragment>
          <Stepper
            activeStep={steps}
            style={{ paddingTop: 30, paddingBottom: 30 }}
            alternativeLabel
          >
            {labels.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(steps)}
        </Fragment>
      )}
    </Fragment>
  );
};

export default StepForm;
