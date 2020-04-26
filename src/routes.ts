import React, { Component } from "react";
import Dashboard from "@/app/container/views/Dashboard/View";
import Report from "@/app/container/views/Pages/Report/View";
import Prognosis from "@/app/container/views/Pages/Prognosis/View";
import Madrasah from "@/app/container/views/Pages/Madrasah/View";
import Donasi from "@/app/container/views/Pages/Donasi/View";
import Donatur from "@/app/container/views/Pages/Donatur/View";
import DaftarSiswa from "@/app/container/views/Pages/StudentListDashboard/View";
import DaftarUser from "@/app/container/views/Pages/UserList/View";
import EmployeeDashboard from "@/app/container/views/Pages/EmployeeDashboardPage/View";

// Input Donation
import Retail from "@/app/container/views/Pages/Retail/View";
import Corporate from "@/app/container/views/Pages/Corporate/View";
import Upz from "@/app/container/views/Pages/upz/View";

// Madrasah
import InputMadrasah from "@/app/container/views/Pages/Madrasah/components/SchoolInput";
import InfoMadrasah from "@/app/container/views/Pages/SchoolInfo/SchoolInfo";
import MadrasahInputPage from "@/app/container/views/Pages/MadrasahInputSection/View";
import EmployeeInput from "@/app/container/views/Pages/EmployeeInputSection/view";
import SchoolInfoPage from "@/app/container/views/Pages/SchoolInfo/View";

// Input Donatur
import InputPerorangan from "@/app/container/views/Pages/Donatur/components/RetailInput";
import InputCorporate from "@/app/container/views/Pages/Donatur/components/CorporateInput";

// Users
import UserListInputSection from "@/app/container/views/Pages/UserListInputSection/View";
import StudentListInputSection from "@/app/container/views/Pages/StudenListInputSection/view";

import UnderMaintenance from "@/app/container/views/Pages/UnderMaintenance";

// Report of Donation
import ReportDonation from "@/app/container/views/Pages/ReportDonation";
import BarChart from "@material-ui/icons/BarChartOutlined";
import LaporanKeuanganDanBarang from './app/container/views/Pages/Report/components/FinanceAndGoodsDonationReport';

