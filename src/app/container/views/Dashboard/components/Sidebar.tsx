import React from "react";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import AppLogo from "./AppLogo";

const Sidebar: React.FC<{}> = () => {
  return (
    <aside className="sidenav-main nav-expanded nav-lock nav-collapsible sidenav-dark sidenav-active-rounded">
      <AppLogo />
      <SidebarMenu />
      <div className="navigation-background"></div>
      <Link
        className="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only"
        to="/dashboard"
        data-target="slide-out"
      >
        <i className="material-icons">menu</i>
      </Link>
    </aside>
  );
};

export default Sidebar;
