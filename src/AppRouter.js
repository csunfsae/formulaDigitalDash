import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dash from './Dash' ;
import Telemetry from './Telemetry' ;


function AppRouter() {
    return (
        <Router>
            <Route path="/dash" exact component={Dash} />
            <Route path="/telemetry" exact component={Telemetry} />
        </Router>
    );
}

export default AppRouter;