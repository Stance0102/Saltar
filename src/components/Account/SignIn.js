import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../WebAPI";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [telNumber, setTelnumber] = useState("");
    const [passWord, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function onChangeEmail(e) {
        const email = e.target.value;
        setEmail(email);
    }

    function onChangeUsername(e) {
        const username = e.target.value;
        setUsername(username);
    }

    function onChangeTelnumber(e) {
        const telnumber = e.target.value;
        setTelnumber(telnumber);
    }

    function onChangePassword(e) {
        const password = e.target.value;
        setPassword(password);
    }

    function onChangeRepw(e) {
        const repw = e.target.value;
        if (repw !== passWord) {
            setMessage("請確認密碼一致！");
        } else {
            setMessage("");
        }
    }

    const handleSignin = (e) => {
        e.preventDefault();
        signin(userName, passWord, email, telNumber);
    };

    return (
        <div className="signin">
            <p className="signin-title">
                僅開放 大學社群(社團/系學會) 免費使用 Saltar
            </p>
            <p className="tips">請依序下方表格填入您的資料</p>
            <form className="signin-form" onSubmit={handleSignin}>
                <label className="sign-label" htmlFor="email">
                    帳號 (社團/系學會行銷、公關負責人、主要聯絡人的“學校Email”)
                </label>
                <input
                    type="email"
                    name=""
                    id="email"
                    onChange={onChangeEmail}
                />

                <label className="sign-label" htmlFor="school">
                    學校（系統依照輸入之學校信箱自動偵測校名）
                </label>
                <input
                    type="text"
                    name=""
                    id="school"
                    value="國立高雄科技大學"
                    disabled={true}
                />

                <label className="sign-label" htmlFor="userName">
                    組織名稱
                    (社團/系學會全名，Ex：嘻哈文化研究社、資訊管理系系學會)
                </label>
                <input
                    type="text"
                    name=""
                    id="userName"
                    onChange={onChangeUsername}
                />

                <label className="sign-label" htmlFor="telNumber">
                    手機號碼 (社團/系學會行銷、公關負責人、主要聯絡人的手機)
                </label>
                <input
                    type="tel"
                    name=""
                    id="telNumber"
                    onChange={onChangeTelnumber}
                />

                <label className="sign-label" htmlFor="pw">
                    密碼
                </label>
                <input
                    type="password"
                    name=""
                    id="pw"
                    onChange={onChangePassword}
                />

                <label className="sign-label" htmlFor="repw">
                    確認密碼
                </label>
                <input
                    type="password"
                    name=""
                    id="repw"
                    onChange={onChangeRepw}
                />
                <div className="errorMsg">{message}</div>
                <p className="notice">
                    如果按下「註冊按鈕」，即表示您已閱讀並接受
                    <Link to="" className="link">
                        使用條款
                    </Link>
                    和
                    <Link to="" className="link">
                        隱私權政策
                    </Link>
                    。
                </p>
                <button className="signin-submit" type="submit">
                    註冊
                </button>
                <p id="no-color">
                    已經有帳號了嗎？
                    <Link to="" className="link">
                        回到登入頁面
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
