import React from 'react';
import ViewReportDonation from './views';
import ReportDonationController from "./Controller";

const ReportDonation = () => {
    return (
        <ReportDonationController>
            <ViewReportDonation />
        </ReportDonationController>
    )
}

export default ReportDonation;