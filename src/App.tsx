import React, { useState } from 'react';
import { AppComponent } from "./app/infrastructures/di/AppComponent";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import history from "@/app/infrastructures/misc/BrowserHistory";
import Login from '@/app/container/views/Login/View'

import Admin from "./app/container/layouts/Admin.js";
import RTL from "./app/container/layouts/RTL.js";

interface InitialState {
  user: any,
  setGlobalState: Function
}

const initialState: InitialState = {
  user: {},
  setGlobalState: () => {}
}

export const AppContext = React.createContext(initialState);

AppComponent.init();

export default function App(): JSX.Element {
  const [globalState, setGlobalState] = useState(initialState)
  
  return (
      <AppContext.Provider value={{
        user: globalState.user,
        setGlobalState: setGlobalState
      }}>
        <Router history={history}>
          <Switch>
          <Route path="/dashboard" component={Admin} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/dashboard/" />
          </Switch>
        </Router>
      </AppContext.Provider>
  );
}
