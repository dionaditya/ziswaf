import React from "react";
import EmployeeDashboardPage from "./components/EmployeeDashboardPage";
import { AppProvider } from "./Controller";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";
import idLocale from "date-fns/locale/id";
import {ToastProvider} from 'react-toast-notifications'

const EmployeeDashboard = () => {
  return (
    <AppProvider>
      <MuiPickersUtilsProvider utils={MomentUtils} locale={idLocale}>
          <ToastProvider>
             <EmployeeDashboardPage />
          </ToastProvider>
      </MuiPickersUtilsProvider>
    </AppProvider>
  );
};

export default EmployeeDashboard;
