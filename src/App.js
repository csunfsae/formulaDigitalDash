import React from "react";
import { Route } from "react-router-dom"
import { withRouter } from 'react-router';
import Dash from './Dash' ;
import Home from './Home';
import Telemetry from "./Telemetry";

function App(props) {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={() => (
            <Home
              history={props.history}
            />
          )}
        />
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
      </React.Fragment>
    );
}

export default withRouter(App);