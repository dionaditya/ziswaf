import React from "react";
import { getUserInfo } from "@/app/infrastructures/misc/Cookies";

type userInfo = {
  employee: {
    name: "";
  };
};
const Greetings = ({ status, name }) => {
  const userInfo: userInfo = getUserInfo();
    return (
      <label style={{ fontSize: 18, color: "#000000" }}>
        Selamat datang
        <span
          className="darken-2"
          style={{
            fontWeight: 800,
            marginLeft: 5,
            marginRight: 5,
            color: "#00923F",
          }}
        >
          {`${userInfo.employee.name}. `}
        </span>
        <span>Login as</span>
        <span style={{ color: "#00923F" }}> {status === 1 ? 'Administrator' : 'Operator'} </span>
      </label>
    );
};

export default Greetings;
