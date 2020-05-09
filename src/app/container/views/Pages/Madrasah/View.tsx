import React, { useState } from "react";
import { AppProvider } from './Controller';
import MadrasahDashboardPage from './components/MadrasahDashboard'
import {ToastProvider} from 'react-toast-notifications'

const Madrasah: React.FC<{}> = () => {
  return (
    <div>
      
      <AppProvider>
        <ToastProvider>
            <MadrasahDashboardPage />
        </ToastProvider>
      </AppProvider>
    </div>
  );
};

export default Madrasah
