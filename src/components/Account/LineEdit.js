import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormInput } from "../Home/_Components";
import { createCustomerWithBuyTicket, updateCustomer } from "../agent";
import Swal from "sweetalert2";
import LineLogin from "./LineLogin";

const LineEdit = () => {
    const history = useHistory();
    const Customer = useSelector((state) => state.Customer);
    const [userData, setUserData] = useState(Customer);
    useEffect(() => {
        if (Customer.uid == "") {
            localStorage.setItem("lineReDirect", "lineEdit");
            localStorage.setItem("lineReDirectId", "lineEdit");
            LineLogin();
        }
    }, []);

    const onEmailChangeHandler = (e) => {
        setUserData({
            ...userData,
            mail: e.target.value,
        });
    };

    const onNameChangeHandler = (e) => {
        setUserData({
            ...userData,
            actualname: e.target.value,
        });
    };

    const onPhoneChangeHandler = (e) => {
        setUserData({
            ...userData,
            phone: e.target.value,
        });
    };
    const onNIDChangeHandler = (e) => {
        setUserData({
            ...userData,
            NID: e.target.value,
        });
    };

    const onSexChangeHandler = (e) => {
        setUserData({
            ...userData,
            sex: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const {
            Customer_Id,
            mail,
            actualname,
            phone,
            uid,
            NID,
            customer_type,
            customer_tag,
            customer_note,
            sex,
        } = userData;
        if (
            mail === "" ||
            actualname === "" ||
            phone === "" ||
            NID === "" ||
            sex === undefined
        ) {
            Swal.fire({
                title: "資料請完整填寫",
                confirmButtonText: "確定",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
            return;
        }

        let newCus = true;
        if (userData.Customer_Id !== null) {
            newCus = false;
        }
        if (newCus) {
            const response = await createCustomerWithBuyTicket(
                actualname,
                phone,
                mail,
                uid,
                NID,
                sex == "male"
            );
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "創建完成",
                        confirmButtonText: "重新登入",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        LineLogin();
                    });
                    break;
                default:
                    Swal.fire({
                        title: "發生意外錯誤",
                        confirmButtonText: "離開",
                        confirmButtonColor: "#ffb559",
                        icon: "info",
                    }).then(() => {
                        history.push({
                            pathname: "/",
                        });
                    });
                    break;
            }
        } else {
            const updateResponse = await updateCustomer(
                Customer_Id,
                actualname,
                phone,
                mail,
                customer_type,
                customer_tag,
                customer_note,
                NID,
                uid,
                sex == "male"
            );

            switch (updateResponse.data.status) {
                case 0:
                    Swal.fire({
                        title: "更新成功",
                        confirmButtonText: "重新登入",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        LineLogin();
                    });
                    break;
                default:
                    Swal.fire({
                        title: "發生意外錯誤",
                        confirmButtonText: "離開",
                        confirmButtonColor: "#ffb559",
                        icon: "info",
                    }).then(() => {
                        history.push({
                            pathname: "/",
                        });
                    });
                    break;
            }
        }
    };

    return (
        <div className="buy-ticket">
            <div className="container">
                <form className="buy-form" onSubmit={submitHandler}>
                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="學校信箱或個人信箱(必填)"
                        notice="*建議填寫學校信箱以享有學生專屬優惠！"
                        value={userData.mail}
                        Handler={onEmailChangeHandler}
                    />
                    <FormInput
                        Id="NID"
                        Type="text"
                        ClassName="input-label"
                        Title="身分證字號(必填)"
                        notice="*配合政府實名制規定，填寫真實身份證字號，以利現場工作人員查驗身份"
                        value={userData.NID}
                        Handler={onNIDChangeHandler}
                    />
                    <FormInput
                        Id="userName"
                        Type="text"
                        ClassName="input-label"
                        Title="姓名(必填)"
                        notice="*填寫真實姓名，以利現場工作人員查驗身份"
                        value={userData.actualname}
                        Handler={onNameChangeHandler}
                    />
                    <FormInput
                        Id="telNumber"
                        Type="tel"
                        ClassName="input-label"
                        Title="聯絡電話(必填)"
                        value={userData.phone}
                        Handler={onPhoneChangeHandler}
                    />
                    <p>性別</p>
                    <div className="input-radio-group">
                        <FormInput
                            Id="sex"
                            Type="radio"
                            ClassName=""
                            Title="男"
                            value="male"
                            name="sex"
                            Handler={onSexChangeHandler}
                        />

                        <FormInput
                            Id="sex"
                            Type="radio"
                            ClassName=""
                            Title="女"
                            value="female"
                            name="sex"
                            Handler={onSexChangeHandler}
                        />
                    </div>
                    <hr />
                    <button className="buy-btn">確認修改</button>
                </form>
            </div>
        </div>
    );
};

export default LineEdit;
