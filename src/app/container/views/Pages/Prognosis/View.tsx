import React from "react";
import { Link } from "react-router-dom";
import BackNavigation from "@/app/container/components/BackNav";
import TabsNavigation from "./components/TabsNavigation";
import TabContainer from "./components/TabContainer";
import { PrognosisController } from "./Controller";

const Prognosis: React.FC<{}> = () => {
  return (
    <PrognosisController>
      <div className="row">
        <div className="col s12 l12 m12">
          <BackNavigation title="Input Prognosis" />
          <TabsNavigation />
          <TabContainer />
        </div>
      </div>
    </PrognosisController>
  );
};

export default Prognosis;
