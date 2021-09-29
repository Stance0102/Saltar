import React, { useState } from "react";
import { FormInput } from "../Home/_Components";
// Img
import cart_icon from "../../images/cart_icon.svg";
import Organizer_icon from "../../images/Organizer_icon.svg";
import checked_icon from "../../images/checked_icon.svg";
import vector_gray_Icon from "../../images/vector_gray_Icon.svg";
import check_Ticket from "../../images/check_Ticket.svg";
import qrcode from "../../images/qrcode.png";
import receip from "../../images/receip.svg";

const Infomation = () => {
    const [payStatus, setPayStatus] = useState(false);

    if (payStatus) {
        return (
            <>
                <div className="infomation">
                    <div id="success">
                        <img src={checked_icon} alt="" />
                        <p>購買完成！</p>
                    </div>
                    <div className="title">
                        <img src={vector_gray_Icon} alt="" />
                        我的票卷
                    </div>

                    <div className="ticket-head">
                        高科傳說對決生死賽
                        <font className="ticket-type">外系票</font>
                    </div>
                    <div className="ticket-qrcode">
                        <p>
                            <img src={check_Ticket} alt="" />
                            驗票 QR Code
                        </p>
                        <div className="qrcode">
                            <img src={qrcode} alt="" />
                            請使用此QR Code進場！
                        </div>
                    </div>
                    <div className="ticket-detail">
                        <p>
                            <img src={receip} alt="" />
                            票卷明細
                        </p>
                        <div className="detail-row">購票人： 李慶毅 先生</div>
                        <div className="detail-row">
                            學校信箱： c107118102@nkust.edu.tw
                        </div>
                        <div className="detail-row">聯絡電話： 0925420706</div>
                        <div className="detail-row">付款方式： 現金付款</div>
                        <div className="line">
                            <hr />
                        </div>
                        <div className="total-price">
                            總計金額
                            <p>350元</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="infomation">
                <div className="title">
                    <img src={cart_icon} alt="" />
                    購票資訊
                </div>
                <div className="container">
                    <div className="ticket-name">
                        <p className="act-name">
                            高科傳說對決生死賽
                            <font className="ticket-type">外系票</font>
                        </p>
                        <p className="group-name">
                            <img src={Organizer_icon} alt="" />
                            主辦單位：高雄科大資管系
                        </p>
                    </div>
                    <form className="buy-form">
                        <FormInput
                            Id="email"
                            Type="email"
                            ClassName="input-label"
                            Title="學校信箱(必填)"
                        />

                        <FormInput
                            Id="userName"
                            Type="text"
                            ClassName="input-label"
                            Title="姓名(必填)"
                        />

                        <FormInput
                            Id="telNumber"
                            Type="tel"
                            ClassName="input-label"
                            Title="聯絡電話(必填)"
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

                        <p>付款方式(目前暫未開放金流，近期會新增)</p>
                        <div className="input-radio-group">
                            <FormInput
                                Id="payment"
                                Type="radio"
                                ClassName=""
                                Title="現金付款"
                                value="cash"
                                name="payment"
                                checked
                            />
                        </div>

                        <hr />

                        <div className="total-price">
                            總計金額
                            <p>350 元</p>
                        </div>

                        <button className="buy-btn">確認購買</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default Infomation;
