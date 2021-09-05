import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetAccount } from "../../store/slice/AccountSlice";
import { login } from "../agent";

const Login = () => {
    const [username, setUserName] = useState("");
    const [pw, setPw] = useState("");
    const dispatch = useDispatch();

    //取出 Redux
    const { isLogin, Id, name, groupId, token } = useSelector(
        (state) => state.Account
    );
    console.log(isLogin, Id, name, groupId, token);

    const LoginButton = async () => {
        const data = await login(username, pw);
        if (data.data.status == 0) {
            const account = data.data.results;
            //放入 Redux
            dispatch(SetAccount(account));
            //放入 localStorage
            localStorage.setItem("token", account.token);
        }
    };

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
                    onChange={(event) => setUserName(event.target.value)}
                    // value={username}
                />

                <label className="sign-label" htmlFor="pw">
                    密碼
                </label>
                <input
                    type="password"
                    name=""
                    id="pw"
                    onChange={(event) => setPw(event.target.value)}
                    // value={password}
                />

                <button
                    className="signin-submit"
                    type="submit"
                    onClick={LoginButton}
                >
                    登入
                </button>
                {/* </form> */}
            </div>
        </div>
    );
};

export default Login;
