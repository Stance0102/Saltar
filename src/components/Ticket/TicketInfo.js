import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTicket, sendCusValidMail } from "../agent";
import Swal from "sweetalert2";
// Img
import vector_gray_Icon from "../../images/vector_gray_Icon.svg";
import receip from "../../images/receip.svg";

// 這是 payment 為 true 的 view

const TicketInfo = () => {
    const {
        Customer_Id,
        mail,
        actualname,
        phone,
        uid,
        NID,
        sex,
        payment,
        customer_note,
        customer_tag,
        customer_type,
        is_active,
    } = useSelector((state) => state.Customer);

    const [ticketId, setTicketId] = useState("");
    const [buyTicketId, setBuyTicketId] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [activityData, setActivityData] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [userData, setUserData] = useState({
        customer_Id: "",
        email: "",
        name: "",
        phone: "",
        UID: "",
        NID: "",
        sex: "",
        payment: "",
        customer_note: "",
        customer_tag: "",
        customer_type: "",
        is_active: false,
    });
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        let ticketId = "";
        let buyTicketId = "";
        let activityData = {};
        let userData = {};
        if (location.state !== undefined) {
            ticketId = location.state.ticketId;
            buyTicketId = location.state.buyTicketId;
            activityData = location.state.activityData;
            setImagePreview(activityData.imagePreview[0]);
            setTicketId(ticketId);
            setBuyTicketId(buyTicketId);
            setActivityData(activityData);

            if (uid !== "") {
                userData.Customer_Id = Customer_Id;
                userData.email = mail;
                userData.name = actualname;
                userData.phone = phone;
                userData.UID = uid;
                userData.NID = NID;
                userData.sex = sex;
                userData.payment = payment;
                userData.customer_note = customer_note;
                userData.customer_tag = customer_tag;
                userData.customer_type = customer_type;
                userData.is_active = is_active;

                setUserData(userData);
            } else {
                userData.Customer_Id = "";
                userData.email = "";
                userData.name = "";
                userData.phone = "";
                userData.UID = "";
                userData.NID = "";
                userData.sex = "";
                userData.payment = "";
                userData.customer_note = "";
                userData.customer_tag = "";
                userData.customer_type = "";
                userData.is_active = false;

                setUserData(userData);
            }

            console.log(userData);
        }

        if (ticketId !== "") {
            const setupData = async () => {
                const response = await selectTicket(ticketId);
                if (response.status === 200) {
                    switch (response.data.status) {
                        case 0:
                            setTicketData(response.data.results[0]);
                            break;
                        default:
                            Swal.fire({
                                title: "發生意外錯誤",
                                confirmButtonText: "離開",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                history.push({
                                    pathname: "/",
                                });
                            });
                            break;
                    }
                } else {
                    // console.log(response);
                }
            };
            setupData();
        }
    }, []);

    return (
        <>
            <div className="buy-ticket">
                <div className="title">
                    <img src={vector_gray_Icon} alt="" />
                    我的票卷
                </div>
                <div className="ticket-head">
                    {activityData.title}
                    <font className="ticket-type">
                        <font id="black-dot">●</font>
                        {ticketData.ticket_Name}
                    </font>
                </div>
                <div className="ticket-detail">
                    <p>
                        <img src={receip} alt="" />
                        票卷明細
                    </p>
                    <div className="detail-row">
                        購票人： {userData.name}{" "}
                        {userData.sex === "male" ? "先生" : "小姐"}
                    </div>
                    <div className="detail-row">
                        學校信箱： {userData.email}
                    </div>
                    <div className="detail-row">
                        聯絡電話： {userData.phone}
                    </div>
                    <div className="detail-row">
                        付款方式：{" "}
                        {userData.payment === "cash"
                            ? "現金付款(未付款)"
                            : "線上付款"}
                    </div>
                    <div className="line">
                        <hr />
                    </div>
                    <div className="total-price">
                        總計金額
                        <p>{ticketData.price}元</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketInfo;
