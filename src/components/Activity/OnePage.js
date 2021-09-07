import React, { useState } from "react";
// Img
import calendar_icon from "../../images/calendar_icon.svg";
import Group_icon from "../../images/Group_icon.svg";
import tick_Icon from "../../images/tick_Icon.svg";
import cancel_Icon from "../../images/cancel_Icon.svg";
import location_icon from "../../images/location_icon.svg";
import Organizer_icon from "../../images/Organizer_icon.svg";

import Edit from "../Account/Edit";

let Shows = [
    {
        id: 1,
        time: "18:00",
        showName: "亂場",
        note: "亂場請務必脫掉口罩",
    },
    {
        id: 2,
        time: "19:00",
        showName: "亂場",
        note: "亂場請務必脫掉口罩",
    },
    {
        id: 3,
        time: "19:00",
        showName: "亂場",
        note: "亂場請務必脫掉口罩",
    },
    {
        id: 4,
        time: "19:00",
        showName: "亂場",
        note: "亂場請務必脫掉口罩",
    },
    {
        id: 5,
        time: "19:00",
        showName: "亂場",
        note: "亂場請務必脫掉口罩",
    },
    {
        id: 6,
        time: "19:00",
        showName: "亂場",
        note: "亂場請務必脫掉口罩",
    },
];

const OnePage = () => {
    const [img, setImg] = useState("");
    const [imgState, setImgState] = useState(false);
    const [editMode, setEditMode] = useState(true);
    const [saveMode, setSaveMode] = useState(false);

    if (img != "") {
        setImgState(true);
    }

    return (
        <div className="one-page">
            <form className="one-page-content">
                <ACT_Title editMode={editMode} />

                <ACT_Info editMode={editMode} />

                {imgState && <ACT_Img img="" />}

                {editMode && <ACT_Img_Add />}

                <ACT_Description editMode={editMode} />

                <ACT_Show editMode={editMode} />

                <Save_Btn />
            </form>
        </div>
    );
};

const ACT_Title = ({ editMode }) => {
    const [actTitle, setActTitle] = useState("高科傳說對決生死賽");

    function handleActTitle(e) {
        const act_Title = e.target.value;
        setActTitle(act_Title);
    }

    if (editMode) {
        return (
            <>
                <input
                    type="text"
                    className="act-name"
                    id="actName"
                    value={actTitle}
                    autoComplete="off"
                    required
                    onChange={handleActTitle}
                />
                {/* <Edit_Btn editMode={editMode} /> */}
            </>
        );
    } else {
        return (
            <>
                <div className="act-name">
                    高科傳說對決生死賽
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
            </>
        );
    }
};

const ACT_Info = ({ editMode }) => {
    const [actInfo, setActInfo] = useState({
        location: "高雄科技大學第一校區",
        starttime: "2021-09-04",
    });

    function handleActInfo(e) {
        setActInfo({
            [e.target.id]: e.target.value,
        });
    }

    if (editMode) {
        return (
            <>
                <div className="act-info">
                    <div>
                        <img src={Organizer_icon} alt="" />
                        高雄科大資管系
                    </div>
                    <div>
                        <img src={location_icon} alt="" />
                        <input
                            type="text"
                            id="location"
                            value={actInfo.location}
                            autoComplete="off"
                            onChange={handleActInfo}
                        />
                    </div>
                    <div>
                        <img src={calendar_icon} alt="" />
                        <input
                            type="text"
                            id="starttime"
                            value={actInfo.starttime}
                            onChange={handleActInfo}
                        />
                    </div>
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="act-info">
                    <div>
                        <img src={Organizer_icon} alt="" />
                        高雄科大資管系
                    </div>
                    <div>
                        <img src={location_icon} alt="" />
                        高雄科技大學第一校區
                    </div>
                    <div>
                        <img src={calendar_icon} alt="" />
                        2021/09/04
                    </div>
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
            </>
        );
    }
};

const ACT_Img = ({ img, editMode }) => {
    if (editMode) {
        return <img src={img} alt="" className="act-img" />;
    } else {
        return <img src={img} alt="" className="act-img" />;
    }
};

const ACT_Img_Add = () => {
    return (
        <div className="act-img-add">
            <img src={calendar_icon} alt="" />
            <p>新增一張圖片</p>
        </div>
    );
};

