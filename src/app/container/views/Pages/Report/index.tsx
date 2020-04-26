import React,{ useContext } from "react";
import ReportGeneral from "./components/ReportGeneral";
import LaporanDivisi from "./components/DivisionReport";
import LaporanKeuanganDanBarang from "./components/FinanceAndGoodsDonationReport";
import TopNavigation from "./components/TopNavigation";
import { ReportContext } from './Controller'
import PageFilters from './components/PageFilter';
import Box from "@material-ui/core/Box";

const ReportView = () => {
  const controller = useContext(ReportContext)

  return (
    <>
      {controller.reportType === 'filter' && <PageFilters />}
      {controller.reportType !== 'filter' && <TopNavigation/>}
      <Box style={{marginTop: 30}}>
        {/* {controller.reportType === 'finance'  && <span style={{fontSize: 14, color: "#6A7088"}}>Under Maintenance...</span>} */}
        {controller.reportType === "division" && <LaporanDivisi />}
        {controller.reportType === "finance" && <LaporanKeuanganDanBarang />}
        {controller.reportType === 'general' && <ReportGeneral />}
      </Box>
    </>
  );
};

export default ReportView;
