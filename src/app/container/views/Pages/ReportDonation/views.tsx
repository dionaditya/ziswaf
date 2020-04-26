import React, { useContext } from "react";
import PageFilters from "./components/PageFilters";
import PageReports from "./components/PageReportFilter";
import { ReportDonationContext } from "./Controller";

const ViewReportDonation: React.FC<{}> = () => {
  const controller = useContext(ReportDonationContext);
  return (
      <>{controller.reportStep === 'filter' ?  <PageFilters /> :   <PageReports />}</>
  )
};

export default ViewReportDonation;
