import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";
import { selectCustomerTicket } from "../agent";
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
    const [activityData, setActivityData] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [userData, setUserData] = useState({
        actualname: "",
        mail: "",
        phone: "",
        NID: "",
        sex: true,
        is_active: false,
    });
    const [QRcode, setQRcode] = useState("");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const { id } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        if (id !== undefined) {
            const setupData = async () => {
                const response = await selectCustomerTicket(id);
                console.log(response);
                if (response.status === 200) {
                    switch (response.data.status) {
                        case 0:
                            setActivityData(response.data.results.act);
                            setTicketData(response.data.results.ticket);
                            setUserData(response.data.results.joined);
                            setQRcode(response.data.results.QRcode);
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

    return (
        <>
            <div className="infomation">
                <div id="success">
                    <img src={checked_icon} alt="" />
                    <p>驗證成功！</p>
                </div>
                <div className="title">
                    <img src={vector_gray_Icon} alt="" />
                    我的票卷
                </div>

                <div className="ticket-head">
                    {activityData.act_Name}
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
                        <img src={`data:image/jpeg;base64,${QRcode}`} />
                        請使用此QR Code進場！
                    </div>
                </div>
                <div className="ticket-detail">
                    <p>
                        <img src={receip} alt="" />
                        票卷明細
                    </p>
                    <div className="detail-row">
                        購票人： {userData.actualname}{" "}
                        {userData.sex === "male" ? "先生" : "小姐"}
                    </div>
                    <div className="detail-row">學校信箱： {userData.mail}</div>
                    <div className="detail-row">
                        聯絡電話： {userData.phone}
                    </div>
                    {/* <div className="detail-row">
                        付款方式：{" "}
                        {userData.payment === "cash" ? "現金付款" : "線上付款"}
                    </div> */}
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

export default Information;
