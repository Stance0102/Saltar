import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import {
    Switch,
    Route,
    BrowserRouter as Router,
    useParams,
} from "react-router-dom";
import * as routes from "./Router";
import { verifyToken } from "./agent";
import { ProtectedRoute } from "./Protected.route";
import "../styles/saltar.css";
import SuperNav from "./Nav/SuperNav";

const Index = lazy(() => import("./Home/Index"));
const LogIn = lazy(() => import("./Account/Login"));
const LineLogIn = lazy(() => import("./Account/LineLoginCallback"));
const SignUp = lazy(() => import("./Account/Signup"));
const Dashboard = lazy(() => import("./Home/Dashboard"));
const ErrorPage = lazy(() => import("./Home/ErrorPage"));

const Information = lazy(() => import("./Ticket/BuyTicket"));
const CustomerTicket = lazy(() => import("./Ticket/CustomerTicket"));
const ForgetPw = lazy(() => import("./Account/ForgetPw"));
const ChangePw = lazy(() => import("./Account/ChangePw"));
const EmailCheck = lazy(() => import("./Account/EmailCheck"));
const OnePage = lazy(() => import("./Activity/OnePage"));

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
                                    path={routes.INDEX}
                                    component={Index}
                                />
                                <Route
                                    exact
                                    path={routes.LOGIN}
                                    component={LogIn}
                                />
                                <Route
                                    path={routes.LINELOGIN}
                                    component={LineLogIn}
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
                                    path={routes.TICKET_INFORMATION}
                                    component={Information}
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
                                    path={routes.ORGANIZER_EMAILCHECK}
                                    component={EmailCheck}
                                />

                                <Route
                                    path={routes.CUSTMER_EMAILCHECK}
                                    component={EmailCheck}
                                />
                                <Route
                                    path={routes.TICKET_CUSTOMER}
                                    component={CustomerTicket}
                                />
                                <Route
                                    path={`${routes.ONEPAGE_PREVIEW}/:activityId`}
                                    render={(props) => (
                                        <OnePage
                                            edit={false}
                                            activityId={
                                                props.match.params.activityId
                                            }
                                        />
                                    )}
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
