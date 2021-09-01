import React from "react";
import { useHistory } from "react-router-dom";
import Auth from "../Auth";

const Login = () => {
    const history = useHistory();

    return (
        <div className="signin">
            <button
                onClick={() => {
                    Auth.login(() => {
                        history.push("/dashboard");
                    });
                }}
            >
                測試登入
            </button>
            <p className="signin-title">登入</p>
            {/* <form className="signin-form"> */}
            <label className="sign-label" htmlFor="email">
                帳號
            </label>
            <input
                type="text"
                name=""
                id="username"
                // value={username}
            />

            <label className="sign-label" htmlFor="pw">
                密碼
            </label>
            <input
                type="password"
                name=""
                id="pw"
                // value={password}
            />

            <button className="signin-submit" type="submit" onClick={Login}>
                登入
            </button>
            {/* </form> */}
        </div>
    );
};

export default Login;
