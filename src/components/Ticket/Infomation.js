import React from "react";

const Infomation = () => {
    return (
        <div className="ticket-box">
            <div className="ticket-box-title">
                <p>票卷資訊</p>
                <hr />
            </div>
            <div className="container">
                <form className="ticket-form" action="">
                    <div className="input-group">
                        <label className="input-label" for="ticketName">
                            票種名稱
                        </label>
                        <input type="text" name="" id="ticketName" />
                    </div>

                    <div className="input-group">
                        <label className="input-label" for="peopleMaximum">
                            人數上限
                        </label>
                        <input type="number" name="" id="peopleMaximum" />
                    </div>

                    <div className="input-group">
                        <label className="input-label" for="price">
                            票卷金額
                        </label>
                        <input
                            type="number"
                            mix="0"
                            step="any"
                            name=""
                            id="email"
                        />
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

export default Infomation;
