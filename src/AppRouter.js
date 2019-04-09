import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dash from './Dash' ;

function AppRouter() {
    return (
        <Router>
            <Route path="/dash" exact component={Dash} />
        </Router>
    );
}

export default AppRouter;