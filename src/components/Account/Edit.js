import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormInput } from "../Home/_Components";
import Swal from "sweetalert2";
import { selectAccount, getSchool, updateAccount } from "../agent";

const Edit = () => {
    const history = useHistory();
    const { Id: accountId } = useSelector((state) => state.Account);
    const [account, setAccount] = useState({});
    const [message, setMessage] = useState({});
    const [schoolList, setSchoolList] = useState({});
    const { actualname, phone, school, username, newPassword, reNewPassword } =
        account;

    useEffect(() => {
        const setupData = async () => {
            const accountResponse = await selectAccount(accountId);
            if (accountResponse.status === 200) {
                switch (accountResponse.data.status) {
                    case 0:
                        setAccount(accountResponse.data.results[0]);
                        break;
                }
            } else {
                console.log(accountResponse);
            }
            const schoolResponse = await getSchool();
            if (schoolResponse.status == 200) {
                switch (schoolResponse.data.status) {
                    case 0:
                        setSchoolList(schoolResponse.data.results);
                        break;
                }
            } else {
                console.log(schoolResponse);
            }
        };
        setupData();
    }, []);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        const splitEmail = email.split(/\@(\w+)\./);
        if (schoolList[`${splitEmail[1]}`] !== undefined) {
            setAccount({
                ...account,
                username: email,
                school: schoolList[`${splitEmail[1]}`],
            });
        } else {
            setAccount({ ...account, username: email, school: "無法偵測" });
        }
    };

    const onChangeUsername = (e) => {
        const actualname = e.target.value;
        setAccount({ ...account, actualname: actualname });
    };

    const onChangeTelnumber = (e) => {
        const telnumber = e.target.value;
        setAccount({ ...account, phone: telnumber });
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setAccount({ ...account, newPassword: password });
    };

    const onChangeRepw = (e) => {
        const repw = e.target.value;
        setAccount({ ...account, reNewPassword: repw });
        if (repw !== newPassword) {
            setMessage("請確認密碼一致！");
        } else {
            setMessage("");
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (
            actualname === "" ||
            newPassword === "" ||
            username === "" ||
            phone === "" ||
            message !== ""
        ) {
            return Swal.fire({
                title: "請完整填寫欄位",
                confirmButtonText: "知道了",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
        }
        const response = await updateAccount(
            accountId,
            username,
            actualname,
            newPassword,
            phone,
            school
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "更新成功",
                        confirmButtonText: "繼續",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        history.push("/dashboard");
                    });
                    break;
                default:
                    console.log(response.data);
                    Swal.fire({
                        title: "更新失敗",
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
    };

    return (
        <div className="account-box">
            <div className="account-box-title">
                <p>系學會 / 社團資料編輯</p>
                <hr />
            </div>
            <div className="container">
                <form className="edit-form" onSubmit={handleUpdate}>
                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="帳號
                            (社團/系學會行銷、公關負責人、主要聯絡人的“學校Email”)"
                        value={username}
                        onChange={(e) => onChangeEmail(e)}
                    />

                    <FormInput
                        Id="school"
                        Type="text"
                        ClassName="input-label"
                        Title="學校（系統依照輸入之學校信箱自動偵測校名）"
                        disabled="true"
                        value={school}
                    />

                    <FormInput
                        Id="userName"
                        Type="text"
                        ClassName="input-label"
                        Title="組織名稱
                        (社團/系學會全名，Ex：嘻哈文化研究社、資訊管理系系學會)"
                        value={actualname}
                        onChange={(e) => onChangeUsername(e)}
                    />

                    <FormInput
                        Id="telNumber"
                        Type="tel"
                        ClassName="input-label"
                        Title="手機號碼
                        (社團/系學會行銷、公關負責人、主要聯絡人的手機)"
                        value={phone}
                        onChange={(e) => onChangeTelnumber(e)}
                    />

                    <FormInput
                        Id="pw"
                        Type="password"
                        ClassName="input-label"
                        Title="密碼"
                        value={newPassword}
                        onChange={(e) => onChangePassword(e)}
                    />

                    <FormInput
                        Id="repw"
                        Type="password"
                        ClassName="input-label"
                        Title="確認密碼"
                        value={reNewPassword}
                        onChange={(e) => onChangeRepw(e)}
                    />

                    <div className="form-btn-group">
                        <button className="form-save" type="submit">
                            儲存
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