const ACT_Description = ({ editMode }) => {
    if (editMode) {
        return (
            <div className="act-description">
                <div className="title">
                    活動簡介
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
                <textarea
                    className="context"
                    id="act-desctiption"
                    rows="20"
                    minlength="10"
                    maxlength="2000"
                    spellcheck="false"
                >
                    哭哭活動似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。就我個人來說，哭哭活動對我的意義，不能不說非常重大。德謨克利特曾經提到過，一個人必須要么做個好人，要么仿效好人。這句話決定了一切。從這個角度來看，要想清楚，哭哭活動，到底是一種怎麼樣的存在。德謨克里特說過一句富有哲理的話，堅定不移的智慧是最寶貴的東西，勝過其餘的一切。希望大家能從這段話中有所收穫。
                    舒曼告訴我們，時髦的玩藝兒，只要表面的光彩一。希望各位能用心體會這段話。由於，每個人的一生中，幾乎可說碰到哭哭活動這件事，是必然會發生的。做好哭哭活動這件事，可以說已經成為了全民運動。
                    透過逆向歸納，得以用最佳的策略去分析哭哭活動。哭哭活動勢必能夠左右未來。哭哭活動的存在，令我無法停止對他的思考。哭哭活動必定會成為未來世界的新標準。這必定是個前衛大膽的想法。一般來說，哭哭活動對我來說有著舉足輕重的地位，必須要嚴肅認真的看待。阿拉伯說過一句發人省思的話，家裡有一個敵人，比門外有一千個敵人還壞。但願諸位理解後能從中有所成長。我們都有個共識，若問題很困難，那就勢必不好解決。哭哭活動究竟是怎麼樣的存在，始終是個謎題。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。若到今天結束時我們都還無法釐清哭哭活動的意義，那想必我們昨天也無法釐清。話雖如此，哭哭活動的發生，到底需要如何實現，不哭哭活動的發生，又會如何產生。若能夠洞悉哭哭活動各種層面的含義，勢必能讓思維再提高一個層級。說到哭哭活動，你會想到什麼呢？帶著這些問題，我們一起來審視哭哭活動。當前最急迫的事，想必就是釐清疑惑了。謹慎地來說，我們必須考慮到所有可能。我們都知道，只要有意義，那麼就必須慎重考慮。在人類的歷史中，我們總是盡了一切努力想搞懂哭哭活動。若無法徹底理解哭哭活動，恐怕會是人類的一大遺憾。對於一般人來說，哭哭活動究竟象徵著什麼呢？聶耳告訴我們，理智·思想腦筋若無正確的思想的培養，任它怎樣發達，這發達總是畸形的發達，那麼一切的行為都沒有穩定的正確的立足點。請諸位將這段話在心中默念三遍。我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。哭哭活動因何而發生？問題的關鍵看似不明確，但想必在諸位心中已有了明確的答案。如果此時我們選擇忽略哭哭活動，那後果可想而知。對哭哭活動進行深入研究，在現今時代已經無法避免了。總結來說，如果別人做得到，那我也可以做到。
                    我們需要淘汰舊有的觀念，我想，把小溫的意義想清楚，對各位來說並不是一件壞事。拉巴丁曾說過一句意義深遠的話，為被人愛而愛人，是人;
                    為愛人而愛人，是神。這激勵了我。生活中，若小溫出現了，我們就不得不考慮它出現了的事實。回過神才發現，思考小溫的存在意義，已讓我廢寢忘食。要想清楚，小溫，到底是一種怎麼樣的存在。經過上述討論，小溫必定會成為未來世界的新標準。看看別人，再想想自己，會發現問題的核心其實就在你身旁。岡察洛夫說過一句發人省思的話，人無疑是大地的主人，但又是胃腸的奴隸。但願諸位理解後能從中有所成長。我們不妨可以這樣來想:
                    車爾尼雪夫斯基說過一句著名的話，生命，如果跟時代的崇高的責任聯繫在一起，你就會感到永垂不朽。這不禁令我重新仔細的思考。鄧小平說過，在人才的問題上，要特別強調一下，必須打破常規去發現，選拔和培養傑出的人才。這不禁令我深思。
                    當你搞懂後就會明白了。當前最急迫的事，想必就是釐清疑惑了。
                    儘管如此，我們仍然需要對小溫保持懷疑的態度。小溫可以說是有著成為常識的趨勢。穆青相信，人要有新成就，就要有點精神。就要對黨、對人民、對事業有一股激情，有一種拼搏精神。這句話看似簡單，但其中的陰鬱不禁讓人深思。馬克思講過一段耐人尋思的話，一步實際運動比一打綱領更重要。這段話令我陷入了沈思。面對如此難題，我們必須設想周全。貝多芬說過一句很有意思的話，卓越的人一大優點是：在不利與艱難的遭遇裡百折不饒。這句話看似簡單，卻埋藏了深遠的意義。小溫，發生了會如何，不發生又會如何。這是不可避免的。那麼，我們都知道，只要有意義，那麼就必須慎重考慮。我們一般認為，抓住了問題的關鍵，其他一切則會迎刃而解。丁尼生曾講過，男思功名女盼愛。這句話把我們帶到了一個新的維度去思考這個問題。小溫的出現，必將帶領人類走向更高的巔峰。做好小溫這件事，可以說已經成為了全民運動。問題的關鍵究竟為何？話雖如此，如果別人做得到，那我也可以做到。王業寧曾經認為，要創新需要一定的靈感，這靈感不是天生的，而是來自長期的積累與全身心的投入。沒有積累就不會有創新。但願諸位理解後能從中有所成長。
                    克里索斯爾說過一句富有哲理的話，友誼有許多名字，然而一旦有青春和美貌介入，友誼便被稱作愛情，而且被神化為最美麗的天使。這啟發了我。我們不得不面對一個非常尷尬的事實，那就是，話雖如此，我們卻也不能夠這麼篤定。
                </textarea>
            </div>
        );
    } else {
        return (
            <div className="act-description">
                <div className="title">
                    活動簡介
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
                <div className="context">
                    哭哭活動似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。就我個人來說，哭哭活動對我的意義，不能不說非常重大。德謨克利特曾經提到過，一個人必須要么做個好人，要么仿效好人。這句話決定了一切。從這個角度來看，要想清楚，哭哭活動，到底是一種怎麼樣的存在。德謨克里特說過一句富有哲理的話，堅定不移的智慧是最寶貴的東西，勝過其餘的一切。希望大家能從這段話中有所收穫。
                    舒曼告訴我們，時髦的玩藝兒，只要表面的光彩一。希望各位能用心體會這段話。由於，每個人的一生中，幾乎可說碰到哭哭活動這件事，是必然會發生的。做好哭哭活動這件事，可以說已經成為了全民運動。
                    透過逆向歸納，得以用最佳的策略去分析哭哭活動。哭哭活動勢必能夠左右未來。哭哭活動的存在，令我無法停止對他的思考。哭哭活動必定會成為未來世界的新標準。這必定是個前衛大膽的想法。一般來說，哭哭活動對我來說有著舉足輕重的地位，必須要嚴肅認真的看待。阿拉伯說過一句發人省思的話，家裡有一個敵人，比門外有一千個敵人還壞。但願諸位理解後能從中有所成長。我們都有個共識，若問題很困難，那就勢必不好解決。哭哭活動究竟是怎麼樣的存在，始終是個謎題。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。若到今天結束時我們都還無法釐清哭哭活動的意義，那想必我們昨天也無法釐清。話雖如此，哭哭活動的發生，到底需要如何實現，不哭哭活動的發生，又會如何產生。若能夠洞悉哭哭活動各種層面的含義，勢必能讓思維再提高一個層級。說到哭哭活動，你會想到什麼呢？帶著這些問題，我們一起來審視哭哭活動。當前最急迫的事，想必就是釐清疑惑了。謹慎地來說，我們必須考慮到所有可能。我們都知道，只要有意義，那麼就必須慎重考慮。在人類的歷史中，我們總是盡了一切努力想搞懂哭哭活動。若無法徹底理解哭哭活動，恐怕會是人類的一大遺憾。對於一般人來說，哭哭活動究竟象徵著什麼呢？聶耳告訴我們，理智·思想腦筋若無正確的思想的培養，任它怎樣發達，這發達總是畸形的發達，那麼一切的行為都沒有穩定的正確的立足點。請諸位將這段話在心中默念三遍。我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。哭哭活動因何而發生？問題的關鍵看似不明確，但想必在諸位心中已有了明確的答案。如果此時我們選擇忽略哭哭活動，那後果可想而知。對哭哭活動進行深入研究，在現今時代已經無法避免了。總結來說，如果別人做得到，那我也可以做到。
                    我們需要淘汰舊有的觀念，我想，把小溫的意義想清楚，對各位來說並不是一件壞事。拉巴丁曾說過一句意義深遠的話，為被人愛而愛人，是人;
                    為愛人而愛人，是神。這激勵了我。生活中，若小溫出現了，我們就不得不考慮它出現了的事實。回過神才發現，思考小溫的存在意義，已讓我廢寢忘食。要想清楚，小溫，到底是一種怎麼樣的存在。經過上述討論，小溫必定會成為未來世界的新標準。看看別人，再想想自己，會發現問題的核心其實就在你身旁。岡察洛夫說過一句發人省思的話，人無疑是大地的主人，但又是胃腸的奴隸。但願諸位理解後能從中有所成長。我們不妨可以這樣來想:
                    車爾尼雪夫斯基說過一句著名的話，生命，如果跟時代的崇高的責任聯繫在一起，你就會感到永垂不朽。這不禁令我重新仔細的思考。鄧小平說過，在人才的問題上，要特別強調一下，必須打破常規去發現，選拔和培養傑出的人才。這不禁令我深思。
                    當你搞懂後就會明白了。當前最急迫的事，想必就是釐清疑惑了。
                    儘管如此，我們仍然需要對小溫保持懷疑的態度。小溫可以說是有著成為常識的趨勢。穆青相信，人要有新成就，就要有點精神。就要對黨、對人民、對事業有一股激情，有一種拼搏精神。這句話看似簡單，但其中的陰鬱不禁讓人深思。馬克思講過一段耐人尋思的話，一步實際運動比一打綱領更重要。這段話令我陷入了沈思。面對如此難題，我們必須設想周全。貝多芬說過一句很有意思的話，卓越的人一大優點是：在不利與艱難的遭遇裡百折不饒。這句話看似簡單，卻埋藏了深遠的意義。小溫，發生了會如何，不發生又會如何。這是不可避免的。那麼，我們都知道，只要有意義，那麼就必須慎重考慮。我們一般認為，抓住了問題的關鍵，其他一切則會迎刃而解。丁尼生曾講過，男思功名女盼愛。這句話把我們帶到了一個新的維度去思考這個問題。小溫的出現，必將帶領人類走向更高的巔峰。做好小溫這件事，可以說已經成為了全民運動。問題的關鍵究竟為何？話雖如此，如果別人做得到，那我也可以做到。王業寧曾經認為，要創新需要一定的靈感，這靈感不是天生的，而是來自長期的積累與全身心的投入。沒有積累就不會有創新。但願諸位理解後能從中有所成長。
                    克里索斯爾說過一句富有哲理的話，友誼有許多名字，然而一旦有青春和美貌介入，友誼便被稱作愛情，而且被神化為最美麗的天使。這啟發了我。我們不得不面對一個非常尷尬的事實，那就是，話雖如此，我們卻也不能夠這麼篤定。
                </div>
            </div>
        );
    }
};

