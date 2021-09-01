import React from "react";
import SubNav from "../Nav/SubNav";

const Dashboard = () => {
    return (
        <>
            <h1>Dashboard</h1>

            <div className="main">
                <SubNav />
                <div className="content"></div>
            </div>
        </>
    );
};

export default Dashboard;
