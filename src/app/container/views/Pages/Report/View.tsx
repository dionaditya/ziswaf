import React from "react";
import { AppProvider } from "./Controller";

import ReportsView from "./index";

const Report = () => {
  return (
    <AppProvider>
      <ReportsView />
    </AppProvider>
  );
};

export default Report;
