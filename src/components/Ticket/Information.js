import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormInput } from "../Home/_Components";
import { createTicketMember, selectTicket, sendCusValidMail } from "../agent";
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
    const [buyTicketId, setBuyTicketId] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [activityData, setActivityData] = useState("");
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        phone: "",
        NID: "",
        sex: "",
        payment: "",
    });
    const [payStatus, setPayStatus] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        let ticketId = "";
        let buyTicketId = "";
        let activityData = {};
        if (location.state !== undefined) {
            ticketId = location.state.ticketId;
            buyTicketId = location.state.buyTicketId;
            activityData = location.state.activityData;
            setTicketId(ticketId);
            setBuyTicketId(buyTicketId);
            setActivityData(activityData);

            if ("userData" in location.state) {
                setUserData(location.state.userData);
                setPayStatus(true);
            }
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
                    console.log(response);
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

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, name, phone, NID, sex, payment } = userData;
        if (
            email === "" ||
            name === "" ||
            phone === "" ||
            NID === "" ||
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
        const response = await createTicketMember(
            ticketId,
            name,
            phone,
            email,
            NID,
            sex == "male",
            true
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "驗證信箱",
                        text: "前往驗證信箱",
                        confirmButtonText: "繼續",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        history.push({
                            pathname: "/ticketInformation",
                            state: {
                                ticketId: ticketId,
                                buyTicketId: response.data.results.Id,
                                activityData: activityData,
                                userData: userData,
                            },
                        });
                        window.location.reload();
                    });
                    break;
                case 17:
                    Swal.fire({
                        title: "你已經買過這張票囉",
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ffb559",
                        icon: "info",
                    });
                    break;
                default:
                    console.log(response);
                    Swal.fire({
                        title: "發生不明錯誤",
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ffb559",
                        icon: "info",
                    });
                    break;
            }
        }
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        const mailResponse = await sendCusValidMail(
            userData.email,
            buyTicketId
        );
        if (mailResponse.status == 200) {
            switch (mailResponse.data.status) {
                case 0:
                    Swal.fire({
                        title: "發信成功",
                        text: "請去信箱點選驗證",
                        confirmButtonText: "繼續",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    });
                    break;
                default:
                    console.log(mailResponse);
                    break;
            }
        } else {
            console.log(mailResponse);
        }
    };

    if (payStatus) {
        return (
            <>
                <div className="infomation">
                    <div id="success">
                        <img src={checked_icon} alt="" />
                        <p>驗證信箱！</p>
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
                    {/* <div className="ticket-qrcode">
                        <p>
                            <img src={check_Ticket} alt="" />
                            驗票 QR Code
                        </p>
                        <div className="qrcode">
                            <img src={qrcode} alt="" />
                            請使用此QR Code進場！
                        </div>
                    </div> */}
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
                                ? "現金付款"
                                : "線上付款"}
                        </div>
                        <div className="line">
                            <hr />
                        </div>
                        <div className="total-price">
                            總計金額
                            <p>{ticketData.price}元</p>
                        </div>
                        <button className="buy-btn" onClick={sendEmail}>
                            發送信件
                        </button>
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
                            <br />
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
                            Title="學校信箱或個人信箱(必填)"
                            notice="*建議填寫學校信箱以享有學生專屬優惠！"
                            value={activityData.email}
                            Handler={onEmailChangeHandler}
                        />

                        <FormInput
                            Id="NID"
                            Type="text"
                            ClassName="input-label"
                            Title="身分證字號(必填)"
                            notice="*配合政府實聯制規定，填寫真實身份證字號，以利現場工作人員查驗身份"
                            value={activityData.NID}
                            Handler={onNIDChangeHandler}
                        />
                        <FormInput
                            Id="userName"
                            Type="text"
                            ClassName="input-label"
                            Title="姓名(必填)"
                            notice="*填寫真實姓名，以利現場工作人員查驗身份"
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

                        <p>付款方式</p>
                        <font className="notice">
                            目前暫未開放金流，近期將開放線上金流
                        </font>
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
