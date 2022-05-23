import React, { useEffect, useState } from "react";
import * as routes from "../Router";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectActivityByGroupId, getAllInOne } from "../agent";
// Img
import fiesta from "../../images/fiesta.PNG";
import calendar_icon from "../../images/calendar_icon.svg";

const ManagementActivity = () => {
    const { groupId } = useSelector((state) => state.Account);
    const [activities, setActivities] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const setupData = async () => {
            const response = await selectActivityByGroupId(groupId, "Activity");
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
                    let msg = activity.uploadStatus.show ? "" : "尚未新增節目";
                    msg += activity.uploadStatus.photos ? "" : " 尚未新增照片";
                    msg += activity.uploadStatus.tickets ? "" : " 尚未新增票種";

                    let msgStatus = false;

                    if (msg != "") {
                        msgStatus = true;
                    } else {
                        msgStatus = false;
                    }

                    return (
                        <div className="act-block">
                            <div className="img-box">
                                {activity.photos.length !== 0 ? (
                                    <img src={activity.photos[0]} />
                                ) : (
                                    <img src={fiesta} />
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
                            <font className="message">{msg}</font>
                            {/* 按鈕 */}
                            <div className="btn-group">
                                {!msgStatus && (
                                    <Link
                                        to={`${routes.ONEPAGE_PREVIEW}/${activity.Id}`}
                                        className="view-btn"
                                    >
                                        預覽
                                    </Link>
                                )}

                                {msgStatus && (
                                    <Link
                                        to=""
                                        className="view-btn disable-btn"
                                    >
                                        預覽
                                    </Link>
                                )}

                                <button
                                    className="edit-btn"
                                    onClick={(e) => {
                                        editHandler(e, index);
                                    }}
                                >
                                    編輯
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManagementActivity;
