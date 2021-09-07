import React from "react";
import { FormInput } from "../Home/_Components";
// Img
import password from "../../images/password.svg";

const ChangePw = () => {
    return (
        <>
            <div className="index-img">
                <img src={password} alt="" />
            </div>
            <div className="auth">
                <p className="auth-title">變更密碼</p>
                <form className="auth-form">
                    <FormInput
                        Id="pw"
                        ClassName="auth-label"
                        Type="password"
                        Title="密碼"
                    />

                    <FormInput
                        Id="repw"
                        ClassName="auth-label"
                        Type="password"
                        Title="確認密碼"
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

export default ChangePw;
