import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormInput } from "../Home/_Components";
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
                const {
                    Customer_Id,
                    uid: UID,
                    NID,
                    displayName,
                    customer_note,
                    customer_tag,
                    customer_type,
                    mail,
                    phone,
                    is_active,
                } = JSON.parse(localStorage.getItem("lineData"));
                userData.Customer_Id = Customer_Id || "";
                userData.name = displayName || "";
                userData.UID = UID || "";
                userData.NID = NID || "";
                userData.email = mail || "";
                userData.phone = phone || "";
                userData.customer_note = customer_note || "";
                userData.customer_tag = customer_tag || "";
                userData.customer_type = customer_type || "";
                userData.is_active = is_active || false;
                setUserData(userData);
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
        if (needValidMail) {
            if (newCus) {
            }
        }
    };

    if (payStatus) {
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
                            disabled={userData.NID || false || true}
                        />
                        <FormInput
                            Id="userName"
                            Type="text"
                            ClassName="input-label"
                            Title="姓名(必填)"
                            notice="*填寫真實姓名，以利現場工作人員查驗身份"
                            value={userData.name}
                            Handler={onNameChangeHandler}
                            disabled={userData.name || false || true}
                        />
                        <FormInput
                            Id="telNumber"
                            Type="tel"
                            ClassName="input-label"
                            Title="聯絡電話(必填)"
                            value={userData.phone}
                            Handler={onPhoneChangeHandler}
                            disabled={userData.phone || false || true}
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

                            <FormInput
                                Id="payment"
                                Type="radio"
                                ClassName=""
                                Title="線上付款(目前僅提供信用卡、金融卡付款)"
                                value="online"
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
