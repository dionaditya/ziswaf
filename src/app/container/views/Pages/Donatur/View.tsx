import React from "react";
import DonorPage from "./components/DonorPage";
import { AppProvider } from "./Controller";
import {ToastProvider} from 'react-toast-notifications'


const Donatur = () => {
  return (
    <AppProvider>
      <ToastProvider> 
           <DonorPage />
      </ToastProvider>
    </AppProvider>
  );
};


export default Donatur;
