import React, { useState } from "react";
import { FormInput } from "../Home/_Components";
// Img
import email from "../../images/email.svg";
import checked_icon from "../../images/checked_icon.svg";

const EmailCheck = () => {
    const [checkStatus, setCheckStaus] = useState(false);

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
                <div className="index-img">
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
                ;
            </>
        );
    }
};

export default EmailCheck;
