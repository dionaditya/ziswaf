import React from "react";
import { DataDonasi } from "./components/DataDonasi";
import { DonationController } from './Controller';
import { SearchDonation } from './components/Search';
import {ToastProvider} from 'react-toast-notifications'

const Donasi: React.FC<{}> = () => {
  return (
      <DonationController>
        <ToastProvider>
            <SearchDonation />
            <DataDonasi />
        </ToastProvider>
      </DonationController>
  );
};

export default Donasi;
