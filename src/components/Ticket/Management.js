import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectActivityByGroupId, selectTicketByActivityId } from "../agent";
import * as routes from "../Router";
import Swal from "sweetalert2";
// Img
import edit_Icon2 from "../../images/edit_Icon2.svg";

const Management = () => {
    const { groupId } = useSelector((state) => state.Account);
    const [activities, setActivities] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const setupData = async () => {
            const response = await selectActivityByGroupId(groupId, "Ticket");
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

    const getByteLen = (text) => {
        let len = 0;
        for (let i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) > 127 || text.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    };

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
            if (result.isConfirmed) {
                const { Id, endTime } = activities[index];
                history.push({
                    pathname: "/dashboard/ticketManagemenAdd",
                    state: { actId: Id, endTime: endTime.split(" ")[0] },
                });
            } else if (result.isDenied) {
                const { endTime } = activities[index];
                const tickets = activities[index].tickets.map((ticket) => {
                    let space = "";
                    const textLength =
                        getByteLen(ticket.ticket_Name) +
                        getByteLen(ticket.count.toString()) +
                        getByteLen(ticket.peopleMaxium.toString());
                    let spaceLength = 40;
                    if (window.innerWidth <= 768) spaceLength = 24;

                    for (let i = 0; i < spaceLength - textLength; i++) {
                        space += "&ensp;";
                    }

                    return `${ticket.ticket_Name}${space}${ticket.count}/${ticket.peopleMaxium}`;
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
                                tickets: {
                                    ...activities[index].tickets[result.value],
                                    act: activities[index].Id,
                                },
                                endTime: endTime.split(" ")[0],
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
                            to={{
                                pathname: `/dashboard/${routes.TICKET_MEMBERLIST}`,
                                query: { tickets: activity.tickets },
                            }}
                        >
                            <h6 className="row-number">{index + 1}</h6>
                            <div className="row-textbox">
                                <h6 className="row-text act-name">
                                    {activity.act_Name}
                                </h6>
                                <h6 className="row-text">
                                    {activity.joinCount}/{activity.peopleMax}人
                                </h6>

                                {activity.joinCount === activity.peopleMax ? (
                                    <h6 className="row-text success">達標</h6>
                                ) : (
                                    <h6 className="row-text fail">未達標</h6>
                                )}
                            </div>
                            <div className="row-btn-group">
                                <button
                                    className="ticket-btn"
                                    onClick={(e) => {
                                        ticketHandler(e, index);
                                    }}
                                >
                                    <img src={edit_Icon2} alt="" />
                                </button>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Management;
