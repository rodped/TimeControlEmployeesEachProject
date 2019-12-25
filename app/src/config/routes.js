import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/SignUp" component={SignUp} />

      <Route path="*">
        <Redirect to={{ pathname: "/" }} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
