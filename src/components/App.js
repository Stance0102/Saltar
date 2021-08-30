import React, {
    useContext,
    createContext,
    useState,
    Suspense,
    lazy,
} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as routes from "./Router";
import SuperNav from "./Nav/SuperNav";
import SubNav from "./Nav/SubNav";

const LogIn = lazy(() => import("./Account/Login"));
const SignIn = lazy(() => import("./Account/SignIn"));
const Dashboard = lazy(() => import("./Home/Dashboard"));

const App = () => {
    return (
        <>
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Route path={routes.LOGIN} component={LogIn} />
                    <Route path={routes.SIGNIN} component={SignIn} />
                    <Route path={routes.DASHBOARD} component={Dashboard} />
                </Suspense>
            </Router>
        </>
    );
};

export default App;

{
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
}
