/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import HeaderLogo from "../../../assets/images/ziswaf/HeaderLogo.svg";

const AppLogo: React.FC<{}> = () => {
  return (
    <div className="brand-sidebar">
      <h1 className="logo-wrapper">
        <a className="brand-logo" href="/dashboard">
          <img
            className="hide-on-med-and-down"
            src={HeaderLogo}
            alt="Header-Logo"
            style={{height: 32}}
          />
          <img
            className="show-on-medium-and-down hide-on-med-and-up"
            src={HeaderLogo}
            alt="Header-Logo"
          />
        </a>
      </h1>
    </div>
  );
};

export default AppLogo;
