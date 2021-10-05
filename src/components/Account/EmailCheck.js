import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";
import { FormInput } from "../Home/_Components";
import { sendTicketMail, verifyValidMail } from "../agent";
import Swal from "sweetalert2";
// Img
import email from "../../images/email.svg";
import checked_icon from "../../images/checked_icon.svg";

const EmailCheck = () => {
    const [checkStatus, setCheckStatus] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const { id, token } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        if (location.pathname === "/custmerEmailCheck") {
            const setupData = async () => {
                if (id !== undefined && token !== undefined) {
                    const response = await verifyValidMail(token);
                    console.log(response);
                    if (response.status === 200) {
                        switch (response.data.status) {
                            case 0:
                                setCheckStatus(true);
                                const response = await sendTicketMail(id);
                                break;
                            case 9:
                                Swal.fire({
                                    title: "驗證失敗",
                                    confirmButtonText: "離開",
                                    confirmButtonColor: "#ffb559",
                                    icon: "error",
                                }).then(() => {
                                    history.push({
                                        pathname: "/",
                                    });
                                });
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
                }
            };
            setupData();
        }
    }, []);

    if (checkStatus) {
        return (
            <>
                <div className="index-img">
                    <img src={email} alt="" />
                </div>
                <div className="email-check">
                    <div className="letter">
                        <img src={checked_icon} alt="" />
                        <p className="email">信箱驗證成功！</p>
                    </div>
                </div>
                ;
            </>
        );
    } else {
        return (
            <>
                {/* <div className="index-img">
                    <img src={email} alt="" />
                </div>
                <div className="email-check">
                    <div className="letter">
                        <div className="bar">驗證電子信箱</div>
                        <div className="context">
                            就快完成了！ <br />
                            <br />
                            已將驗證訊息傳送到
                            <font className="email">bbbbb@gmail.com</font>
                            <br />
                            未收到電子郵件嗎？請按下重新傳送按鈕
                            <button className="resent-btn">重新傳送</button>
                        </div>
                    </div>
                </div>
                ; */}
            </>
        );
    }
};

export default EmailCheck;
