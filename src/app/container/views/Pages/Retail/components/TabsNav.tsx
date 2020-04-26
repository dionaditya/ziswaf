import React from "react";
import { Tabs, Tab } from "react-materialize";
import DonorInput from "@/app/container/views/Pages/Retail/components/DonorInput";
import DonationInput from "@/app/container/views/Pages/Retail/components/DonationInput";
import Receipt from "@/app/container/views/Pages/Retail/components/Receipt";

const TabsNav: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Tabs className="tab-demo z-depth-1 tabs">
        <Tab
          active
          className="black-text"
          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false
          }}
          title="Data Donatur"
        >
          {/* <DonorInput /> */}
        </Tab>
        <Tab
          className="grey-text text-darken-3"
          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false
          }}
          title="Data Donasi"
        >
          {/* <DonationInput /> */}
        </Tab>
        <Tab
          className="grey-text text-darken-3"
          options={{
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false
          }}
          title="Tanda Terima"
        >
          {/* <Receipt /> */}
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default TabsNav;
