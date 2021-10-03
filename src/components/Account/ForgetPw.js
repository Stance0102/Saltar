import React, { useState } from "react";
import { FormInput } from "../Home/_Components";
// Img
import forget_password from "../../images/forget_password.svg";

const ForgetPw = () => {
    const [email, setEmail] = useState("");

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <div className="index-img">
                <img src={forget_password} alt="" />
            </div>
            <div className="auth">
                <p className="auth-title">忘記密碼</p>
                <form className="auth-form" onSubmit={submitHandler}>
                    <FormInput
                        Id="email"
                        ClassName="auth-label"
                        Type="email"
                        Title="帳號 (Email)"
                        value={email}
                        Handler={onEmailChangeHandler}
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
