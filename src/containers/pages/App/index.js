import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Login from "containers/pages/Login";
import Register from "containers/pages/Register";

const Home = () => {
  return <div>home page</div>;
};

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;
