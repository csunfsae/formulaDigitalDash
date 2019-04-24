import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import { withRouter } from 'react-router';
import Dash from './Dash' ;
import Telemetry from "./Telemetry";

function App(props) {
    return (
      <Router>
        <Route path="/dash" component={Dash} />
        <Route
          exact
          path="/telemetry"
          render={() => (
            <Telemetry
              history={props.history}
            />
          )}
        />
        {/* <Route path="/home" component={Home} auth={props.auth} {...props} /> */}
      </Router>
    );
}

export default withRouter(App);