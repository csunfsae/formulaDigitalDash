import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import Dash from './Dash' ;
import TelemetryApp from "./TelemetryApp";

function App() {
    return (
      <Router>
        <Route exact path="/dash" component={Dash} />
        <Route exact component={TelemetryApp} path="/" />
      </Router>
    );
}
export default App;
