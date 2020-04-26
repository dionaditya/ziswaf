import React from 'react'
import Sidebar from "@/app/container/views/Dashboard/components/Sidebar";
import Header from "@/app/container/views/Dashboard/components/Header";
import { getToken } from '@/app/infrastructures/misc/Cookies';
import { Switch, Route } from "react-router-dom";

import Dashboard from "@/app/container/views/Dashboard/View";
import Report from "@/app/container/views/Pages/Report/View";
import Retail from "@/app/container/views/Pages/Retail/View";
import Corporate from "@/app/container/views/Pages/Corporate/View";
import Upz from "@/app/container/views/Pages/upz/View";
import Prognosis from "@/app/container/views/Pages/Prognosis/View";
import Madrasah from "@/app/container/views/Pages/Madrasah/View";
import InputMadrasah from "@/app/container/views/Pages/Madrasah/components/SchoolInput";
import InfoMadrasah from "@/app/container/views/Pages/SchoolInfo/SchoolInfo";
import Donasi from "@/app/container/views/Pages/Donasi/View";
import Donatur from "@/app/container/views/Pages/Donatur/View";
import ScrollToTop from "@/app/container/components/ScrollToTop";
import DaftarSiswa from "@/app/container/views/Pages/StudentListDashboard/View";
import DaftarUser from "@/app/container/views/Pages/UserList/View";
import { DataTables } from "@/app/container/components/DataTables";
import InputPerorangan from "@/app/container/views/Pages/Donatur/components/RetailInput";
import InputCorporate from "@/app/container/views/Pages/Donatur/components/CorporateInput";
import UserListInputSection from '@/app/container/views/Pages/UserListInputSection/View';
import StudentListInputSection from '@/app/container/views/Pages/StudenListInputSection/view'
import MadrasahInputPage from '@/app/container/views/Pages/MadrasahInputSection/View';
import EmployeeDashboard from '@/app/container/views/Pages/EmployeeDashboardPage/View';
import EmployeeInput from '@/app/container/views/Pages/EmployeeInputSection/view';
import { Redirect } from 'react-router'
import Container from './Container';
import handleUnAuthorizedRole from '@/app/infrastructures/misc/UnAuthorizedRole';
import SchoolInfoPage from '@/app/container/views/Pages/SchoolInfo/View';

interface IProps {
  children: any
}

const BaseLayoutApps: React.FC<IProps> = (props) => {
  const accessToken = getToken()

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
      if (handleUnAuthorizedRole(rest?.name)) {
        return <Redirect to="/" />
      }
      return !accessToken ? <Redirect to="/login" /> : <Component {...props} />
    }
    } />;
  };

  const listRoute = () => {
    return (
      <Container>
        <ScrollToTop>
          <PrivateRoute exact name="root" path="/" component={Dashboard} />
          <PrivateRoute exact name="report" path="/report" component={Report} />
          <PrivateRoute exact name="report" path="/report/:reporttype" component={Report} />
          <PrivateRoute exact name="retail" path="/retail/donor" component={Retail} />
          <PrivateRoute exact name="retail" path="/retail/donor/:id" component={Retail} />
          <PrivateRoute exact name="retail" path="/retail/tanda-terima/:transaction_id" component={Retail} />
          <PrivateRoute exact name="corporate" path="/corporate/donor" component={Corporate} />
          <PrivateRoute name="corporate" path="/corporate/donor/:donor_id" component={Corporate} />
          <PrivateRoute name="corporate" path="/corporate/transaction/:donor_id" component={Corporate} />
          <PrivateRoute name="corporate" path="/corporate/tanda-terima/:transaction_id" component={Corporate} />
          <PrivateRoute exact name="upz" path="/upz" component={Upz} />
          <PrivateRoute exact name="upz" path="/upz/donor" component={Upz} />
          <PrivateRoute name="upz" path="/upz/transaction/:donor_id" component={Upz} />
          <PrivateRoute name="upz" path="/upz/tanda-terima/:transaction_id" component={Upz} />
          <PrivateRoute name="table" exact path="/table" component={DataTables} />
          <PrivateRoute name="prognosis" exact path="/prognosis" component={Prognosis} />
          <PrivateRoute name="madrasah" exact path="/madrasah" component={Madrasah} />
          <PrivateRoute name="madrasah" exact path="/madrasah/input" component={MadrasahInputPage} />
          <PrivateRoute name="madrasah" path="/madrasah/input/:id" component={MadrasahInputPage} />
          <PrivateRoute name="donatur" exact path="/donatur" component={Donatur} />
          <PrivateRoute name="student" exact path="/daftar-siswa" component={DaftarSiswa} />
          <PrivateRoute name="student" exact path="/daftar-siswa/input" component={StudentListInputSection} />
          <PrivateRoute name="student" path="/daftar-siswa/input/:id" component={StudentListInputSection} />
          <PrivateRoute name="users" exact path="/daftar-user" component={DaftarUser} />
          <PrivateRoute
            name="users"
            exact
            path="/daftar-user/input"
            component={UserListInputSection}
          />
          <PrivateRoute
            name="users"
            path="/daftar-user/input/:id"
            component={UserListInputSection}
          />
          <PrivateRoute name="donatur" exact path="/donatur-perorangan" component={InputPerorangan} />
          <PrivateRoute name="donatur" exact path="/donatur-corporate" component={InputCorporate} />
          <PrivateRoute name="donation" exact path="/donasi" component={Donasi} />
          <PrivateRoute name="madrasah" path="/info-madrasah/:id" component={SchoolInfoPage} />
          <PrivateRoute name="personel" exact path="/personel" component={EmployeeDashboard} />
          <PrivateRoute name="personel" exact path="/personel/input" component={EmployeeInput} />
          <PrivateRoute name="personel" path="/personel/input/:id" component={EmployeeInput} />
        </ScrollToTop>
      </Container>
    );
  };

  return (
    <div className="base-layout">
      <Sidebar />
      <Header />
      <Switch>
        {listRoute()}
        {/* Redirect to root page if there is no match url */}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
}

export default BaseLayoutApps;