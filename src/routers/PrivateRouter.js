import React from 'react';
import UseAuth from "../middlewares/UseAuth";
import {Redirect, Route} from "react-router-dom";

function PrivateRouter({component: Component, ...rest}) {
    const auth = UseAuth();
    return <Route {...rest}>
        {auth.isLogged() ? (<Component/>
        ) : (
            <Redirect to={'/board-sw1'}/>
        )}
    </Route>;
}

export default PrivateRouter;