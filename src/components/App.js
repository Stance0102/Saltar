import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as routes from "./Router";
import { verifyToken } from "./agent";
import { ProtectedRoute } from "./Protected.route";
import "../styles/saltar.css";
import SuperNav from "./Nav/SuperNav";

const LogIn = lazy(() => import("./Account/Login"));
const SignUp = lazy(() => import("./Account/Signup"));
const Dashboard = lazy(() => import("./Home/Dashboard"));
const ErrorPage = lazy(() => import("./Home/ErrorPage"));

const Infomation = lazy(() => import("./Ticket/Infomation"));
const ForgetPw = lazy(() => import("./Account/ForgetPw"));
const ChangePw = lazy(() => import("./Account/ChangePw"));
const EmailCheck = lazy(() => import("./Account/EmailCheck"));

const App = () => {
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    if (token != null) {
        // const response = verifyToken(token);
    }
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
                                    path={routes.SIGNUP}
                                    component={SignUp}
                                />
                                <ProtectedRoute
                                    path={routes.DASHBOARD}
                                    component={Dashboard}
                                />
                                <Route
                                    path={routes.TICKET_INFOMATION}
                                    component={Infomation}
                                />
                                <Route
                                    path={routes.FORGETPW}
                                    component={ForgetPw}
                                />
                                <Route
                                    path={routes.CHANGEPW}
                                    component={ChangePw}
                                />

                                <Route
                                    path={routes.EMAILCHECK}
                                    component={EmailCheck}
                                />

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
    /*  */
}
