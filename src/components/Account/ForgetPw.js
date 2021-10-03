import React, { useState } from "react";
import Swal from "sweetalert2";
import { sendForgetMail } from "../agent";
import { FormInput } from "../Home/_Components";
// Img
import forget_password from "../../images/forget_password.svg";

const ForgetPw = () => {
    const [email, setEmail] = useState("");

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await sendForgetMail(email);
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "發送成功",
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    });
                    break;
                default:
                    Swal.fire({
                        title: response.data.msg,
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ffb559",
                        icon: "info",
                    });
                    break;
            }
        }
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
