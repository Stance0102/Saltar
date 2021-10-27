import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../store/slice/AccountSlice";
import { login } from "../agent";
import { FormInput } from "../Home/_Components";
import loginPage from "../../images/loginPage.svg";
import Swal from "sweetalert2";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    //取出 Redux
    // const { isLogin, Id, name, groupId, token } = useSelector(
    //     (state) => state.Account
    // );
    // console.log(isLogin, Id, name, groupId, token);

    function onChangeEmail(e) {
        const email = e.target.value;
        setEmail(email);
    }

    function onChangePassword(e) {
        const pw = e.target.value;
        setPassword(pw);
    }

    async function handleLogin(e) {
        e.preventDefault();
        const response = await login(email, password);
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    const account = response.data.results;
                    //放入 Redux
                    dispatch(setAccount(account));
                    //放入 localStorage
                    localStorage.setItem("token", account.token);

                    Swal.fire({
                        title: "登入成功",
                        confirmButtonText: "立即開始使用",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        history.push("/dashboard");
                    });
                    break;

                default:
                    Swal.fire({
                        title: "登入失敗",
                        text: "帳號或密碼錯誤!",
                        confirmButtonText: "關閉",
                        confirmButtonColor: "#ffb559",
                        icon: "error",
                        footer: '<a href="/signup">建立帳號?</a>',
                    });
                    break;
            }
        } else {
            // console.log(response);
        }
    }
    return (
        <>
            <div className="index-img">
                <img src={loginPage} alt="" />
            </div>
            <div className="auth">
                <p className="auth-title">
                    登入以免費使用 Saltar
                    <br />
                    <font className="tips">
                        目前僅開放 大學社群(社團/系學會)
                    </font>
                </p>
                <form className="auth-form" onSubmit={handleLogin}>
                    <FormInput
                        Id="email"
                        ClassName="auth-label"
                        Type="email"
                        Handler={onChangeEmail}
                        Title="帳號 (Email)"
                    />

                    <FormInput
                        Id="pw"
                        Type="password"
                        ClassName="auth-label"
                        Handler={onChangePassword}
                        Title="密碼"
                    />

                    <Link to="/forgetPassword" className="link">
                        <p style={{ textAlign: "right" }}>忘記密碼？</p>
                    </Link>

                    <button className="auth-submit" type="submit">
                        登入
                    </button>
                    <p id="no-color">
                        還沒有帳號嗎？
                        <Link to="/signup" className="link">
                            回到註冊頁面
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
