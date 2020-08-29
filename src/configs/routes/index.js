import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Login from "containers/pages/Login";
import Register from "containers/pages/Register";
import Home from "containers/pages/Home";

const NotFound = () => {
  return <div>not found page</div>;
};

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
