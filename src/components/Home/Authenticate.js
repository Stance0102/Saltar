import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import * as routes from "../Router";

const LogIn = lazy(() => import("../Account/Login"));
const SignUp = lazy(() => import("../Account/signup"));

const Authenticate = () => {
    return (
        <div className="main">
            <div className="content">
                <Switch>
                    <Route path={routes.LOGIN} component={LogIn} />
                    <Route path={routes.SIGNUP} component={SignUp} />
                </Switch>
            </div>
        </div>
    );
};

export default Authenticate;
