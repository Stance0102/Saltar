import React, { useState } from "react";
// Img
import calendar from "../../images/calendar.svg";

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

    if (img != "") {
        setImgState(true);
    }

    const [PageState, setPageState] = useState(true);

    return (
        <div className="one-page">
            <form className="one-page-content">
                <ACT_Title />

                <ACT_Info />

                {imgState && <ACT_Img img="" />}

                <ACT_Img_Add />

                <ACT_Description />

                <ACT_Show />

                <Save_Btn />
            </form>
        </div>
    );
};

const ACT_Title = () => {
    return (
        <>
            <input
                type="text"
                className="act-name"
                value="高科傳說對決生死賽"
                id="actName"
            />
        </>
    );
};

const ACT_Info = () => {
    return (
        <>
            <div className="act-info">
                <div>
                    <img src={calendar} alt="" />
                    主辦單位：高雄科大資管系
                </div>
                <div>
                    <img src={calendar} alt="" />
                    <input
                        type="text"
                        id="location"
                        value="高雄科技大學第一校區"
                    />
                </div>
                <div>
                    <img src={calendar} alt="" />
                    <input type="text" id="starttime" value="2021/09/04" />
                </div>
            </div>
        </>
    );
};

const ACT_Img = (img) => {
    return <img src={img} alt="" className="act-img" />;
};

const ACT_Img_Add = () => {
    return (
        <div className="act-img-add">
            <img src={calendar} alt="" />
            <p>新增一張圖片</p>
        </div>
    );
};

const ACT_Description = () => {
    return (
        <div className="act-description">
            <div className="title">活動簡介</div>
            <textarea
                className="context"
                id="act-desctiption"
                rows="14"
                minlength="10"
                maxlength="2000"
                spellcheck="false"
            >
                spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheck="false"spellcheckpellcheck="false"spellcheck="false"spellcheck="false"spellcheck=
            </textarea>
        </div>
    );
};

const ACT_Show = () => {
    return (
        <ul className="act-show">
            <div className="title">活動即時資訊</div>
            {Shows.map((show, index) => {
                return <ACT_Show_Detail key={show.id} {...show} />;
            })}
        </ul>
    );
};

const ACT_Show_Detail = ({ time, showName, note }) => {
    return (
        <li>
            <div className="time">
                {time} {showName} <font>({note})</font>
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

export default OnePage;