const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    rtlName: "",
    icon: "dashboard",
    component: Dashboard, //UnderMaintenance, // Dashboard,
    layout: "/dashboard",
    divider: false,
    show: true,
    exact: false,
  },
  {
    path: "/donation",
    name: "Daftar Donasi",
    rtlName: "",
    icon: "subject",
    component: Donasi, //Donasi,
    layout: "/dashboard",
    divider: false,
    show: true,
    exact: false,
  },
  {
    path: "/donatur",
    name: "Daftar Donatur",
    rtlName: "",
    icon: "person",
    component: Donatur, //Donatur,
    layout: "/dashboard",
    divider: false,
    show: true,
    exact: false,
  },

  {
    path: "/prognosis",
    name: "Input Prognosis",
    rtlName: "",
    icon: "trending_up",
    component: Prognosis,
    layout: "/dashboard",
    divider: false,
    show: true,
    exact: false,
  },
  {
    path: "/report-donation",
    name: "Laporan Jenis Donasi",
    rtlName: "",
    icon: BarChart,
    component: ReportDonation,
    layout: "/dashboard",
    divider: false,
    show: true,
    exact: true,
  },
  {
    path: "/personel",
    name: "Personel Ma'had",
    rtlName: "",
    icon: "perm_contact_calendar",
    component: EmployeeDashboard,
    layout: "/dashboard",
    divider: true,
    show: true,
    exact: false,
  },
  {
    path: "/students",
    name: "Daftar Siswa",
    rtlName: "",
    icon: "account_circle",
    component: DaftarSiswa, //DaftarSiswa,
    layout: "/dashboard",
    divider: false,
    show: true,
    exact: false,
  },
  {
    path: "/reports",
    name: "Laporan",
    rtlName: "",
    icon: "assignment",
    component: Report, //Report,
    layout: "/dashboard",
    divider: true,
    show: true,
    exact: true,
  },
  {
    path: "/madrasah",
    name: "Daftar Ma'had",
    rtlName: "",
    icon: "home",
    component: Madrasah,
    layout: "/dashboard",
    divider: false,
    show: true,
    exact: false,
  },
  {
    path: "/users",
    name: "Daftar Users",
    rtlName: "",
    icon: "people_outline",
    component: DaftarUser,
    layout: "/dashboard",
    divider: true,
    show: true,
    exact: false,
  },
  {
    path: "/upz",
    name: "Input Upz",
    rtlName: "",
    icon: "other",
    component: Upz,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/personel-input",
    name: "Input Employee",
    rtlName: "",
    icon: "other",
    component: EmployeeInput,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true,
  },
  {
    path: "/personel-input/:id",
    name: "Input Employee",
    rtlName: "",
    icon: "other",
    component: EmployeeInput,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/users-input",
    name: "Input Users",
    rtlName: "",
    icon: "other",
    component: UserListInputSection,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true,
  },
  {
    path: "/retail",
    name: "Input Retail",
    rtlName: "",
    icon: "subject",
    component: Retail,
    layout: "/dashboard",
    divider: false,
    show: false,
  },
  {
    path: "/corporate/donor",
    name: "Input Corporate",
    rtlName: "",
    icon: 'subject',
    component: Corporate,
    layout: "/dashboard",
    divider: false,
    show: false,
  },
  {
    path: "/corporate-transaction/:donor_id",
    name: "Input Corporate",
    rtlName: "",
    icon: 'subject',
    component: Corporate,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true
  },
  {
    path: "/corporate-tanda-terima/:transaction_id",
    name: "Input Corporate",
    rtlName: "",
    icon: 'subject',
    component: Corporate,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true
  },
  {
    path: "/retail-input/:id",
    name: "Input Retail",
    rtlName: "",
    icon: 'subject',
    component: Retail,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false
  },
  {
    path: "/retail-tanda-terima/:transaction_id",
    name: "Input Retail",
    rtlName: "",
    icon: 'subject',
    component: Retail,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false
  },
  {
    path: "/retail-input",
    name: "Input Retail",
    rtlName: "",
    icon: 'subject',
    component: Retail,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true
  },
  {
    path: "/retail-tanda-terima",
    name: "Input Retail",
    rtlName: "",
    icon: 'subject',
    component: Retail,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true
  },
  {
    path: "/upz",
    name: "Input UPZ",
    rtlName: "",
    icon: 'subject',
    component: Upz,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false
  },
  {
    path: "/upz/donor",
    name: "Input UPZ",
    rtlName: "",
    icon: 'subject',
    component: Upz,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false
  },
  {
    path: "/upz-transaction/:donor_id",
    name: "Input UPZ",
    rtlName: "",
    icon: 'subject',
    component: Upz,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true
  },
  {
    path: "/upz-transaction",
    name: "Input UPZ",
    rtlName: "",
    icon: 'subject',
    component: Upz,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true
  },
  {
    path: "/upz-tanda-terima/:transaction_id",
    name: "Input UPZ",
    rtlName: "",
    icon: 'subject',
    component: Upz,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/upz-tanda-terima",
    name: "Input UPZ",
    rtlName: "",
    icon: 'subject',
    component: Upz,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true
  },
  {
    path: "/users-input/:id",
    name: "Input Users",
    rtlName: "",
    icon: "other",
    component: UserListInputSection,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/student-input",
    name: "Input Employee",
    rtlName: "",
    icon: "other",
    component: StudentListInputSection,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true,
  },
  {
    path: "/donatur-perusahaan",
    name: "Input Donatur",
    rtlName: "",
    icon: "other",
    component: InputCorporate,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true,
  },
  {
    path: "/donatur-perusahaan/:id",
    name: "Input Donatur",
    rtlName: "",
    icon: "other",
    component: InputCorporate,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/student-input/:id",
    name: "Input Employee",
    rtlName: "",
    icon: "other",
    component: StudentListInputSection,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/madrasah-input",
    name: "Input Madrasah",
    rtlName: "",
    icon: "home",
    component: MadrasahInputPage,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true
  },
  {
    path: "/madrasah-input/:id",
    name: "Input Ma'had",
    rtlName: "",
    icon: "home",
    component: MadrasahInputPage,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/info-madrasah/:id",
    name: "Info Ma'had",
    rtlName: "",
    icon: "home",
    component: SchoolInfoPage,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/donatur-perorangan",
    name: "Input Donatur",
    rtlName: "",
    icon: "other",
    component: InputPerorangan,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: true,
  },
  {
    path: "/donatur-perorangan/:id",
    name: "Input Donatur",
    rtlName: "",
    icon: "other",
    component: InputPerorangan,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
  {
    path: "/info-personel",
    name: "Info Personel",
    rtlName: "",
    icon: "other",
    component: EmployeeInput,
    layout: "/dashboard",
    divider: false,
    show: false,
    exact: false,
  },
];

export default dashboardRoutes;
