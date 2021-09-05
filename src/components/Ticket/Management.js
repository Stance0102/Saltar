import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../Router";
// Img
import editorIcon from "../../images/editorIcon.svg";

const Management = () => {
    return (
        <div className="ticket-box">
            <div className="ticket-box-title">
                <p>票卷管理</p>
                <hr />
            </div>
            <div className="management-row-box">
                <div className="row-box-title">
                    <h6>活動名稱</h6>
                    <h6>目前報名人數/目標人數</h6>
                    <h6>販售狀態</h6>
                </div>
                <Link to={`/dashboard/${routes.TICKET_MEMBERLIST}`}>
                    <div className="row-container">
                        <h6 className="row-number">01</h6>
                        <div className="row-textbox">
                            <h6 className="row-text act-name">
                                高科傳說對決生死賽
                            </h6>
                            <h6 className="row-text">200/200人</h6>
                            <h6 className="row-text success">達標</h6>
                        </div>
                    </div>
                </Link>
                <div className="row-container">
                    <h6 className="row-number">02</h6>
                    <div className="row-textbox">
                        <h6 className="row-text act-name">
                            高科傳說對決生死賽
                        </h6>
                        <h6 className="row-text">197/200人</h6>
                        <h6 className="row-text fail">未達標</h6>
                        <div className="row-btn-group"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Management;
