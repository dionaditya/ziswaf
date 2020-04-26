import React from "react";
import { Tabs, Tab } from "react-materialize";
import DonorInput from "@/app/container/views/Pages/Corporate/components/DonorInput";
import DonationInput from "@/app/container/views/Pages/Corporate/components/DonationInput";
import Receipt from "@/app/container/views/Pages/Corporate/components/Receipt";

const TabsNav: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Tabs className="tab-demo z-depth-1 tabs">
        <Tab
          active
          className="blue-text text-darken-3"
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
          className="blue-text text-darken-3"
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
          className="blue-text text-darken-3"
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
