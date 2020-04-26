import React, { useContext } from "react";
import Monthly from "./Monthly";
import Yearly from "./Yearly";
import { PrognosisContext } from "../Controller";

const TabYearly: React.FC<{}> = () => {
  const controller = useContext(PrognosisContext)
  const { state }: any = controller;
  return state.selectedTab === 0 ? <Yearly /> : <Monthly /> ;
};

export default TabYearly;
