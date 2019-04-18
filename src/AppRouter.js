import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dash from './Dash' ;
import Home from './Home';
import Telemetry from "./Telemetry";
import { CssBaseline } from "@material-ui/core";


function AppRouter() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/dash" component={Dash} />
          <Route path="/telemetry" component={Telemetry} />
        </Router>
      </React.Fragment>
    );
}

export default AppRouter;