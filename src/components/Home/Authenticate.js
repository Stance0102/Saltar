import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import * as routes from "../Router";

const LogIn = lazy(() => import("../Account/Login"));
const SignIn = lazy(() => import("../Account/SignIn"));

const Authenticate = () => {
    return (
        <div className="main">
            <div className="content">
                <Switch>
                    <Route path={routes.LOGIN} component={LogIn} />
                    <Route path={routes.SIGNIN} component={SignIn} />
                </Switch>
            </div>
        </div>
    );
};

export default Authenticate;
