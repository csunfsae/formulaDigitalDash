import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dash from './Dash' ;
<<<<<<< HEAD
import Telemetry from './Telemetry' ;


function AppRouter() {
    return (
        <Router>
            <Route path="/dash" exact component={Dash} />
            <Route path="/telemetry" exact component={Telemetry} />
        </Router>
=======
import Home from './Home';

function AppRouter() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/dash" component={Dash} />
      </Router>
>>>>>>> master
    );
}

export default AppRouter;