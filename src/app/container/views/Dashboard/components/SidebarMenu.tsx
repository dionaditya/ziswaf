/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import handleUnAuthorizedRole from '@/app/infrastructures/misc/UnAuthorizedRole';

const menus = [
  {
    label: "Dashboard",
    name: 'root',
    icon: 'dashboard',
    link: '/',
    divider: false,
  },
  {
    label: "Daftar Donasi",
    name: 'donation',
    icon: 'subject',
    link: '/donasi',
    divider: false,
  },
  {
    label: "Daftar Donatur",
    name: 'donatur',
    icon: 'person',
    link: '/donatur',
    divider: false,
  },
  {
    label: "Personel Madrasah",
    name: 'personel',
    icon: 'perm_contact_calendar',
    link: '/personel',
    divider: true,
  },
  {
    label: "Daftar Siswa",
    name: 'student',
    icon: 'account_circle',
    link: '/daftar-siswa',
    divider: false,
  },
  {
    label: "Laporan",
    name: 'report',
    icon: 'assignment',
    link: '/report',
    divider: true,
  },
  {
    label: "Daftar Madrasah",
    name: 'madrasah',
    icon: 'home',
    link: '/madrasah',
    divider: false,
  },
  {
    label: "Daftar User",
    name: 'users',
    icon: 'people_outline',
    link: '/daftar-user',
    divider: false,
  },
  {
    label: "Input Prognosis",
    name: 'prognosis',
    icon: 'trending_up',
    link: '/prognosis',
    divider: false,
  },
]
const SidebarMenu: React.FC<{}> = () => {
  let location = useLocation();

  return (
    <ul
      className="sidenav sidenav-collapsible leftside-navigation collapsible sidenav-fixed menu-shadow"
      id="slide-out"
      data-menu="menu-navigation"
      data-collapsible="accordion"
    >
      {/* Menus */}
      {menus.map(menu => true && (
        <>
          {
            !handleUnAuthorizedRole(menu.name) && (
              <>
                {menu.divider && (<li style={{marginBottom: 5, marginRight: 10, marginLeft: 10, backgroundColor: '#4F5461'}} className="divider"></li>)}
                <li className="bold">
                  <Link className={`waves-effect waves-cyan ${location.pathname === menu.link || location.pathname === `${menu.link}/input` ? 'active' : ''}`} to={menu.link}>
                    <i className="material-icons">{menu.icon}</i>
                    <span className="menu-title" data-i18n="User Profile">
                      {menu.label}
                    </span>
                  </Link>
                </li>
              </>
            )
          }
        </>
      ))}
    </ul>
  );
};

export default SidebarMenu;
