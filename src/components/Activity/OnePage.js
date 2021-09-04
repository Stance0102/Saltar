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
            <div className="one-page-content">
                <ACT_Title />

                <ACT_Info />

                {imgState && <ACT_Img img="" />}

                <ACT_Img_Add />

                <ACT_Description />

                <ACT_Show />

                <Save_Btn />
            </div>
        </div>
    );
};

const ACT_Title = () => {
    return (
        <>
            <div className="act-name">高科傳說對決生死賽</div>
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
                    高雄科技大學第一校區
                </div>
                <div>
                    <img src={calendar} alt="" />
                    2021/09/04(六) - 2021/09/04(六)
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
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit,
                eum, quibusdam incidunt, dolores dolorum in velit quia voluptas
                eligendi beatae inventore. Nobis atque corrupti reprehenderit
                debitis obcaecati totam harum recusandae esse, quia temporibus
                cum officia aspernatur quas delectus incidunt vel veritatis
                voluptatem, minima doloremque libero repellat nulla commodi
                officiis eaque. Ipsa ab velit sunt aliquid explicabo eveniet et
                dolorem earum exercitationem omnis tenetur magnam, natus,
                delectus eos ut minus possimus iusto quibusdam quis eius
                voluptatem animi, laboriosam vero! Hic fuga dignissimos, quod
                repudiandae temporibus possimus asperiores ipsam, laudantium
                perferendis maxime ullam? Magni possimus ad vel temporibus
                laboriosam voluptatibus impedit consequatur autem explicabo
                harum omnis voluptate sint totam excepturi cumque, eveniet alias
                illo tempora? Pariatur nihil accusantium tempore quae et illo
                officiis nobis culpa distinctio consequatur cum sit vero
                aspernatur atque earum minima harum hic, in ex reprehenderit.
                Quia incidunt quod, suscipit excepturi voluptate quis architecto
                culpa asperiores nisi aut ab nemo cum adipisci laudantium minus
                pariatur reiciendis consequatur doloribus quasi dignissimos
                eligendi facilis rem dolores! Voluptates numquam magnam,
                architecto fuga saepe quis maiores animi totam dolor, commodi
                placeat vero dicta dolorum explicabo ipsum ipsam omnis,
                reprehenderit eaque reiciendis obcaecati ab. Pariatur a
                distinctio quos labore quibusdam consequatur totam temporibus
                expedita atque, officia soluta, dolorem sint asperiores, numquam
                dolorum aperiam. Quo rem velit laudantium aliquam aspernatur,
                soluta autem alias culpa perspiciatis nisi dignissimos
                doloremque reprehenderit officiis debitis hic, ducimus odio
                quaerat corporis. Vitae ipsam velit nisi, maxime illo expedita.
                Praesentium necessitatibus mollitia, culpa dolore animi, dolores
                minima molestiae aspernatur, deleniti temporibus sit nisi
                corrupti magni fugiat iste accusamus officiis architecto
                nesciunt aliquam voluptatem magnam nostrum odit eos id. Officia
                sint veniam consequatur aliquam? Quisquam officiis voluptas
                dignissimos, dicta facilis eveniet explicabo error voluptate
                delectus nobis ea corporis exercitationem in sed doloribus
                dolorum est ullam at hic consequuntur veritatis? Iste, a eos
                tempora error qui aliquam quaerat sapiente distinctio fugit
                possimus neque doloribus dolorem et id molestias doloremque non
                suscipit, quas placeat aut quibusdam voluptatum sit, autem
                excepturi? Velit odio iusto veniam aliquam neque repudiandae ab
                corrupti officiis doloribus, dolorum tempora deleniti saepe
                labore et sint eaque ducimus illo corporis autem. Nam sunt a
                atque possimus, autem porro! Eum, ipsum ullam autem eos iste
                quasi totam temporibus eligendi at animi minima rem maxime ea
                architecto deleniti provident hic suscipit omnis similique
                inventore tempore. Ab aperiam laborum magni sint, mollitia
                quibusdam quisquam sunt! Dolore nostrum dicta est rerum rem
                eligendi hic, adipisci ipsa!
            </p>
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
