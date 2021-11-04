import React from "react";
import * as routes from "../Router";
import { Link } from "react-router-dom";
// Img
import Fiesta_Banner from "../../images/Fiesta_Banner.jpg";
import CMS from "../../images/Official/CMS.png";
import OnePage from "../../images/Official/OnePage.png";
import Analyze from "../../images/Official/Analyze.png";
import GetKOL from "../../images/Official/GetKOL.png";

const Index = () => {
    return (
        <div className="official">
            <div className="banner">
                <div className="head-text">
                    活動行銷效益最大化/行銷效益看得到
                    <br />
                    幫你引流、轉單、客服、預測、推薦
                    <br />
                    讓你的活動越辦越輕鬆！
                    <p>
                        Saltar首創活動社群生態池
                        <br />
                        提供一站式優化活動行銷效益、售票/驗票、對話式行銷解決方案
                        <br />
                        讓活動方不需花費額外的行銷費用，就能大幅提升行銷效益！
                    </p>
                </div>
                <img src={Fiesta_Banner} />
            </div>

            <div className="spilt-part">
                <hr id="left-hr" />
                <p>
                    Saltar
                    <br />
                    屬於這個世代的活動行銷解決方案！
                </p>
                <hr id="right-hr" />
            </div>

            <div className="feature-box">
                <div className="left-box">
                    <img src={CMS} />
                </div>
                <div className="right-box">
                    <div className="text-box">
                        3分鐘、2步驟搞定你的
                        <br />
                        全通路活動售票頁
                        <p>
                            只需操作2個頁面，就能搞定全通路一頁式活動頁！
                            <br />
                            Saltar自動幫你串連Line的對話式行銷、販售管道!
                            <br />
                            Saltar將持續追加新功能，加量不加價！
                        </p>
                    </div>
                </div>
            </div>

            <div className="feature-box right-img-rwd">
                <div className="left-box">
                    <div className="text-box">
                        為你打造對話式商務
                        <br />
                        售票、取票、驗票超輕鬆
                        <br />
                        One Line 搞定！
                        <p>
                            Saltar提供「免費」的活動票務系統，自動幫你串接到
                            Line 上
                            <br />
                            顧客可以只用 Line 就完成購票、取票、驗票！
                            <br />
                            讓你能沒有壓力的選擇「最好的行銷/售票管道」！
                            <br />
                        </p>
                    </div>
                </div>
                <div className="right-box">
                    <img src={OnePage} />
                </div>
            </div>

            <div className="feature-box">
                <div className="left-box">
                    <img src={GetKOL} />
                </div>
                <div className="right-box">
                    <div className="text-box">
                        個人化專屬活動推薦
                        <br />
                        輕鬆打造精準行銷！
                        <p>
                            依照不同客戶投放個人化活動推薦
                            <br />
                            大幅提升轉換率及行銷效益
                            <br />
                            讓你的每一筆行銷預算都花的扎實！
                        </p>
                    </div>
                </div>
            </div>

            <div className="feature-box right-img-rwd">
                <div className="left-box">
                    <div className="text-box">
                        自動化分析/預測活動趨勢
                        <br />
                        輕鬆打造熱門活動！
                        <p>
                            Saltar提供完整的自動化客戶分析、流量分析
                            <br />
                            讓你賣出去的每張票、顧客操作的每個行為
                            <br />
                            都能夠成為下場活動的養分！
                        </p>
                    </div>
                </div>
                <div className="right-box">
                    <img src={Analyze} />
                </div>
            </div>

            <div className="feature-box">
                <div className="left-box">
                    <img src={GetKOL} />
                </div>
                <div className="right-box">
                    <div className="text-box">
                        一站管理多個渠道訊息
                        <br />
                        打造流暢的溝通管道！
                        <p>
                            Saltar整合Line、Message、Instagram
                            <br />
                            不需切換多種平台就能與客戶聯繫
                            <br />
                            讓你一站搞定各種客服管道！
                        </p>
                    </div>
                </div>
            </div>

            <div id="call-to-action">
                <p>Saltar</p>
                <p>屬於這個世代的活動行銷解決方案</p>
                <div className="footer-btn-group">
                    <Link to={routes.SIGNUP} className="CTABtn">
                        註冊以開始免費使用
                    </Link>
                    <Link to={routes.LOGIN} className="CTABtn">
                        有帳號了？點我登入
                    </Link>
                </div>
            </div>

            <footer>
                <p id="contact">
                    聯絡我們：
                    <br />
                    Email：
                    <a href="mailto:fiesta.network.taiwan@gmail.com">
                        fiesta.network.taiwan@gmail.com
                    </a>
                    <br />
                    Instagram：
                    <a href="https://www.instagram.com/saltar.tw/">saltar.tw</a>
                </p>
                <span>&copy; 2021 Fiesta. All Rights Reserved.</span>
            </footer>
        </div>
    );
};

export default Index;
