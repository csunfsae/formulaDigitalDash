import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dash from './Dash' ;
import Home from './Home';

function AppRouter() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/dash" component={Dash} />
      </Router>
    );
}

export default AppRouter;