const ACT_Show = ({ editMode }) => {
    if (editMode) {
        return (
            <ul className="act-show">
                <div className="title">
                    活動即時資訊
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
                {Shows.map((show, index) => {
                    return <ACT_Show_Detail key={show.id} {...show} />;
                })}
                <li>
                    <div className="time">
                        <input type="time" />{" "}
                        <input type="text" placeholder="節目名稱" />
                        <font>
                            <input type="text" placeholder="備註" />
                        </font>
                    </div>
                </li>
            </ul>
        );
    } else {
        return (
            <ul className="act-show">
                <div className="title">
                    活動即時資訊
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
                {Shows.map((show, index) => {
                    return <ACT_Show_Detail key={show.id} {...show} />;
                })}
            </ul>
        );
    }
};

const ACT_Show_Detail = ({ time, showName, note }) => {
    return (
        <li>
            <div className="time">
                {time} {showName} <font className="note">({note})</font>
            </div>
        </li>
    );
};

const Save_Btn = () => {
    return (
        <button className="save-btn" type="submit">
            儲存
        </button>
    );
};

const Edit_Btn = ({ editMode }) => {
    if (editMode) {
        return (
            <>
                <button className="edit-btn">
                    <img src={tick_Icon} alt="" />
                </button>
                <button className="edit-btn">
                    <img src={cancel_Icon} alt="" />
                </button>
            </>
        );
    } else {
        return (
            <button className="edit-btn">
                <img src={Group_icon} alt="" />
            </button>
        );
    }
};

export default OnePage;
