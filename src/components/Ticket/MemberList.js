import React from "react";
import { Link } from "react-router-dom";
import garbage_can_Icon from "../../images/garbage_can_Icon.svg";

const MemberList = () => {
    return (
        <div>
            <div className="ticket-box">
                <div className="ticket-box-title">
                    <p>活動參加狀況</p>
                    <hr />
                </div>
                <div className="member-row-box">
                    <div className="row-box-title">
                        <h6>同學姓名</h6>
                        <h6>學校Email</h6>
                        <h6>手機號碼</h6>
                        <h6>票卷種類</h6>
                        <h6>票卷使用狀態</h6>
                    </div>
                    <Link to="/ticket/management/memberList">
                        <div className="row-container">
                            <h6 className="row-number">01</h6>
                            <div className="row-textbox">
                                <h6 className="row-text act-name">李慶毅</h6>
                                <h6 className="row-text">
                                    c107118102@nkust.edu.tw
                                </h6>
                                <h6 className="row-text">0925420706</h6>
                                <h6 className="row-text">外系票</h6>
                                <h6 className="row-text success">已使用</h6>
                                <div className="row-btn-group">
                                    <button className="delete">
                                        <img src={garbage_can_Icon} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/ticket/management/memberList">
                        <div className="row-container">
                            <h6 className="row-number">02</h6>
                            <div className="row-textbox">
                                <h6 className="row-text act-name">高瑋志</h6>
                                <h6 className="row-text">
                                    c107118102@nkust.edu.tw
                                </h6>
                                <h6 className="row-text">0925420706</h6>
                                <h6 className="row-text">非外系票</h6>
                                <h6 className="row-text fail">未使用</h6>
                                <div className="row-btn-group">
                                    <button className="delete">
                                        <img src={garbage_can_Icon} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MemberList;
