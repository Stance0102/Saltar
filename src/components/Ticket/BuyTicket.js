import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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
import LineLogin from "../Account/LineLogin";

const BuyTicket = () => {
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
    const [userData, setUserData] = useState({});

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
                if (Customer_Id == null) {
                    Swal.fire({
                        title: "請先註冊",
                        confirmButtonText: "前往註冊帳號",
                        confirmButtonColor: "#ffb559",
                        icon: "info",
                    }).then(() => {
                        history.push("/lineEdit");
                    });
                }
                userData.Customer_Id = Customer_Id;
                userData.mail = mail;
                userData.actualname = actualname;
                userData.phone = phone;
                userData.uid = uid;
                userData.NID = NID;
                userData.sex = sex;
                userData.payment = "online";
                userData.customer_note = customer_note;
                userData.customer_tag = customer_tag;
                userData.customer_type = customer_type;
                userData.is_active = is_active;

                setUserData(userData);
            } else {
                LineLogin();
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
                }
            };
            setupData();
        }

        const ECPayFormEle = document.getElementById("data_set");
        if (ECPayFormEle) {
            ECPayFormEle.submit();
        }
    }, []);

    const onUserDataEdit = (e) => {
        e.preventDefault();
        history.push({
            pathname: "/lineEdit",
        });
    };

    const onEmailChangeHandler = (e) => {
        setUserData({
            ...userData,
            mail: e.target.value,
        });
    };

    const onNameChangeHandler = (e) => {
        setUserData({
            ...userData,
            actualname: e.target.value,
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
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const {
            Customer_Id,
            mail,
            actualname,
            phone,
            uid,
            NID,
            customer_type,
            customer_tag,
            customer_note,
            sex,
            payment,
        } = userData;
        if (
            mail === "" ||
            actualname === "" ||
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
        if (userData.Customer_Id !== null) {
            newCus = false;
            if (userData.is_active === true) {
                needValidMail = false;
            }
        }
        if (newCus) {
            const response = await createCustomerWithBuyTicket(
                actualname,
                phone,
                mail,
                uid,
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
            if (needValidMail) {
                sendValid(Customer_Id);
            } else {
                const CreateResponse = await createTicketMember(
                    Customer_Id,
                    ticketId,
                    payment
                );
                switch (CreateResponse.data.status) {
                    case 0:
                        const mailResponse = await sendTicketMail(
                            CreateResponse.data.results.Id
                        );
                        if (!ticketData.is_package) {
                            if (payment == "online") {
                                Swal.fire({
                                    title: "購買完成",
                                    text: "請先完成付款",
                                    confirmButtonText: "前往付款",
                                    confirmButtonColor: "#ffb559",
                                    icon: "info",
                                }).then(() => {
                                    history.push({
                                        pathname: `/payment`,
                                        state: {
                                            joinedListId:
                                                CreateResponse.data.results.Id,
                                            userData: userData,
                                            ticketData: ticketData,
                                            activityData: activityData,
                                        },
                                    });
                                });
                                break;
                            }
                        }

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
                                                CreateResponse.data.results.Id,
                                            activityData: activityData,
                                            userData: userData,
                                            sendEmail: true,
                                        },
                                    });
                                });
                                break;
                        }
                        break;
                    case 1:
                        Swal.fire({
                            title: "非常抱歉！這張票已經售完囉",
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ffb559",
                            icon: "info",
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
            }
        }
    };

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

                <button className="edit-btn" onClick={onUserDataEdit}>
                    修改個人資料
                </button>

                <form className="buy-form" onSubmit={submitHandler}>
                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="學校信箱或個人信箱(必填)"
                        notice="*建議填寫學校信箱以享有學生專屬優惠！"
                        value={userData.mail}
                        Handler={onEmailChangeHandler}
                        disabled={true}
                    />
                    <FormInput
                        Id="NID"
                        Type="text"
                        ClassName="input-label"
                        Title="身分證字號(必填)"
                        notice="*配合政府實名制規定，填寫真實身份證字號，以利現場工作人員查驗身份"
                        value={userData.NID}
                        Handler={onNIDChangeHandler}
                        disabled={true}
                    />
                    <FormInput
                        Id="userName"
                        Type="text"
                        ClassName="input-label"
                        Title="姓名(必填)"
                        notice="*填寫真實姓名，以利現場工作人員查驗身份"
                        value={userData.actualname}
                        Handler={onNameChangeHandler}
                        disabled={true}
                    />
                    <FormInput
                        Id="telNumber"
                        Type="tel"
                        ClassName="input-label"
                        Title="聯絡電話(必填)"
                        value={userData.phone}
                        Handler={onPhoneChangeHandler}
                        disabled={true}
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
                            checked={userData.sex}
                        />

                        <FormInput
                            Id="sex"
                            Type="radio"
                            ClassName=""
                            Title="女"
                            value="female"
                            name="sex"
                            Handler={onSexChangeHandler}
                            checked={!userData.sex}
                        />
                    </div>
                    <p>付款方式</p>
                    <div className="input-radio-group">
                        {/* <FormInput
                            Id="payment"
                            Type="radio"
                            ClassName=""
                            Title="現金付款"
                            value="cash"
                            name="payment"
                            Handler={onPaymentChangeHandler}
                        /> */}

                        <FormInput
                            Id="payment"
                            Type="radio"
                            ClassName=""
                            Title="線上付款(目前僅提供信用卡、金融卡付款)"
                            value="online"
                            name="payment"
                            checked
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
};

export default BuyTicket;
