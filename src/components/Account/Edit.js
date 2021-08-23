import React from "react";

const Edit = () => {
    return (
        <div className="account-box">
            <div className="account-box-title">
                <p>系學會 / 社團資料編輯</p>
                <hr />
            </div>
            <div className="container">
                <form className="edit-form" action="">
                    <div className="input-group">
                        <label className="input-label" for="email">
                            帳號
                            (社團/系學會行銷、公關負責人、主要聯絡人的“學校Email”)
                        </label>
                        <input type="email" name="" id="email" />
                    </div>

                    <div className="input-group">
                        <label className="input-label" for="school">
                            學校（系統依照輸入之學校信箱自動偵測校名）
                        </label>
                        <input
                            type="text"
                            name=""
                            id="school"
                            value="國立高雄科技大學"
                            disabled="true"
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" for="userName">
                            組織名稱
                            (社團/系學會全名，Ex：嘻哈文化研究社、資訊管理系系學會)
                        </label>
                        <input type="text" name="" id="userName" />
                    </div>

                    <div className="input-group">
                        <label className="input-label" for="telNumber">
                            手機號碼
                            (社團/系學會行銷、公關負責人、主要聯絡人的手機)
                        </label>
                        <input type="tel" name="" id="telNumber" />
                    </div>

                    <div className="input-group">
                        <label className="input-label" for="pw">
                            密碼
                        </label>
                        <input type="password" name="" id="pw" />
                    </div>

                    <div className="input-group">
                        <label className="input-label" for="repw">
                            確認密碼
                        </label>
                        <input type="password" name="" id="repw" />
                    </div>

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
