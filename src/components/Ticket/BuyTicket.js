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
import receip from "../../images/receip.svg";

const BuyTicket = () => {
    const [ticketId, setTicketId] = useState("");
    const [buyTicketId, setBuyTicketId] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [activityData, setActivityData] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [lineData, setLineData] = useState({});
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        phone: "",
        UID: "",
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
                setPayStatus(true);
            } else {
                console.log(JSON.parse(localStorage.getItem("lineData")));
                const {
                    Customer_Id,
                    uid: UID,
                    displayName,
                    mail,
                    phone,
                } = JSON.parse(localStorage.getItem("lineData"));
                userData.Customer_Id = Customer_Id || "";
                userData.name = displayName || "";
                userData.UID = UID || "";
                userData.email = mail || "";
                userData.phone = phone || "";
                setUserData(userData);
            }
        }
        // console.log(location.state);
        if (location.state.newCus || !location.state.newCus) {
            const sendEmail = async () => {
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
                        // console.log(mailResponse);
                    }
                } else {
                    // console.log(mailResponse);
                }
            };
            sendEmail();
        } else {
            // 這裡沒joinedList_Id不能發Ticket
            // const sendEmail = async () => {
            //     const mailResponse = await sendTicketMail(
            //         response.data.results.joinedList_Id
            //     );
            //     if (mailResponse.status == 200) {
            //         switch (mailResponse.data.status) {
            //             case 0:
            //                 break;
            //             default:
            //             // console.log(mailResponse);
            //         }
            //     } else {
            //         // console.log(mailResponse);
            //     }
            // };
            // sendEmail();
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

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, name, phone, UID, NID, sex, payment } = userData;
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
        const response = await createTicketMember(
            ticketId,
            name,
            phone,
            email,
            UID,
            NID,
            sex == "male",
            true
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "驗證信箱",
                        text: "飛奔前往驗證信箱！",
                        confirmButtonText: "繼續",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        let newCus = true;
                        if (userData.Customer_Id !== "") {
                            newCus = false;
                        }
                        history.push({
                            pathname: "/ticketInformation",
                            state: {
                                ticketId: ticketId,
                                buyTicketId: response.data.results.Id,
                                activityData: activityData,
                                userData: userData,
                                newCus: newCus,
                            },
                        });
                        window.location.reload();
                    });
                    break;
                case 17:
                    Swal.fire({
                        title: "酷喔～你已經買過這張票囉",
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ffb559",
                        icon: "info",
                    });
                    break;
                default:
                    // console.log(response);
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

    if (payStatus) {
        return (
            <>
                <div className="buy-ticket">
                    <div id="success">
                        <img src={checked_icon} alt="" />
                        <p>趕緊去驗證信箱！</p>
                    </div>
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
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="buy-ticket">
                <div className="title">
                    <img src={cart_icon} alt="" />
                    購票資訊
                </div>
                <div className="container">
                    <div className="ticket-title-box">
                        <img src={imagePreview} />

                        <div className="ticket-name">
                            <p className="act-name">
                                {activityData.title}
                                <font className="ticket-type">
                                    <font id="black-dot">●</font>
                                    {ticketData.ticket_Name}
                                </font>
                            </p>
                            <p className="group-name">
                                <img src={Organizer_icon} alt="" />
                                主辦單位：{activityData.org_Name}
                            </p>
                        </div>
                    </div>
                    <form className="buy-form" onSubmit={submitHandler}>
                        <FormInput
                            Id="email"
                            Type="email"
                            ClassName="input-label"
                            Title="學校信箱或個人信箱(必填)"
                            notice="*建議填寫學校信箱以享有學生專屬優惠！"
                            value={userData.email}
                            Handler={onEmailChangeHandler}
                            disabled={userData.Customer_Id || false || true}
                        />
                        <FormInput
                            Id="NID"
                            Type="text"
                            ClassName="input-label"
                            Title="身分證字號(必填)"
                            notice="*配合政府實名制規定，填寫真實身份證字號，以利現場工作人員查驗身份"
                            value={userData.NID}
                            Handler={onNIDChangeHandler}
                        />
                        <FormInput
                            Id="userName"
                            Type="text"
                            ClassName="input-label"
                            Title="姓名(必填)"
                            notice="*填寫真實姓名，以利現場工作人員查驗身份"
                            value={userData.name}
                            Handler={onNameChangeHandler}
                        />
                        <FormInput
                            Id="telNumber"
                            Type="tel"
                            ClassName="input-label"
                            Title="聯絡電話(必填)"
                            value={userData.phone}
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

export default BuyTicket;
