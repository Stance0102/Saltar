import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormInput } from "../Home/_Components";
import Swal from "sweetalert2";
import { selectAccount, getSchool, updateAccount, updateGroup } from "../agent";

const Edit = () => {
    const history = useHistory();
    const { Id: accountId, groupId } = useSelector((state) => state.Account);
    const [account, setAccount] = useState({});
    const [message, setMessage] = useState({});
    const [schoolList, setSchoolList] = useState({});
    const {
        actualname,
        phone,
        school,
        username,
        newPassword,
        reNewPassword,
        // pay_MerchantID,
        // pay_HashKey,
        // pay_HashIV,
    } = account;

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
                // console.log(accountResponse);
            }
            const schoolResponse = await getSchool();
            if (schoolResponse.status == 200) {
                switch (schoolResponse.data.status) {
                    case 0:
                        setSchoolList(schoolResponse.data.results);
                        break;
                }
            } else {
                // console.log(schoolResponse);
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
            setAccount({ ...account, username: email, school: "????????????" });
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
            setMessage("????????????????????????");
        } else {
            setMessage("");
        }
    };

    // ?????????
    /*
    const onChangePayID = (e) => {
        const payId = e.target.value;
        setAccount({ ...account, pay_MerchantID: payId });
    };

    const onChangePayKey = (e) => {
        const payHashKey = e.target.value;
        setAccount({ ...account, pay_HashKey: payHashKey });
    };
    const onChangePayIV = (e) => {
        const payHashIV = e.target.value;
        setAccount({ ...account, pay_HashIV: payHashIV });
    };
    */
    //
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
                title: "?????????????????????",
                confirmButtonText: "?????????",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
        }
        const accountResponse = await updateAccount(
            accountId,
            username,
            actualname,
            newPassword,
            phone,
            school
            // pay_MerchantID,
            // pay_HashKey,
            // pay_HashIV
        );
        if (accountResponse.status == 200) {
            switch (accountResponse.data.status) {
                case 0:
                    const groupResponse = await updateGroup(
                        groupId,
                        actualname,
                        phone
                    );
                    if (groupResponse.status == 200) {
                        switch (groupResponse.data.status) {
                            case 0:
                                Swal.fire({
                                    title: "????????????",
                                    confirmButtonText: "??????",
                                    confirmButtonColor: "#ffb559",
                                    icon: "success",
                                }).then(() => {
                                    history.push("/dashboard");
                                });
                                break;
                            default:
                                // console.log(groupResponse.data);
                                Swal.fire({
                                    title: "????????????",
                                    text: JSON.stringify(
                                        groupResponse.data.results
                                    ),
                                    confirmButtonText: "?????????",
                                    confirmButtonColor: "#ffb559",
                                    icon: "error",
                                });
                                break;
                        }
                    } else {
                        // console.log(groupResponse);
                    }
                    break;
                default:
                    // console.log(accountResponse.data);
                    Swal.fire({
                        title: "????????????",
                        text: JSON.stringify(accountResponse.data.results),
                        confirmButtonText: "?????????",
                        confirmButtonColor: "#ffb559",
                        icon: "error",
                    });
                    break;
            }
        } else {
            // console.log(accountResponse);
        }
    };

    return (
        <div className="account-box">
            <div className="account-box-title">
                <p>????????? / ??????????????????</p>
                <hr />
            </div>
            <div className="container">
                <form className="edit-form" onSubmit={handleUpdate}>
                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="??????
                            (??????/???????????????????????????????????????????????????????????????Email???)"
                        value={username}
                        onChange={(e) => onChangeEmail(e)}
                    />

                    <FormInput
                        Id="school"
                        Type="text"
                        ClassName="input-label"
                        Title="???????????????????????????????????????????????????????????????"
                        disabled="true"
                        value={school}
                    />

                    <FormInput
                        Id="userName"
                        Type="text"
                        ClassName="input-label"
                        Title="????????????
                        (??????/??????????????????Ex???????????????????????????????????????????????????)"
                        value={actualname}
                        onChange={(e) => onChangeUsername(e)}
                    />

                    <FormInput
                        Id="telNumber"
                        Type="tel"
                        ClassName="input-label"
                        Title="????????????
                        (??????/????????????????????????????????????????????????????????????)"
                        value={phone}
                        onChange={(e) => onChangeTelnumber(e)}
                    />

                    <FormInput
                        Id="pw"
                        Type="password"
                        ClassName="input-label"
                        Title="??????"
                        value={newPassword}
                        onChange={(e) => onChangePassword(e)}
                    />

                    <FormInput
                        Id="repw"
                        Type="password"
                        ClassName="input-label"
                        Title="????????????"
                        value={reNewPassword}
                        onChange={(e) => onChangeRepw(e)}
                    />

                    {/* <FormInput
                        Id="pay_MerchantID"
                        Type="text"
                        ClassName="input-label"
                        Title="??????ID"
                        value={pay_MerchantID}
                        onChange={(e) => onChangePayID(e)}
                    /> */}

                    {/* <FormInput
                        Id="pay_HashKey"
                        Type="password"
                        ClassName="input-label"
                        Title="??????Hash Key"
                        value={pay_HashKey}
                        onChange={(e) => onChangePayKey(e)}
                    /> */}

                    {/* <FormInput
                        Id="pay_HashIV"
                        Type="password"
                        ClassName="input-label"
                        Title="??????Hash IV"
                        value={pay_HashIV}
                        onChange={(e) => onChangePayIV(e)}
                    /> */}

                    <div className="form-btn-group">
                        <button className="form-save" type="submit">
                            ??????
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
