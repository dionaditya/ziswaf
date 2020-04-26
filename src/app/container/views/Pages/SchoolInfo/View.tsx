import React, { useState } from "react";
import  SchoolInfo from './SchoolInfo'
import MadrasahInfoController from './Controller';



const SchoolInfoPage: React.FC<{}> = () => {
  return (
    <div>
      <MadrasahInfoController>
        <SchoolInfo />
      </MadrasahInfoController>
    </div>
  );
};

export default SchoolInfoPage
