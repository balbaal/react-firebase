import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import { createBrowserHistory } from "history";

// Components
import Login from "containers/pages/Login";
import Register from "containers/pages/Register";
import Home from "containers/pages/Home";

const NotFound = () => {
  return <div>not found page</div>;
};

const authGuard = (Component) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    return createBrowserHistory().push("/login");
  } else {
    return Component;
  }
};

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={authGuard(Home)} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
