import React from "react";
import { FormInput } from "../Home/_Components";

const Edit = () => {
    return (
        <div className="account-box">
            <div className="account-box-title">
                <p>系學會 / 社團資料編輯</p>
                <hr />
            </div>
            <div className="container">
                <form className="edit-form" action="">
                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="帳號
                            (社團/系學會行銷、公關負責人、主要聯絡人的“學校Email”)"
                    />

                    <FormInput
                        Id="school"
                        Type="text"
                        ClassName="input-label"
                        Title="學校（系統依照輸入之學校信箱自動偵測校名）"
                        value="國立高雄科技大學"
                        disabled="true"
                    />

                    <FormInput
                        Id="userName"
                        Type="text"
                        ClassName="input-label"
                        Title="組織名稱
                        (社團/系學會全名，Ex：嘻哈文化研究社、資訊管理系系學會)"
                    />

                    <FormInput
                        Id="telNumber"
                        Type="tel"
                        ClassName="input-label"
                        Title="手機號碼
                        (社團/系學會行銷、公關負責人、主要聯絡人的手機)"
                    />

                    <FormInput
                        Id="pw"
                        Type="password"
                        ClassName="input-label"
                        Title="密碼"
                    />

                    <FormInput
                        Id="repw"
                        Type="password"
                        ClassName="input-label"
                        Title="確認密碼"
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
