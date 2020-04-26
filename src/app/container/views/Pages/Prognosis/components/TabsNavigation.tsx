import React, { useContext } from "react";
import TabNav from '@/app/container/components/TabNav'
import { PrognosisContext } from "../Controller";


const TabsNav: React.FC<{}> = () => {
  const controller = useContext(PrognosisContext)
  const { state, handleSetState }: any = controller;
  const tabs = [
    {
      name: '1. Prognosis Tahunan'
    },
    {
      name: '2. Prognosis Bulanan',
    }
  ]

  const handleChange = (_, i) => {
    if(state.selectedTab > i) {
        handleSetState('selectedTab', i)
    }
  }

  return (
    <React.Fragment>
      <TabNav 
        link={false} 
        value={state.selectedTab} 
        handleChange={handleChange} 
        tabs={tabs} 
        render={() =>  {}}
      />
    </React.Fragment>
  );
};

export default TabsNav;
