import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SetAccount } from "../../store/slice/account";
import { login } from "../WebAPI";
import store from "../../store";




const Login = () => {
    const [username, setusername] = useState('');
    const [pw, setpw] = useState('');
    const LoginButton = async () => {
        let data = login(username, pw);
        console.log(data);
        if (data.status == 0) {
            console.log(data.result);
            store.dispatch(SetAccount(data.result))
            localStorage.setItem('token', data.result.token);
        }
        const Account = store.getState("Account")
        console.log(Account);
        console.log("out done");
    }
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
                    onChange={event => setusername(event.target.value)}
                // value={username}
                />

                <label className="sign-label" htmlFor="pw">
                    密碼
                </label>
                <input
                    type="password"
                    name=""
                    id="pw"
                    onChange={event => setpw(event.target.value)}
                // value={password}
                />

                <button className="signin-submit" type="submit" onClick={LoginButton}>
                    登入
                </button>
                {/* </form> */}
            </div>
        </div>
    );
};

export default Login;
