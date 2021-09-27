import React from "react";
import * as routes from "../Router";
import { Link } from "react-router-dom";
// Img
import mikey from "../../images/mikey.png";
import mikey_v from "../../images/mikey_v.png";
import calendar_icon from "../../images/calendar_icon.svg";

const ManagementActivity = () => {
    return (
        <div className="activity-box">
            <div className="activity-box-title">
                <div className="btn-group">
                    <Link className="addOnePage" to={`${routes.ONE_PAGE}`}>
                        新增一頁式活動
                    </Link>
                </div>
                一頁式網站設定
                <hr />
            </div>

            <div className="onePageManagement">
                <div className="act-block">
                    <div className="img-box">
                        <img src={mikey} />
                    </div>
                    <font className="act-title">高科傳說對決生死賽</font>
                    <font className="act-date">
                        <img src={calendar_icon} />
                        2021/09/20 ~ 2021/09/20
                    </font>
                </div>

                <div className="act-block">
                    <div className="img-box">
                        <img src={mikey_v} />
                    </div>
                    <font className="act-title">高科傳說對決生死賽</font>
                    <font className="act-date">
                        <img src={calendar_icon} />
                        2021/09/20 ~ 2021/09/20
                    </font>
                </div>
            </div>
        </div>
    );
};

export default ManagementActivity;
