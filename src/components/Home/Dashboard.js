import React, { lazy } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import SubNav from "../Nav/SubNav";
import * as routes from "../Router";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const Edit = lazy(() => import("../Account/Edit"));
const Add = lazy(() => import("../Ticket/Add"));
const Update = lazy(() => import("../Ticket/Update"));
const Management = lazy(() => import("../Ticket/Management"));
const MemberList = lazy(() => import("../Ticket/MemberList"));
const AddCustomer = lazy(() => import("../Activity/AddCustomer"));
const OnePage = lazy(() => import("../Activity/OnePage"));
const Analyze = lazy(() => import("../Activity/Analyze"));
const ManagementActivity = lazy(() => import("../Activity/ManagementActivity"));
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
                    <Route path={path}>
                        <Controler />
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

        case routes.TICKET_UPDATE:
            return <Update />;

        case routes.TICKET_MANAGEMENT:
            return <Management />;

        case routes.TICKET_MEMBERLIST:
            return <MemberList />;

        case routes.ONE_PAGE:
            return <OnePage edit={true} />;

        case routes.ADDCUSTOMER:
            return <AddCustomer />;

        case routes.ANALYZE:
            return <Analyze />;

        case routes.ACTIVITY_MANAGEMENT:
            return <ManagementActivity />;

        default:
            return <ErrorPage />;
    }
}

const Controler = () => {
    return (
        <div className="activity-box">
            <div className="activity-box-title">
                活動主控台
                <hr />
            </div>
            <div className="comeBackAnalyze">
                <p>近10場活動收入統計</p>
                <Line data={revenueData} className="chart" />
            </div>
            <div className="analyze-container">
                <div className="genderAnalyze">
                    <p>熱門活動排行</p>
                    <Bar data={rankingData} className="chart" />
                </div>
                <div className="ageAnalyze">
                    <p>各活動銷售佔比</p>
                    <Doughnut data={saleData} className="chart" />
                </div>
            </div>
        </div>
    );
};

const revenueData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
        {
            label: "近10場活動收入",
            data: [12, 10, 3, 5, 2, 3, 10, 32, 23, 10],

            fill: false,
            backgroundColor: "#ffb559",
            borderColor: "#ffb559",
            borderWidth: 4,
        },
    ],
};

const rankingData = {
    labels: ["傳說對決", "嘻哈之夜", "迎新之夜", "酷哥之夜"],
    datasets: [
        {
            indexAxis: "y",
            label: "關注度",
            data: [65, 59, 80, 81],
            fill: true,
            backgroundColor: ["#5cb4ff", "#ffb559", "#ff6a81", "#8cd790"],
            borderColor: ["#5cb4ff", "#ffb559", "#ff6a81", "#8cd790"],
            borderWidth: 3,
            borderRadius: 8,
            barPercentage: 0.1,
        },
    ],
};

const saleData = {
    labels: ["傳說對決", "嘻哈之夜", "迎新之夜", "酷哥之夜"],
    datasets: [
        {
            barPercentage: 0.1,
            data: [20, 10, 35, 35],
            backgroundColor: ["#5cb4ff", "#ffb559", "#ff6a81", "#8cd790"],
            hoverOffset: 12,
            display: false,
            position: "bottom",
        },
    ],
};

export default Dashboard;
