import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormInput } from "../Home/_Components";
import { selectTicket } from "../agent";
import Swal from "sweetalert2";
// Img
import cart_icon from "../../images/cart_icon.svg";
import Organizer_icon from "../../images/Organizer_icon.svg";
import checked_icon from "../../images/checked_icon.svg";
import vector_gray_Icon from "../../images/vector_gray_Icon.svg";
import check_Ticket from "../../images/check_Ticket.svg";
import qrcode from "../../images/qrcode.png";
import receip from "../../images/receip.svg";

const Information = () => {
    const [ticketId, setTicketId] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [activityData, setActivityData] = useState("");
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        phone: "",
        sex: "",
        payment: "",
    });
    const [payStatus, setPayStatus] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        let ticketId = "";
        let activityData = {};
        if (location.state !== undefined) {
            ticketId = location.state.ticketId;
            activityData = location.state.activityData;
            setTicketId(ticketId);
            setActivityData(activityData);

            if ("userData" in location.state) {
                setUserData(location.state.userData);
                setPayStatus(true);
            }
        }
        if (ticketId !== "") {
            const setupData = async () => {
                const Response = await selectTicket(ticketId);
                if (Response.status === 200) {
                    switch (Response.data.status) {
                        case 0:
                            console.log(Response.data.results[0]);
                            setTicketData(Response.data.results[0]);
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
                    console.log(Response);
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

    const submitHandler = (e) => {
        e.preventDefault();
        const { email, name, phone, sex, payment } = userData;
        if (
            email === "" ||
            name === "" ||
            phone === "" ||
            sex === "" ||
            payment === ""
        ) {
            Swal.fire({
                title: "資料請完整填寫",
                confirmButtonText: "確定",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
            return;
        }
        history.push({
            pathname: "/ticketInformation",
            state: {
                ticketId: ticketId,
                activityData: activityData,
                userData: userData,
            },
        });
        window.location.reload();
    };

    if (payStatus) {
        return (
            <>
                <div className="infomation">
                    <div id="success">
                        <img src={checked_icon} alt="" />
                        <p>購買完成！</p>
                    </div>
                    <div className="title">
                        <img src={vector_gray_Icon} alt="" />
                        我的票卷
                    </div>

                    <div className="ticket-head">
                        {activityData.title}
                        <font className="ticket-type">
                            {ticketData.ticket_Name}
                        </font>
                    </div>
                    <div className="ticket-qrcode">
                        <p>
                            <img src={check_Ticket} alt="" />
                            驗票 QR Code
                        </p>
                        <div className="qrcode">
                            <img src={qrcode} alt="" />
                            請使用此QR Code進場！
                        </div>
                    </div>
                    <div className="ticket-detail">
                        <p>
                            <img src={receip} alt="" />
                            票卷明細
                        </p>
                        <div className="detail-row">
                            購票人： {userData.name}{" "}
                            {userData.sex === "男" ? "先生" : "小姐"}
                        </div>
                        <div className="detail-row">
                            學校信箱： {userData.email}
                        </div>
                        <div className="detail-row">
                            聯絡電話： {userData.phone}
                        </div>
                        <div className="detail-row">
                            付款方式： {userData.payment}
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
    } else {
        return (
            <div className="infomation">
                <div className="title">
                    <img src={cart_icon} alt="" />
                    購票資訊
                </div>
                <div className="container">
                    <div className="ticket-name">
                        <p className="act-name">
                            {activityData.title}
                            <font className="ticket-type">
                                {ticketData.ticket_Name}
                            </font>
                        </p>
                        <p className="group-name">
                            <img src={Organizer_icon} alt="" />
                            主辦單位：{activityData.org_Name}
                        </p>
                    </div>
                    <form className="buy-form" onSubmit={submitHandler}>
                        <FormInput
                            Id="email"
                            Type="email"
                            ClassName="input-label"
                            Title="學校信箱(必填)"
                            value={activityData.email}
                            Handler={onEmailChangeHandler}
                        />

                        <FormInput
                            Id="userName"
                            Type="text"
                            ClassName="input-label"
                            Title="姓名(必填)"
                            value={activityData.name}
                            Handler={onNameChangeHandler}
                        />

                        <FormInput
                            Id="telNumber"
                            Type="tel"
                            ClassName="input-label"
                            Title="聯絡電話(必填)"
                            value={activityData.phone}
                            Handler={onPhoneChangeHandler}
                        />

                        <p>性別</p>
                        <div className="input-radio-group">
                            <FormInput
                                Id="sex"
                                Type="radio"
                                ClassName=""
                                Title="男"
                                value="male"
                                name="sex"
                                Handler={onSexChangeHandler}
                            />

                            <FormInput
                                Id="sex"
                                Type="radio"
                                ClassName=""
                                Title="女"
                                value="female"
                                name="sex"
                                Handler={onSexChangeHandler}
                            />
                        </div>

                        <p>付款方式(目前暫未開放金流，近期會新增)</p>
                        <div className="input-radio-group">
                            <FormInput
                                Id="payment"
                                Type="radio"
                                ClassName=""
                                Title="現金付款"
                                value="cash"
                                name="payment"
                                Handler={onPaymentChangeHandler}
                            />
                        </div>

                        <hr />

                        <div className="total-price">
                            總計金額
                            <p>{ticketData.price} 元</p>
                        </div>

                        <button className="buy-btn">確認購買</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default Information;
