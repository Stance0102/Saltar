import React, { lazy } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import OnePage from "../Activity/OnePage";
import SubNav from "../Nav/SubNav";
import * as routes from "../Router";

const Edit = lazy(() => import("../Account/Edit"));
const Add = lazy(() => import("../Ticket/Add"));
const Management = lazy(() => import("../Ticket/Management"));
const MemberList = lazy(() => import("../Ticket/MemberList"));
const ErrorPage = lazy(() => import("../Home/ErrorPage"));

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    return (
        <>
            <SubNav url={url} />
            <div className="content">
                <Switch>
                    <Route path={`${path}/:featureName`}>
                        <BackendFeatures />
                    </Route>
                </Switch>
            </div>
        </>
    );
};

function BackendFeatures() {
    let { featureName } = useParams();

    switch (featureName) {
        case routes.EDIT:
            return <Edit />;

        case routes.TICKET_ADD:
            return <Add />;

        case routes.TICKET_MANAGEMENT:
            return <Management />;

        case routes.TICKET_MEMBERLIST:
            return <MemberList />;

        case routes.ONE_PAGE:
            return <OnePage />;

        default:
            return <ErrorPage />;
    }
}

export default Dashboard;
