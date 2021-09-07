import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { signup, getSchool } from "../agent";
import { FormInput } from "../Home/_Components";
import Swal from "sweetalert2";
// Img
import loginPage from "../../images/loginPage.svg";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [school, setSchool] = useState("");
    const [telNumber, setTelnumber] = useState("");
    const [passWord, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [schoolList, setSchoolList] = useState({});
    const history = useHistory();

    useEffect(() => {
        const setupData = async () => {
            const response = await getSchool();
            if (response.status == 200) {
                switch (response.data.status) {
                    case 0:
                        setSchoolList(response.data.results);
                        break;
                }
            } else {
                console.log(response);
            }
        };

        setupData();
    }, []);

    function onChangeEmail(e) {
        const email = e.target.value;
        setEmail(email);
        const splitEmail = email.split(/\@(\w+)\./);
        if (schoolList[`${splitEmail[1]}`] !== undefined) {
            setSchool(schoolList[`${splitEmail[1]}`]);
        } else {
            setSchool("無法偵測");
        }
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

    async function handleSignup(e) {
        e.preventDefault();
        if (
            userName === "" ||
            passWord === "" ||
            email === "" ||
            telNumber === "" ||
            message !== ""
        ) {
            return Swal.fire({
                title: "請完整填寫欄位",
                confirmButtonText: "知道了",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
        }
        const response = await signup(
            userName,
            passWord,
            email,
            telNumber,
            school
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "註冊成功",
                        confirmButtonText: "立即登入",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        history.push("/");
                    });
                    break;
                default:
                    console.log(response.data);
                    Swal.fire({
                        title: "註冊失敗",
                        text: JSON.stringify(response.data.results),
                        confirmButtonText: "知道了",
                        confirmButtonColor: "#ffb559",
                        icon: "error",
                    });
                    break;
            }
        } else {
            console.log(response);
        }
    }

    return (
        <>
            <div className="index-img">
                <img src={loginPage} alt="" />
            </div>
            <div className="auth">
                <p className="auth-title">
                    註冊以免費使用 Saltar
                    <br />
                    <font className="tips">
                        目前僅開放 大學社群(社團/系學會)
                    </font>
                </p>
                <form className="auth-form" onSubmit={handleSignup}>
                    <FormInput
                        Id="email"
                        ClassName="auth-label"
                        Type="email"
                        Handler={onChangeEmail}
                        Title="帳號 (社團/系學會行銷、公關負責人、主要聯絡人的“學校Email”)"
                    />

                    <FormInput
                        Id="school"
                        ClassName="auth-label"
                        Type="text"
                        Title="學校（系統依照輸入之學校信箱自動偵測校名）"
                        value={school}
                        disabled={true}
                    />

                    <FormInput
                        Id="userName"
                        Type="text"
                        ClassName="auth-label"
                        Handler={onChangeUsername}
                        Title="組織名稱(社團/系學會全名，Ex：嘻哈文化研究社、資訊管理系系學會)"
                    />

                    <FormInput
                        Id="telNumber"
                        Type="tel"
                        ClassName="auth-label"
                        Handler={onChangeTelnumber}
                        Title="手機號碼 (社團/系學會行銷、公關負責人、主要聯絡人的手機)"
                    />

                    <FormInput
                        Id="pw"
                        Type="password"
                        ClassName="auth-label"
                        Handler={onChangePassword}
                        Title="密碼"
                    />

                    <FormInput
                        Id="repw"
                        Type="password"
                        ClassName="auth-label"
                        Handler={onChangeRepw}
                        Title="確認密碼"
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
                    <button className="auth-submit" type="submit">
                        註冊
                    </button>
                    <p id="no-color">
                        已經有帳號了嗎？
                        <Link to="/" className="link">
                            回到登入頁面
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default SignUp;
