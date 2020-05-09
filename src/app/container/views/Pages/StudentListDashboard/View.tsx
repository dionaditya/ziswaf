import React from "react";
import StudentListDashboardPage from "./components/HalamanDaftarSiswaDashboard";
import { AppProvider } from "./Controller";
import { ToastProvider } from "react-toast-notifications";

const StudentLishDasboard = () => {
  return (
    <AppProvider>
      <ToastProvider>
        <StudentListDashboardPage />
      </ToastProvider>
    </AppProvider>
  );
};

export default StudentLishDasboard;
