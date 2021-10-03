import React, { useEffect, useState } from "react";
import * as routes from "../Router";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectActivityByGroupId, getAllInOne } from "../agent";
// Img
import mikey from "../../images/mikey.png";
import mikey_v from "../../images/mikey_v.png";
import calendar_icon from "../../images/calendar_icon.svg";

const ManagementActivity = () => {
    const { groupId } = useSelector((state) => state.Account);
    const [activities, setActivities] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const setupData = async () => {
            const response = await selectActivityByGroupId(groupId);
            if (response.status == 200) {
                switch (response.data.status) {
                    case 0:
                        setActivities(response.data.results);
                        break;
                }
            }
        };

        setupData();
    }, []);

    const editHandler = (e, index) => {
        e.preventDefault();
        history.push({
            pathname: "/dashboard/onePageEdit",
            state: { activityId: activities[index].Id },
        });
    };
    const previewHandler = (e, index) => {
        e.preventDefault();
        history.push({
            pathname: "/dashboard/onePage",
            state: { activityId: activities[index].Id },
        });
    };
    return (
        <div className="activity-box">
            <div className="activity-box-title">
                <div className="btn-group">
                    <Link
                        className="addOnePage"
                        to={`${routes.ONE_PAGE_CREATE}`}
                    >
                        新增一頁式活動
                    </Link>
                </div>
                一頁式網站設定
                <hr />
            </div>
            <div className="onePageManagement">
                {activities.map((activity, index) => {
                    console.log(activity);
                    let msg = activity.uploadStauts.show ? "" : " 尚未新增節目";
                    msg += activity.uploadStauts.photos ? "" : " 尚未新增照票";
                    msg += activity.uploadStauts.tickets ? "" : " 尚未新增票種";
                    return (
                        <div className="act-block">
                            <div className="img-box">
                                {activity.photos !== undefined ? (
                                    <img src={activity.photos[0].url} />
                                ) : (
                                    <img src={mikey} />
                                )}
                            </div>
                            <font className="act-title">
                                {activity.act_Name}
                            </font>
                            <font className="act-date">
                                <img src={calendar_icon} />
                                {activity.startTime.split(" ")[0]} ~{" "}
                                {activity.endTime.split(" ")[0]}
                            </font>
                            {/* 提示訊息 */}
                            <font className="act-date">{msg}</font>
                            {/* 按鈕 */}
                            <button
                                className="ticket-btn"
                                onClick={(e) => {
                                    editHandler(e, index);
                                }}
                            >
                                編輯
                            </button>
                            <button
                                className="ticket-btn"
                                onClick={(e) => {
                                    previewHandler(e, index);
                                }}
                            >
                                預覽
                            </button>

                            {/* 網址 */}
                            <a href={"/onePageEvent/" + activity.Id}>
                                onePageEvent/{activity.Id}
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManagementActivity;
