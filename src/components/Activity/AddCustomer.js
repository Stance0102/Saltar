import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormInput } from "../Home/_Components";
import { createCustomer } from "../agent";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const AddCustomer = () => {
    const history = useHistory();
    const { groupId } = useSelector((state) => state.Account);
    const [customer, setCustomer] = useState({});
    const {
        cusName,
        cusSex,
        cusMail,
        cusTel,
        cusNID,
        cusTicketsNum,
        cusTicketsPrice,
        cusType,
        cusTag,
        cusNote,
    } = customer;

    const onChangeCusName = (e) => {
        const cusName = e.target.value;
        setCustomer({ ...customer, cusName: cusName });
    };
    const onChangeCusSex = (e) => {
        console.log(e);
        const cusSex = e.target.value;
        setCustomer({ ...customer, cusSex: cusSex });
    };
    const onChangeCusMail = (e) => {
        const cusMail = e.target.value;
        setCustomer({ ...customer, cusMail: cusMail });
    };
    const onChangeCusNID = (e) => {
        const cusNID = e.target.value;
        setCustomer({ ...customer, cusNID: cusNID });
    };
    const onChangeCusTel = (e) => {
        const cusTel = e.target.value;
        setCustomer({ ...customer, cusTel: cusTel });
    };
    const onChangeCusTicketsNum = (e) => {
        const cusTicketsNum = e.target.value;
        setCustomer({ ...customer, cusTicketsNum: cusTicketsNum });
    };
    const onChangeCusTicketsPrice = (e) => {
        const TicketsPrice = e.target.value;
        setCustomer({ ...customer, TicketsPrice: TicketsPrice });
    };
    const onChangeCusType = (e) => {
        const cusType = e.target.value;
        setCustomer({ ...customer, cusType: cusType });
    };
    const onChangeCusTag = (e) => {
        const cusTag = e.target.value;
        setCustomer({ ...customer, cusTag: cusTag });
    };
    const onChangeCusNote = (e) => {
        const cusNote = e.target.value;
        setCustomer({ ...customer, cusNote: cusNote });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            cusName === "" ||
            cusSex === "" ||
            cusMail === "" ||
            cusNID === "" ||
            cusTel === "" ||
            cusTicketsNum === "" ||
            cusTicketsPrice === "" ||
            cusType === "" ||
            cusTag === "" ||
            cusNote === ""
        ) {
            return Swal.fire({
                title: "請完整填寫欄位",
                confirmButtonText: "知道了",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
        }
        const response = await createCustomer(
            groupId,
            cusName,
            cusTel,
            cusMail,
            cusNID,
            cusType,
            cusTag,
            cusNote,
            cusSex === "male",
            true,
            true
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "新增成功",
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
                        title: "新增失敗",
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
                <p>新增顧客</p>
                <hr />
            </div>
            <div className="container">
                <form className="edit-form" onSubmit={handleSubmit}>
                    <FormInput
                        Id="customerName"
                        Type="text"
                        ClassName="input-label"
                        Title="顧客姓名"
                        onChange={(e) => onChangeCusName(e)}
                    />

                    <p>顧客性別</p>
                    <div className="input-radio-group">
                        <FormInput
                            Id="sex"
                            Type="radio"
                            ClassName=""
                            Title="男"
                            value="male"
                            name="sex"
                            onChange={(e) => onChangeCusSex(e)}
                        />

                        <FormInput
                            Id="sex"
                            Type="radio"
                            ClassName=""
                            Title="女"
                            value="female"
                            name="sex"
                            onChange={(e) => onChangeCusSex(e)}
                        />
                    </div>

                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="顧客信箱"
                        onChange={(e) => onChangeCusMail(e)}
                    />

                    <FormInput
                        Id="email"
                        Type="text"
                        ClassName="input-label"
                        Title="顧客身分證字號"
                        onChange={(e) => onChangeCusNID(e)}
                    />

                    <FormInput
                        Id="telNumber"
                        Type="tel"
                        ClassName="input-label"
                        onChange={(e) => onChangeCusTel(e)}
                        Title="顧客手機號碼"
                    />

                    <FormInput
                        Id="orderNumber"
                        Type="number"
                        ClassName="input-label"
                        Title="總購買票據數量"
                        onChange={(e) => onChangeCusTicketsNum(e)}
                    />

                    <FormInput
                        Id="orderPrice"
                        Type="number"
                        ClassName="input-label"
                        Title="總購買票據金額"
                        onChange={(e) => onChangeCusTicketsPrice(e)}
                    />

                    <FormInput
                        Id="customerLevel"
                        Type="text"
                        ClassName="input-label"
                        Title="顧客等級"
                        onChange={(e) => onChangeCusType(e)}
                    />

                    <FormInput
                        Id="customerSort"
                        Type="text"
                        ClassName="input-label"
                        Title="顧客類別"
                        onChange={(e) => onChangeCusTag(e)}
                    />

                    <FormInput
                        Id="note"
                        Type="text"
                        ClassName="input-label"
                        Title="備註"
                        onChange={(e) => onChangeCusNote(e)}
                    />

                    <div className="form-btn-group">
                        <button className="form-save" type="submit">
                            新增
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;
