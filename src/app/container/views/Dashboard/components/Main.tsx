import React from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./Content";
import Retail from "./../../Pages/Retail/View";
import Corporate from "./../../Pages/Corporate/View";
import Upz from "./../../Pages/upz/View";
import Prognosis from "./../../Pages/Prognosis/View";
import Madrasah from "./../../Pages/Madrasah/View";
import Donatur from "../../Pages/Donatur/View";

const Main: React.FC<{}> = () => {
  return (
    <div>
      <Switch>
        <Route exac path="/dashboard" component={Content} />
        <Route path="/retail" component={Retail} />
        <Route path="/corporate" component={Corporate} />
        <Route path="/upz" component={Upz} />
        <Route path="/prognosis" component={Prognosis} />
        <Route path="/madrasah" component={Madrasah} />
        <Route path="/donatur" component={Donatur} />
      </Switch>
    </div>
  );
};

export default Main;
