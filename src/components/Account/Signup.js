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
    const [isStudent, setIsStudent] = useState(true);

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
                // console.log(response);
            }
        };

        setupData();
    }, []);

    const onChangeStudent = (e) => {
        setIsStudent(!isStudent);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        if (isStudent) {
            const splitEmail = email.split(/\@(\w+)\./);
            if (schoolList[`${splitEmail[1]}`] !== undefined) {
                setSchool(schoolList[`${splitEmail[1]}`]);
            } else {
                setSchool("無法偵測");
            }
        } else {
            setSchool("");
        }
    };

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeTelnumber = (e) => {
        const telnumber = e.target.value;
        setTelnumber(telnumber);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeRepw = (e) => {
        const repw = e.target.value;
        if (repw !== passWord) {
            setMessage("請確認密碼一致！");
        } else {
            setMessage("");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (isStudent) {
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
            if (school === "" || school === "無法偵測") {
                return Swal.fire({
                    title: "請填入學校信箱",
                    confirmButtonText: "知道了",
                    confirmButtonColor: "#ffb559",
                    icon: "info",
                });
            }
        } else {
            if (
                userName === "" ||
                passWord === "" ||
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
        }

        const response = await signup(
            userName,
            passWord,
            email,
            telNumber,
            school,
            !isStudent
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
                        history.push("/login");
                    });
                    break;
                case 17:
                    Swal.fire({
                        title: "帳號重複",
                        text: JSON.stringify(response.data.results),
                        confirmButtonText: "知道了",
                        confirmButtonColor: "#ffb559",
                        icon: "error",
                    });
                    break;
                default:
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
            // console.log(response);
        }
    };

    if (isStudent) {
        return (
            <div className="signin-box">
                <div className="index-img">
                    <img src={loginPage} alt="" />
                </div>
                <div className="auth">
                    {/* <p className="auth-title">
                        註冊以免費使用 Saltar(校園活動方)
                        <br />
                        <button className="tips-btn" onClick={onChangeStudent}>
                            切換中小型活動方註冊
                        </button>
                    </p>
                    <form className="auth-form" onSubmit={handleSignup}>
                        <FormInput
                            Id="email"
                            ClassName="auth-label"
                            Type="email"
                            Handler={onChangeEmail}
                            Title="帳號"
                            notice="(社團/系學會行銷、公關負責人、主要聯絡人的“學校Email”)"
                        />

                        <FormInput
                            Id="school"
                            ClassName="auth-label"
                            Type="text"
                            Title="學校"
                            notice="(系統依照輸入之學校信箱自動偵測校名)"
                            value={school}
                            disabled={true}
                        />

                        <FormInput
                            Id="userName"
                            Type="text"
                            ClassName="auth-label"
                            Handler={onChangeUsername}
                            Title="組織名稱"
                            notice="(社團/系學會全名，Ex：嘻哈文化研究社、資訊管理系系學會)"
                        />

                        <FormInput
                            Id="telNumber"
                            Type="tel"
                            ClassName="auth-label"
                            Handler={onChangeTelnumber}
                            Title="手機號碼"
                            notice="(社團/系學會行銷、公關負責人、主要聯絡人的手機)"
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
                    </form> */}
                    <p style={{ marginBottom: "25px" }}>
                        欲加入 Saltar 的廠商或組織，請來信至
                        fiesta.network.taiwan@gmail.com 與我們聯繫。
                    </p>
                    <p id="no-color">
                        已經有帳號了嗎？
                        <Link to="/login" className="link">
                            回到登入頁面
                        </Link>
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="signin-box">
                <div className="index-img">
                    <img src={loginPage} alt="" />
                </div>
                <div className="auth">
                    {/* <p className="auth-title">
                        註冊以免費使用 Saltar
                        <br />
                        <font className="tips">
                            中小型活動方註冊頁（非校園活動方）
                        </font>
                        <font className="tips-btn" onClick={onChangeStudent}>
                            切換校園活動方註冊
                        </font>
                    </p>
                    <form className="auth-form" onSubmit={handleSignup}>
                        <FormInput
                            Id="email"
                            ClassName="auth-label"
                            Type="email"
                            Handler={onChangeEmail}
                            Title="帳號"
                            notice="(活動主辦方行銷、公關負責人、主要聯絡人的“Email”)"
                        />

                        <FormInput
                            Id="userName"
                            Type="text"
                            ClassName="auth-label"
                            Handler={onChangeUsername}
                            Title="組織名稱"
                            notice="(活動主辦方名稱)"
                        />

                        <FormInput
                            Id="telNumber"
                            Type="tel"
                            ClassName="auth-label"
                            Handler={onChangeTelnumber}
                            Title="手機號碼"
                            notice="(活動主辦方行銷、公關負責人、主要聯絡人的手機)"
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
                    </form> */}
                    <p style={{ marginBottom: "25px" }}>
                        欲加入 Saltar 的廠商或組織，請來信至
                        fiesta.network.taiwan@gmail.com 與我們聯繫。
                    </p>
                    <p id="no-color">
                        已經有帳號了嗎？
                        <Link to="/login" className="link">
                            回到登入頁面
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
};

export default SignUp;
