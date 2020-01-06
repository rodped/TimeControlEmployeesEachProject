import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Login from "./pages/Login";
import TimeControl from "./pages/TimeControl";
import Dashboard from "./components/Dashboard";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TimeControl} />
      <PrivateRoute path="/timeControl" component={TimeControl} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="*">
        <Redirect to={{ pathname: "/" }} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
