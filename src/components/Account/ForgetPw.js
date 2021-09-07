import React from "react";
import { FormInput } from "../Home/_Components";
// Img
import forget_password from "../../images/forget_password.svg";

const ForgetPw = () => {
    return (
        <>
            <div className="index-img">
                <img src={forget_password} alt="" />
            </div>
            <div className="auth">
                <p className="auth-title">忘記密碼</p>
                <form className="auth-form">
                    <FormInput
                        Id="email"
                        ClassName="auth-label"
                        Type="email"
                        Title="帳號 (Email)"
                    />

                    <button className="auth-submit" type="submit">
                        確認送出
                    </button>
                </form>
            </div>
            ;
        </>
    );
};

export default ForgetPw;
