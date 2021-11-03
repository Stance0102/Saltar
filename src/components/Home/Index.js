import React from "react";
// Img
import Fiesta_Banner from "../../images/Fiesta_Banner.jpg";
import CMS from "../../images/Official/CMS.png";
import OnePage from "../../images/Official/OnePage.png";
import Analyze from "../../images/Official/Analyze.png";

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
                    屬於這個世代的活動解決方案！
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
                        全通路活動售票頁！
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

            <div className="feature-box">
                <div className="left-box">
                    <div className="text-box left-text">
                        打造對話式商務！
                        <br />
                        售票、取票、驗票超輕鬆！
                        <br />
                        One Line 搞定！
                        <p>
                            Saltar提供「免費」的活動票務系統，自動幫你串接到
                            Line 上
                            <br />
                            顧客可以只用 Line 就完成購票、取票、驗票！
                            <br />
                            讓你能沒有壓力的選擇「最好的售票管道」！
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
                    <img src={Analyze} />
                </div>
                <div className="right-box"></div>
            </div>
        </div>
    );
};

export default Index;
