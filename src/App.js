import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import Dash from './Dash' ;
import RemoteApp from "./RemoteApp";

function App() {
    return (
      <Router>
        <Route exact path="/dash" component={Dash} />
        <Route exact component={RemoteApp} path="/" />
      </Router>
    );
}
export default App;
