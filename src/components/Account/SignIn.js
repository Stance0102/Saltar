import React from "react";
import { Link } from "react-router-dom";
import "../../styles/saltar.css";

const SignIn = () => {
    return (
        <div className="signin">
            <p className="signin-title">
                僅開放 大學社群(社團/系學會) 免費使用 Saltar
            </p>
            <p className="tips">請依序下方表格填入您的資料</p>
            <form className="signin-form" action="">
                <label className="sign-label" for="email">
                    帳號 (社團/系學會行銷、公關負責人、主要聯絡人的“學校Email”)
                </label>
                <input type="email" name="" id="email" />

                <label className="sign-label" for="school">
                    學校（系統依照輸入之學校信箱自動偵測校名）
                </label>
                <input
                    type="text"
                    name=""
                    id="school"
                    value="國立高雄科技大學"
                    disabled="true"
                />

                <label className="sign-label" for="userName">
                    組織名稱
                    (社團/系學會全名，Ex：嘻哈文化研究社、資訊管理系系學會)
                </label>
                <input type="text" name="" id="userName" />

                <label className="sign-label" for="telNumber">
                    手機號碼 (社團/系學會行銷、公關負責人、主要聯絡人的手機)
                </label>
                <input type="tel" name="" id="telNumber" />

                <label className="sign-label" for="pw">
                    密碼
                </label>
                <input type="password" name="" id="pw" />

                <label className="sign-label" for="repw">
                    確認密碼
                </label>
                <input type="password" name="" id="repw" />
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
