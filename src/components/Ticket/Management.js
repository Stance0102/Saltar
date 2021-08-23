import React from "react";
import { Link, Route } from "react-router-dom";
import Infomation from "./Infomation";

const Management = () => {
    return (
        <div className="ticket-box">
            <div className="ticket-box-title">
                <p>票卷管理</p>
                <hr />
            </div>
            <div className="ticket-all">
                <div className="ticket-title">
                    <h6>活動名稱</h6>
                    <h6>目前報名人數/目標人數</h6>
                    <h6>販售狀態</h6>
                </div>
                <Link to="/ticket/management/infomation">
                    <div className="ticket-row">
                        <h6 className="number">01</h6>
                        <div className="ticket-main">
                            <h6 className="ticket-text act-name">
                                高科傳說對決生死賽
                            </h6>
                            <h6 className="ticket-text">200/200人</h6>
                            <h6 className="ticket-text success">達標</h6>
                        </div>
                    </div>
                </Link>
                <div className="ticket-row">
                    <h6 className="number">02</h6>
                    <div className="ticket-main">
                        <h6 className="ticket-text act-name">
                            高科傳說對決生死賽
                        </h6>
                        <h6 className="ticket-text">197/200人</h6>
                        <h6 className="ticket-text fail">尚未達標</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Management;
