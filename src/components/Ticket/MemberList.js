import React from "react";
import { Link } from "react-router-dom";
import garbage_can_Icon from "../../images/garbage_can_Icon.svg";
import tick_Icon from "../../images/tick_Icon.svg";

const MemberList = () => {
    return (
        <>
            <div className="ticket-box">
                <div className="ticket-box-title">
                    <p>活動參加狀況</p>
                    <hr />
                </div>
                <div className="member-row-box">
                    <div className="row-box-title">
                        <h6>同學姓名</h6>
                        <h6>手機號碼</h6>
                        <h6>票卷種類</h6>
                        <h6>票卷使用狀態</h6>
                    </div>
                    <div className="row-container">
                        <h6 className="row-number">01</h6>
                        <div className="row-textbox">
                            <h6 className="row-text act-name">李慶毅</h6>
                            <h6 className="row-text">0925420706</h6>
                            <h6 className="row-text">外系票</h6>
                            <h6 className="row-text success">已使用</h6>
                            <div className="row-btn-group">
                                <button className="check">
                                    <img src={tick_Icon} alt="" />
                                </button>
                                <button className="delete">
                                    <img src={garbage_can_Icon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row-container">
                        <h6 className="row-number">02</h6>
                        <div className="row-textbox">
                            <h6 className="row-text">李慶毅</h6>
                            <h6 className="row-text">0925420706</h6>
                            <h6 className="row-text">非外系票</h6>
                            <h6 className="row-text fail">未使用</h6>
                            <div className="row-btn-group">
                                <button className="check">
                                    <img src={tick_Icon} alt="" />
                                </button>
                                <button className="delete">
                                    <img src={garbage_can_Icon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberList;
