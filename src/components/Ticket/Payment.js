import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormInput } from "../Home/_Components";
import { genECPayOrder } from "../agent";
import qs from "qs";
import Swal from "sweetalert2";

const Payment = () => {
    const location = useLocation();
    const history = useHistory();
    const [ecPayForm, setECPayForm] = useState("");
    const [info, setInfo] = useState("");
    const [joinedListId, setJoinedListId] = useState("");
    const [activityData, setActivityData] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const setupData = () => {
            if (location.state !== undefined) {
                setUserData(location.state.userData);
                setTicketData(location.state.ticketData);
                setActivityData(location.state.activityData);
                setJoinedListId(location.state.joinedListId);
            } else {
                const { info } = qs.parse(location.search, {
                    ignoreQueryPrefix: true,
                });
                setInfo(info);
            }
        };
        setupData();
    }, []);

    const onUserDataEdit = (e) => {
        e.preventDefault();
        history.push({
            pathname: "/lineEdit",
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        let ecpayResponse = {};
        if (info == "") {
            ecpayResponse = await genECPayOrder(joinedListId);
        } else {
            // ecpayResponse = await genECPayOrder(joinedListId);
        }

        switch (ecpayResponse.data.status) {
            case 0:
                setECPayForm(ecpayResponse.data.msg);
                document.forms["data_set"].submit();
                break;
            case 19:
                Swal.fire({
                    title: "查無訂單",
                    text: "請聯絡Saltar客服或活動主辦方！",
                    confirmButtonText: "繼續",
                    confirmButtonColor: "#ffb559",
                    icon: "success",
                });
                break;
        }
    };

    return (
        <div className="payment">
            　
            <div className="container">
                <form className="payment-form" onSubmit={submitHandler}>
                    <div className="payment-price">
                        <div className="activity-box">
                            <div className="activity-name">
                                {activityData.act_Name}
                            </div>
                            <div className="ticket-name">
                                {ticketData.ticket_Name}
                            </div>
                        </div>
                        <div className="total-box">
                            <div className="total-price">
                                {ticketData.price} 元
                            </div>
                        </div>
                    </div>
                    <hr />
                    <button className="edit-btn" onClick={onUserDataEdit}>
                        修改個人資料
                    </button>
                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="學校信箱或個人信箱"
                        value={userData.mail}
                        disabled={true}
                    />
                    <FormInput
                        Id="NID"
                        Type="text"
                        ClassName="input-label"
                        Title="身分證字號"
                        value={userData.NID}
                        disabled={true}
                    />
                    <FormInput
                        Id="userName"
                        Type="text"
                        ClassName="input-label"
                        Title="姓名"
                        value={userData.actualname}
                        disabled={true}
                    />
                    <FormInput
                        Id="telNumber"
                        Type="text"
                        ClassName="input-label"
                        Title="聯絡電話"
                        value={userData.phone}
                        disabled={true}
                    />
                    <FormInput
                        Id="sex"
                        Type="text"
                        ClassName="input-label"
                        Title="性別"
                        value={userData.sex ? "男" : "女"}
                        disabled={true}
                    />
                    <hr />

                    <button className="buy-btn">結帳</button>
                </form>
            </div>
            <div dangerouslySetInnerHTML={{ __html: ecPayForm }}></div>
        </div>
    );
};

export default Payment;
