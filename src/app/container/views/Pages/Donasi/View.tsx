import React from "react";
import { DataDonasi } from "./components/DataDonasi";
import { DonationController } from './Controller';
import { SearchDonation } from './components/Search';


const Donasi: React.FC<{}> = () => {
  return (
    <div>
      <DonationController>
        <div>
          <SearchDonation />
        </div>
        <div>
          <DataDonasi />
        </div>
      </DonationController>
    </div>
  );
};

export default Donasi;
