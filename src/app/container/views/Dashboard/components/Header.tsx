/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Avatar from "../../../assets/images/ziswaf/AskarKauny.png";
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';
// import ModalLogout from "../../../commons/Navbars/ModalLogout";

const Header: React.FC<{}> = () => {

  
  const getEmployeeName = () => {
    const user = getUserInfo();
    return user?.employee?.name
  }

  return (
    <header className="page-topbar" id="header">
      {/* <ModalLogout /> */}
      <div className="navbar navbar-fixed">
        <nav
          className="navbar-main navbar-color nav-collapsible sideNav-lock navbar-dark sidenav-dark"
          style={{ background: "#2C3240" }}
        >
          <div className="nav-wrapper">
            <ul className="navbar-list right">
              <li>
                <a
                  className="waves-effect notification-button"
                  // eslint-disable-next-line no-script-url
                  href=""
                  data-target="notifications-dropdown"
                >
                  <i className="material-icons">
                    notifications_none
                    <small className="notification-badge">5</small>
                  </i>
                </a>
              </li>
              <li>
                  <span className="avatar-status avatar-online">
                    <img src={Avatar} alt="avatar" />
                  </span>
                  <span style={{fontWeight: 'bold', marginLeft: 5}}>{getEmployeeName()}</span>
              </li>
              <li>
                <a
                  href="#modal-logout"
                  className="modal-trigger"
                >
                   <i className="material-icons">exit_to_app</i>
                </a>
              </li>
            </ul>
            <ul className="dropdown-content" id="notifications-dropdown">
              <li>
                <h6>
                  NOTIFICATIONS<span className="new badge">5</span>
                </h6>
              </li>
              <li className="divider"></li>
              <li>
                <a className="black-text" href="#!">
                  <span className="material-icons icon-bg-circle cyan small">
                    add_shopping_cart
                  </span>
                  A new order has been placed!
                </a>
              </li>
              <li>
                <a className="black-text" href="#!">
                  <span className="material-icons icon-bg-circle red small">
                    stars
                  </span>
                  Completed the task
                </a>
              </li>
              <li>
                <a className="black-text" href="#!">
                  <span className="material-icons icon-bg-circle teal small">
                    settings
                  </span>
                  Settings updated
                </a>
              </li>
              <li>
                <a className="black-text" href="#!">
                  <span className="material-icons icon-bg-circle deep-orange small">
                    today
                  </span>
                  Director meeting started
                </a>
              </li>
              <li>
                <a className="black-text" href="#!">
                  <span className="material-icons icon-bg-circle amber small">
                    trending_up
                  </span>
                  Generate monthly report
                </a>
              </li>
            </ul>

            <ul className="dropdown-content" id="profile-dropdown">
              <li>
                <a
                  className="grey-text text-darken-1"
                  href="user-profile-page.html"
                >
                  <i className="material-icons">person_outline</i> Profile
                </a>
              </li>
              <li>
                <a className="grey-text text-darken-1" href="app-chat.html">
                  <i className="material-icons">chat_bubble_outline</i> Chat
                </a>
              </li>
              <li>
                <a className="grey-text text-darken-1" href="page-faq.html">
                  <i className="material-icons">help_outline</i> Help
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a
                  className="grey-text text-darken-1"
                  href="user-lock-screen.html"
                >
                  <i className="material-icons">lock_outline</i> Lock
                </a>
              </li>
              <li>
                <a className="grey-text text-darken-1" href="user-login.html">
                  <i className="material-icons">keyboard_tab</i> Logout
                </a>
              </li>
            </ul>
          </div>
          <nav className="display-none search-sm">
            <div className="nav-wrapper">
              <form>
                <div className="input-field search-input-sm">
                  <input
                    className="search-box-sm mb-0"
                    type="search"
                    id="search"
                    data-search="template-list"
                  />
                  <i className="material-icons search-sm-close">close</i>
                  <ul className="search-list collection search-list-sm display-none"></ul>
                </div>
              </form>
            </div>
          </nav>
        </nav>
      </div>
    </header>
  );
};

export default Header;
