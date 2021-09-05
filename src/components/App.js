import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as routes from "./Router";
import { ProtectedRoute } from "./Protected.route";
import "../styles/saltar.css";

import SuperNav from "./Nav/SuperNav";
import Login from "./Account/Login";

const Authenticate = lazy(() => import("./Home/Authenticate"));
const LogIn = lazy(() => import("./Account/Login"));
const SignUp = lazy(() => import("./Account/signup"));
const Dashboard = lazy(() => import("./Home/Dashboard"));
const Edit = lazy(() => import("./Account/Edit"));
const Show = lazy(() => import("./Activity/Show"));
const Add = lazy(() => import("./Ticket/Add"));
const Management = lazy(() => import("./Ticket/Management"));
const MemberList = lazy(() => import("./Ticket/MemberList"));

const App = () => {
    return (
        <>
            <Provider store={store}>
                <Suspense fallback={<p>Loading...</p>}>
                    <Router>
                        <div>
                            <SuperNav />
                            <div className="main">
                                <Switch>
                                    <Route exact path={routes.LOGIN}>
                                        <Login />
                                    </Route>
                                    <Route
                                        path={routes.SIGNUP}
                                        component={SignUp}
                                    />
                                    <Route path={routes.DASHBOARD}>
                                        <Dashboard />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </Router>
                </Suspense>
            </Provider>
        </>
    );
};

export default App;

{
    /* <ProtectedRoute exact path={routes.DASHBOARD} component={Dashboard} />; */
}
