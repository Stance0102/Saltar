import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as routes from "./Router";
import { ProtectedRoute } from "./Protected.route";
import "../styles/saltar.css";
import SuperNav from "./Nav/SuperNav";

const LogIn = lazy(() => import("./Account/Login"));
const SignIn = lazy(() => import("./Account/Signin"));
const Dashboard = lazy(() => import("./Home/Dashboard"));
const ErrorPage = lazy(() => import("./Home/ErrorPage"));

const App = () => {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Router>
                    <div>
                        <SuperNav />
                        <div className="main">
                            <Switch>
                                <Route
                                    exact
                                    path={routes.LOGIN}
                                    component={LogIn}
                                />
                                <Route
                                    path={routes.SIGNIN}
                                    component={SignIn}
                                />
                                <Route path={routes.DASHBOARD}>
                                    <Dashboard />
                                </Route>
                                <Route component={ErrorPage} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Suspense>
        </>
    );
};

export default App;

{
    /* <ProtectedRoute exact path={routes.DASHBOARD} component={Dashboard} />; */
}
