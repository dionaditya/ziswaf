import React from "react";
import Content from "./components/Content";
import { AppProvider } from './Controller';

const Dashboard: React.FC<{}> = () => {
  return (
      <AppProvider>
          <Content />
      </AppProvider>
  );
};

export default Dashboard;
