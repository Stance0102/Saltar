import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectActivityByGroupId, selectTicketByActivityId } from "../agent";
import * as routes from "../Router";
import Swal from "sweetalert2";
// Img
import editorIcon from "../../images/editorIcon.svg";

const Management = () => {
    const { groupId } = useSelector((state) => state.Account);
    const [activities, setActivities] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const setupData = async () => {
            const response = await SelectActivityByGroupId(groupId);
            if (response.status == 200) {
                switch (response.data.status) {
                    case 0:
                        const Activities = [];
                        for (let i = 0; i < response.data.results.length; i++) {
                            const activity = response.data.results[i];
                            const res = await selectTicketByActivityId(
                                activity.Id
                            );
                            activity.tickets = res.data.results;
                            Activities.push(activity);
                        }
                        setActivities(Activities);
                        break;
                }
            }
        };

        setupData();
    }, []);

    const ticketHandler = (e, index) => {
        e.preventDefault();
        Swal.fire({
            title: "請選擇要新增票券或編輯票券！",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "新增票券",
            confirmButtonColor: "#ffb559",
            denyButtonText: "編輯票券",
            denyButtonColor: "#4ca46f",
            cancelButtonText: "取消",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { Id, endTime } = activities[index];
                history.push({
                    pathname: "/dashboard/ticketManagemenAdd",
                    state: { actId: Id, endTime: endTime.split("T")[0] },
                });
            } else if (result.isDenied) {
                const { endTime } = activities[index];
                const tickets = activities[index].tickets.map((ticket) => {
                    return ticket.ticket_Name;
                });
                Swal.fire({
                    title: "修改票券",
                    input: "select",
                    inputOptions: tickets,
                    confirmButtonText: "繼續",
                    confirmButtonColor: "#ffb559",
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                            if (value !== "") {
                                resolve();
                            } else {
                                Swal.close();
                            }
                        });
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push({
                            pathname: "/dashboard/ticketManagemenUpdate",
                            state: {
                                tickets:
                                    activities[index].tickets[result.value],
                                endTime: endTime.split("T")[0],
                            },
                        });
                    }
                });
            }
        });
    };

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
                {activities.map((activity, index) => {
                    return (
                        <Link
                            className="row-container"
                            to={`/dashboard/${routes.TICKET_MEMBERLIST}`}
                            params={{ activity: activity }}
                        >
                            <h6 className="row-number">{index + 1}</h6>
                            <div className="row-textbox">
                                <h6 className="row-text act-name">
                                    {activity.act_Name}
                                </h6>
                                <h6 className="row-text">200/200人</h6>
                                <h6 className="row-text success">達標</h6>
                            </div>

                            <button
                                onClick={(e) => {
                                    ticketHandler(e, index);
                                }}
                            >
                                票券
                            </button>
                        </Link>
                    );
                })}

                {/* <Link
                    className="row-container"
                    to={`/dashboard/${routes.TICKET_MEMBERLIST}`}
                >
                    <h6 className="row-number">01</h6>
                    <div className="row-textbox">
                        <h6 className="row-text act-name">
                            高科傳說對決生死賽
                        </h6>
                        <h6 className="row-text">200/200人</h6>
                        <h6 className="row-text success">達標</h6>
                    </div>
                </Link>
                <Link
                    className="row-container"
                    to={`/dashboard/${routes.TICKET_MEMBERLIST}`}
                >
                    <h6 className="row-number">02</h6>
                    <div className="row-textbox">
                        <h6 className="row-text act-name">
                            高科傳說對決生死賽
                        </h6>
                        <h6 className="row-text">200/200人</h6>
                        <h6 className="row-text fail">未達標</h6>
                    </div>
                </Link> */}
            </div>
        </div>
    );
};

export default Management;
