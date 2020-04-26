import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "@/app/container/commons/Navbars/Navbar.js";
// import Footer from "@/app/container/commons/Footer/Footer.js";
import Sidebar from "@/app/container/commons/Sidebar/Sidebar.js";

import routes from "../../../routes.ts";

import styles from "@/app/container/assets/jss/material-dashboard-react/layouts/adminStyle.js";

import { getToken, getUserInfo } from "@/app/infrastructures/misc/Cookies";
import handleUnAuthorizedRole from "@/app/infrastructures/misc/UnAuthorizedRole";
import { roleAbilityAdmin, roleAbilityOperator } from "@/data/misc/RoleAbility";

import logo from "@/app/container/assets/img/ziswaf/HeaderLogo.svg";

let ps;

const PrivateRoute = ({ component: Component, exact, ...rest }) => {
  if (exact) {
    return (
      <Route
        {...rest}
        exact
        render={(props) => {
          if (handleUnAuthorizedRole(rest?.content)) {
            return <Redirect from="/dashboard" to="/dashboard/home" />;
          }
          return !accessToken ? (
            <Redirect from="/dashboard" to="/login" />
          ) : (
            <Component {...props} />
          );
        }}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (handleUnAuthorizedRole(rest?.content)) {
            return <Redirect from="/dashboard" to="/dashboard/home" />;
          }
          return !accessToken ? (
            <Redirect from="/dashboard" to="/login" />
          ) : (
            <Component {...props} />
          );
        }}
      />
    );
  }
};

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <PrivateRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact={prop.exact}
            content={prop.path}
          />
        );
      }
      return null;
    })}
    <Redirect from="/dashboard" to="/dashboard/home" />
  </Switch>
);

const routeBaseOnRole = () => {
  const userInfo = getUserInfo();
  const userRole = userInfo?.role;

  const abilityRole = userRole === 1 ? roleAbilityAdmin : roleAbilityOperator;
  const onlyShow = routes
    .filter((route) => route.show === true)
    .filter((route) => {
      return abilityRole.find((role) => role.name === route.path);
    });
  const showRoutes = onlyShow;
  return showRoutes;
};

const useStyles = makeStyles(styles);
const accessToken = getToken();

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState("");
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleFixedClick = () => {
  //   if (fixedClasses === "dropdown") {
  //     setFixedClasses("dropdown show");
  //   } else {
  //     setFixedClasses("dropdown");
  //   }
  // };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/dashboard/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routeBaseOnRole()}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routeBaseOnRole()}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {/* {getRoute() ? <Footer /> : null} */}
      </div>
    </div>
  );
}
