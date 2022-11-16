import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignInSide from "../pages/HomePage";
import PrivateRouter from "./PrivateRouter";
import BoardPage from "../pages/BoardPage";
import UseAuth from "../middlewares/UseAuth";
import DashboardPage from "../pages/DashboardPage";


function AppRouter(props) {
    const auth = UseAuth();
    return (
        <Router>
            <Switch>
                <Route exact path={'/board-sw1'} component={auth.isLogged()?DashboardPage:SignInSide}/>
                <PrivateRouter path={'/board-sw1/board/:name'} component={BoardPage}/>
            </Switch>
        </Router>
    );
}

export default AppRouter;