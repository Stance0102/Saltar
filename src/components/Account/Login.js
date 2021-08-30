import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import useAuth from "../App";

const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        auth.signIn(() => {
            history.replace(from);
        });
    };

    return (
        <div className="signin">
            <p className="signin-title">登入</p>
            {/* <form className="signin-form"> */}
            <label className="sign-label" for="email">
                帳號
            </label>
            <input
                type="text"
                name=""
                id="username"
                // value={username}
            />

            <label className="sign-label" for="pw">
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
