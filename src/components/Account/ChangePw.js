import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FormInput } from "../Home/_Components";
import { changePassword } from "../agent";
import Swal from "sweetalert2";
// Img
import passwordimg from "../../images/password.svg";

const ChangePw = () => {
    const [password, sePassword] = useState("");
    const [passwordCheck, sePasswordCheck] = useState("");
    const [id, setId] = useState("");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.search !== "") {
            const id = location.search.split("=")[1];
            setId(id);
        }
    }, []);

    const onPasswordChangeHandler = (e) => {
        sePassword(e.target.value);
    };

    const onPasswordCheckChangeHandler = (e) => {
        sePasswordCheck(e.target.value);
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password === passwordCheck) {
            const response = await changePassword(id, password);
            if (response.status == 200) {
                console.log(response.data);
                switch (response.data.status) {
                    case 0:
                        Swal.fire({
                            title: "修改成功",
                            confirmButtonText: "立即登入",
                            confirmButtonColor: "#ffb559",
                            icon: "success",
                        }).then(() => {
                            history.push("/");
                        });
                        break;
                    default:
                        Swal.fire({
                            title: "修改失敗",
                            text: JSON.stringify(response.data.results),
                            confirmButtonText: "知道了",
                            confirmButtonColor: "#ffb559",
                            icon: "error",
                        });
                        break;
                }
            } else {
                console.log(response);
            }
        } else {
            Swal.fire({
                title: "錯誤",
                text: "請確認密碼輸入一致",
                confirmButtonText: "知道了",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
        }
    };
    return (
        <>
            <div className="index-img">
                <img src={passwordimg} alt="" />
            </div>
            <div className="auth">
                <p className="auth-title">變更密碼</p>
                <form className="auth-form" onSubmit={submitHandler}>
                    <FormInput
                        Id="pw"
                        ClassName="auth-label"
                        Type="password"
                        Title="密碼"
                        Handler={onPasswordChangeHandler}
                    />

                    <FormInput
                        Id="repw"
                        ClassName="auth-label"
                        Type="password"
                        Title="確認密碼"
                        Handler={onPasswordCheckChangeHandler}
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
