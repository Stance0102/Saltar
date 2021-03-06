import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as routes from "./Router";
import { ProtectedRoute } from "./Protected.route";
import SuperNav from "./Nav/SuperNav";
import "../styles/saltar.css";

const Index = lazy(() => import("./Home/Index"));
const LogIn = lazy(() => import("./Account/Login"));
const LineLogIn = lazy(() => import("./Account/LineLoginCallback"));
const SignUp = lazy(() => import("./Account/Signup"));
const Dashboard = lazy(() => import("./Home/Dashboard"));
const ErrorPage = lazy(() => import("./Home/ErrorPage"));

const BuyTicket = lazy(() => import("./Ticket/BuyTicket"));
const TicketInfo = lazy(() => import("./Ticket/TicketInfo"));
const PackageInvite = lazy(() => import("./Ticket/PackageInvite"));
const Payment = lazy(() => import("./Ticket/Payment"));
const CustomerTicket = lazy(() => import("./Ticket/CustomerTicket"));
const ForgetPw = lazy(() => import("./Account/ForgetPw"));
const ChangePw = lazy(() => import("./Account/ChangePw"));
const EmailCheck = lazy(() => import("./Account/EmailCheck"));
const LineEdit = lazy(() => import("./Account/LineEdit"));
const OnePage = lazy(() => import("./Activity/OnePage"));

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
                                <Route
                                    path={routes.LINE_EDIT}
                                    component={LineEdit}
                                />
                                <ProtectedRoute
                                    path={routes.DASHBOARD}
                                    component={Dashboard}
                                />
                                <Route
                                    path={routes.TICKET_BUYTICKET}
                                    component={BuyTicket}
                                />
                                <Route
                                    path={routes.TICKET_INFORMATION}
                                    component={TicketInfo}
                                />
                                <Route
                                    path={routes.PACKAGE_INVITE}
                                    component={PackageInvite}
                                />
                                <Route
                                    path={routes.PAYMENT}
                                    component={Payment}
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
