import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dash from './Dash' ;
import Home from './Home' ;
import Telemetry from './Telemetry' ;


function AppRouter() {
    return (
        <Router>
            <Route path="/dash" exact component={Dash} />
            <Route path="/telemetry" exact component={Telemetry} />
            <Route path="/" exact component={Home} />
            <Route path="/dash" component={Dash} />
        </Router>
    );
}

export default AppRouter;