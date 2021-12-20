import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    createTicketMember,
    selectTicket,
    sendCusValidMail,
    sendTicketMail,
    createCustomerWithBuyTicket,
    updateCustomer,
} from "../agent";
import Swal from "sweetalert2";
// Img
import vector_gray_Icon from "../../images/vector_gray_Icon.svg";
import receip from "../../images/receip.svg";
import { useSelector } from "react-redux";

const TicketInfo = () => {
    const [ticketId, setTicketId] = useState("");
    const [buyTicketId, setBuyTicketId] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [activityData, setActivityData] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        phone: "",
        UID: "",
        NID: "",
        sex: "",
        payment: "",
    });
    const location = useLocation();
    const history = useHistory();
    const customerData = useSelector((state) => state.Customer);

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

            if ("userData" in location.state) {
                userData = location.state.userData;
                setUserData(userData);
            } else {
                userData = customerData;
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

    const onEmailChangeHandler = (e) => {
        setUserData({
            ...userData,
            email: e.target.value,
        });
    };

    const onNameChangeHandler = (e) => {
        setUserData({
            ...userData,
            name: e.target.value,
        });
    };

    const onPhoneChangeHandler = (e) => {
        setUserData({
            ...userData,
            phone: e.target.value,
        });
    };
    const onNIDChangeHandler = (e) => {
        setUserData({
            ...userData,
            NID: e.target.value,
        });
    };

    const onSexChangeHandler = (e) => {
        setUserData({
            ...userData,
            sex: e.target.value,
        });
    };

    const onPaymentChangeHandler = (e) => {
        setUserData({
            ...userData,
            payment: e.target.value,
        });
    };

    const sendValid = async (Customer_Id) => {
        const mailResponse = await sendCusValidMail(ticketId, Customer_Id);
        switch (mailResponse.data.status) {
            case 0:
                Swal.fire({
                    title: "驗證帳號",
                    text: "請去信箱點選驗證，完成購買",
                    confirmButtonText: "繼續",
                    confirmButtonColor: "#ffb559",
                    icon: "success",
                }).then(() => {
                    history.push({
                        pathname: "/",
                    });
                });
                break;
            default:
            // console.log(mailResponse);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const {
            Customer_Id,
            email,
            name,
            phone,
            UID,
            NID,
            customer_type,
            customer_tag,
            customer_note,
            sex,
            payment,
        } = userData;
        if (
            email === "" ||
            name === "" ||
            phone === "" ||
            NID === "" ||
            sex === undefined ||
            payment === undefined
        ) {
            Swal.fire({
                title: "資料請完整填寫",
                confirmButtonText: "確定",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
            return;
        }

        let newCus = true;
        let needValidMail = true;
        if (userData.Customer_Id !== "NULL") {
            newCus = false;
            if (userData.is_active === true) {
                needValidMail = false;
            }
        }
        if (newCus) {
            const response = await createCustomerWithBuyTicket(
                name,
                phone,
                email,
                UID,
                NID,
                sex == "male"
            );
            switch (response.data.status) {
                case 0:
                    sendValid(response.data.results.Id);
                    break;
                default:
                    break;
            }
        } else {
            const updateResponse = await updateCustomer(
                Customer_Id,
                name,
                phone,
                email,
                customer_type,
                customer_tag,
                customer_note,
                NID,
                UID,
                sex == "male"
            );
            console.log(updateResponse.data.status);
            switch (updateResponse.data.status) {
                case 0:
                    if (needValidMail) {
                        sendValid(Customer_Id);
                    } else {
                        const CreateResponse = await createTicketMember(
                            Customer_Id,
                            ticketId
                        );
                        switch (CreateResponse.data.status) {
                            case 0:
                                const mailResponse = await sendTicketMail(
                                    CreateResponse.data.results.Id
                                );
                                switch (mailResponse.data.status) {
                                    case 0:
                                        Swal.fire({
                                            title: "購票成功",
                                            text: "飛奔前往信箱！",
                                            confirmButtonText: "繼續",
                                            confirmButtonColor: "#ffb559",
                                            icon: "success",
                                        }).then(() => {
                                            history.push({
                                                pathname: "/ticketInformation",
                                                state: {
                                                    ticketId: ticketId,
                                                    buyTicketId:
                                                        CreateResponse.data
                                                            .results.Id,
                                                    activityData: activityData,
                                                    userData: userData,
                                                },
                                            });
                                            window.location.reload();
                                        });
                                        break;
                                }
                                break;
                            case 17:
                                Swal.fire({
                                    title: "酷喔～你已經買過這張票囉",
                                    confirmButtonText: "確定",
                                    confirmButtonColor: "#ffb559",
                                    icon: "info",
                                });
                                break;
                            case 18:
                                Swal.fire({
                                    title: "非常抱歉！這張票已經售完囉",
                                    confirmButtonText: "確定",
                                    confirmButtonColor: "#ffb559",
                                    icon: "info",
                                });
                                break;
                            default:
                                Swal.fire({
                                    title: "發生不明錯誤",
                                    confirmButtonText: "確定",
                                    confirmButtonColor: "#ffb559",
                                    icon: "info",
                                });
                                break;
                        }
                        break;
                    }

                default:
                    break;
            }
        }
    };

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
                        {userData.payment === "cash" ? "現金付款" : "線上付款"}
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
