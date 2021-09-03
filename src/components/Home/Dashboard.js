import React, { lazy } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import SubNav from "../Nav/SubNav";
import * as routes from "../Router";

const Edit = lazy(() => import("../Account/Edit"));
const Show = lazy(() => import("../Activity/Show"));
const Add = lazy(() => import("../Ticket/Add"));
const Management = lazy(() => import("../Ticket/Management"));
const MemberList = lazy(() => import("../Ticket/MemberList"));

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    return (
        <div className="main">
            <SubNav url={url} />
            <div className="content">
                <Switch>
                    <Route path={`${path}/:featureName`}>
                        <BackendFeatures />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

function BackendFeatures() {
    let { featureName } = useParams();

    switch (featureName) {
        case routes.SHOW:
            return <Show />;

        case routes.EDIT:
            return <Edit />;

        case routes.TICKET_ADD:
            return <Add />;

        case routes.TICKET_MANAGEMENT:
            return <Management />;

        case routes.TICKET_MEMBERLIST:
            return <MemberList />;

        default:
            return <h3>404</h3>;
    }
}

export default Dashboard;
