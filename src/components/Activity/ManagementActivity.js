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
                        const Activities = [];
                        console.log(response.data.results);
                        for (let i = 0; i < response.data.results.length; i++) {
                            const activity = response.data.results[i];
                            const allInOneResponse = await getAllInOne(
                                activity.Id
                            );
                            activity.msg = allInOneResponse.data.msg;
                            if (allInOneResponse.data.status === 0) {
                                activity.tickets =
                                    allInOneResponse.data.results.tickets;
                                activity.shows =
                                    allInOneResponse.data.results.show;
                                activity.photos =
                                    allInOneResponse.data.results.photos;
                            }
                            Activities.push(activity);
                        }
                        setActivities(Activities);
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
                    <Link className="addOnePage" to={`${routes.ONE_PAGE}`}>
                        新增一頁式活動
                    </Link>
                </div>
                一頁式網站設定
                <hr />
            </div>
            <div className="onePageManagement">
                {activities.map((activity, index) => {
                    console.log(activity);
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
                            {activity.msg !== "ok" ? (
                                <font className="act-date">{activity.msg}</font>
                            ) : (
                                <font />
                            )}
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
                            <a href={"/onePageEvnet/" + activity.Id}>
                                onePageEvnet/{activity.Id}
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManagementActivity;
