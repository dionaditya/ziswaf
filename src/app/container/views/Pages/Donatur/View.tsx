import React from "react";
import DonorPage from "./components/DonorPage";
import { AppProvider } from "./Controller";

const Donatur = () => {
  return (
    <AppProvider>
      <div>
        <DonorPage />
      </div>
    </AppProvider>
  );
};

export default Donatur;
