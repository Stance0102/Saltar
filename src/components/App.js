import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import * as routes from "./Router";
import { ProtectedRoute } from "./Protected.route";
import SuperNav from "./Nav/SuperNav";
import Auth from "./Auth";

const LogIn = lazy(() => import("./Account/Login"));
const SignIn = lazy(() => import("./Account/SignIn"));
const Dashboard = lazy(() => import("./Home/Dashboard"));

const isLogged = Auth.isAuthenticated;

const App = () => {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <SuperNav isLogged={isLogged} />
                <Switch>
                    <Route path={routes.LOGIN} component={LogIn} />
                    <Route path={routes.SIGNIN} component={SignIn} />
                    <ProtectedRoute
                        exact
                        path={routes.DASHBOARD}
                        component={Dashboard}
                    />
                    <Route
                        path="*"
                        component={() => {
                            <p>404 找不到此頁面</p>;
                        }}
                    />
                </Switch>
            </Suspense>
        </>
    );
};

export default App;

/* <div className="main">
    <SubNav />
    <div className="content">
        {CMSroutes.map((route, key) => {
            if (route.exact) {
                return (
                    <Route
                        key={key}
                        exact
                        path={route.path}
                        component={route.component}
                    />
                );
            } else {
                return (
                    <Route
                        key={key}
                        path={route.path}
                        component={route.component}
                    />
                );
            }
        })}
    </div>
</div>; */
