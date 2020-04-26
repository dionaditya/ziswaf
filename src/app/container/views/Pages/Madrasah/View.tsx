import React, { useState } from "react";
import { AppProvider } from './Controller';
import MadrasahDashboardPage from './components/MadrasahDashboard'

const Madrasah: React.FC<{}> = () => {
  return (
    <div>
      <AppProvider>
        <MadrasahDashboardPage />
      </AppProvider>
    </div>
  );
};

export default Madrasah
