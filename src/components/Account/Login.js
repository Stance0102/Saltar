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
