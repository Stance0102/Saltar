import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";
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
        const { token } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        if (location.pathname === "/custmerEmailCheck") {
            const setupData = async () => {
                if (token !== undefined) {
                    const response = await verifyValidMail(token);
                    switch (response.data.status) {
                        case 0:
                            setCheckStatus(true);
                            const sendResponse = await sendTicketMail(
                                response.data.results.joinedList_Id
                            );
                            switch (sendResponse.data.status) {
                                case 0:
                                    Swal.fire({
                                        title: "票券資料已經送至信箱!",
                                        confirmButtonText: "確認",
                                        confirmButtonColor: "#ffb559",
                                        icon: "success",
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
                        case 17:
                            Swal.fire({
                                title: "你已經買過票囉！",
                                confirmButtonText: "確認",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            });
                            break;
                        case 18:
                            Swal.fire({
                                title: "非常抱歉！你所購買的票券已經售完！",
                                confirmButtonText: "確認",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
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
