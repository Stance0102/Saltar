import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetAccount } from "../../store/slice/AccountSlice";
import { login } from "../agent";
import { FormInput } from "../Home/_Components";
import loginPage from "../../images/loginPage.svg";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function onChangeEmail(e) {
        const email = e.target.value;
        setEmail(email);
    }

    function onChangePassword(e) {
        const pw = e.target.value;
        setPassword(pw);
    }

    function handleLogin(e) {
        e.preventDefault();
        Login(email, password);
    }

    //取出 Redux
    const { isLogin, Id, name, groupId, token } = useSelector(
        (state) => state.Account
    );
    console.log(isLogin, Id, name, groupId, token);

    const LoginButton = async () => {
        const data = await login(email, password);
        if (data.data.status == 0) {
            const account = data.data.results;
            //放入 Redux
            dispatch(SetAccount(account));
            //放入 localStorage
            localStorage.setItem("token", account.token);
        }
    };

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

                    <Link to="" className="link">
                        <p style={{ textAlign: "right" }}>忘記密碼？</p>
                    </Link>

                    <button className="auth-submit" type="submit">
                        登入
                    </button>
                    <p id="no-color">
                        還沒有帳號嗎？
                        <Link to="/signin" className="link">
                            回到註冊頁面
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
