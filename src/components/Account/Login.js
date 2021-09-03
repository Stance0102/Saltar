import React from "react";

const Login = () => {
    return (
        <div className="account-box">
            <div className="signin">
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
        </div>
    );
};

export default Login;
