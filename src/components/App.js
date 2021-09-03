import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as routes from "./Router";
import { ProtectedRoute } from "./Protected.route";
import "../styles/saltar.css";

import SuperNav from "./Nav/SuperNav";
import Login from "./Account/Login";

const Authenticate = lazy(() => import("./Home/Authenticate"));
const LogIn = lazy(() => import("./Account/Login"));
const SignIn = lazy(() => import("./Account/Signin"));
const Dashboard = lazy(() => import("./Home/Dashboard"));
const Edit = lazy(() => import("./Account/Edit"));
const Show = lazy(() => import("./Activity/Show"));
const Add = lazy(() => import("./Ticket/Add"));
const Management = lazy(() => import("./Ticket/Management"));
const MemberList = lazy(() => import("./Ticket/MemberList"));

const App = () => {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Router>
                    <div>
                        <SuperNav />

                        <Switch>
                            <Route exact path={routes.LOGIN}>
                                <Login />
                            </Route>
                            <Route path={routes.SIGNIN} component={SignIn} />
                            <Route path={routes.DASHBOARD}>
                                <Dashboard />
                            </Route>
                        </Switch>
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
