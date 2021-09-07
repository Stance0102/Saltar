import React from "react";
import { FormInput } from "../Home/_Components";

const AddCustomer = () => {
    return (
        <div className="account-box">
            <div className="account-box-title">
                <p>新增顧客</p>
                <hr />
            </div>
            <div className="container">
                <form className="edit-form" action="">
                    <FormInput
                        Id="customerName"
                        Type="text"
                        ClassName="input-label"
                        Title="顧客姓名"
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
                            checked
                        />

                        <FormInput
                            Id="sex"
                            Type="radio"
                            ClassName=""
                            Title="女"
                            value="female"
                            name="sex"
                        />
                    </div>

                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="顧客信箱"
                    />

                    <FormInput
                        Id="orderNumber"
                        Type="number"
                        ClassName="input-label"
                        Title="總購買票據數量"
                    />

                    <FormInput
                        Id="orderPrice"
                        Type="number"
                        ClassName="input-label"
                        Title="總購買票據金額"
                    />

                    <FormInput
                        Id="customerLevel"
                        Type="text"
                        ClassName="input-label"
                        Title="顧客等級"
                        value="一般會員"
                    />

                    <FormInput
                        Id="customerSort"
                        Type="text"
                        ClassName="input-label"
                        Title="顧客類別"
                        value="重點客群"
                    />

                    <FormInput
                        Id="note"
                        Type="text"
                        ClassName="input-label"
                        Title="備註"
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

export default AddCustomer;
