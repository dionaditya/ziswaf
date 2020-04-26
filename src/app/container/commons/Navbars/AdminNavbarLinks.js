import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import InputIcon from "@material-ui/icons/Input";

// core components
import Button from "@/app/container/commons/CustomButtons/Button.tsx";

import styles from "@/app/container/assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import ModalLogout from "./ModalLogout";
import { getUserInfo } from "@/app/infrastructures/misc/Cookies";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);

  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  // const handleClickProfile = event => {
  //   if (openProfile && openProfile.contains(event.target)) {
  //     setOpenProfile(null);
  //   } else {
  //     setOpenProfile(event.currentTarget);
  //   }
  // };
  const getEmployeeName = () => {
    const user = getUserInfo();
    return user?.employee?.name;
  };

  // const handleCloseProfile = () => {
  //   setOpenProfile(null);
  // };
  return (
    <div>
      <ModalLogout isOpen={isOpen} setOpen={setOpen} />
      {/* <div
        className={classes.manager}
        style={window.innerWidth > 959 ? { paddingRight: 20 } : {}}
      >
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={e => handleClickNotification(e)}
          className={classes.buttonLink}
        >
          <div>
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>0</span>
          </div>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div> */}
      <div
        className={classes.manager}
        style={window.innerWidth > 959 ? { paddingRight: 20 } : {}}
      >
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          className={classes.buttonLink}
          onClick={e => {}}
        >
          <Person className={classes.icons} />
          <p
            className={classes.linkText}
            style={window.innerWidth > 959 ? { paddingLeft: 5 } : {}}
          >
            {getEmployeeName()}
          </p>
        </Button>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
        onClick={e => setOpen(true)}
      >
        <InputIcon className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Logout</p>
        </Hidden>
      </Button>
    </div>
  );
}
