import React from "react";
import BackNavigation from "@/app/container/components/BackNav";
import EmployeeInputSection from "./EmployeeInputPage";
import { ToastProvider } from "react-toast-notifications";
import { useLocation } from 'react-router-dom';
import qs from 'qs';

const EmployeeInputScreen = () => {
  const location = useLocation();
  const queryString: number = qs.parse(location.search);
  return (
    <React.Fragment>
      <ToastProvider>
        {queryString["?detail"] !== undefined ?
          <BackNavigation title="Info Tenaga Ma'had" /> :
          <BackNavigation title="Input Tenaga Ma'had" />}
        <EmployeeInputSection />

      </ToastProvider>
    </React.Fragment>
  );
};

export default EmployeeInputScreen;
