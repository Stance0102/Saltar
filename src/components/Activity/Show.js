import React from "react";
import { getSchool } from "../agent";
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
console.log(getSchool());
const Show = () => {
    return (
        <div className="activity-box">
            <div className="activity-box-title">
                <p>活動節目</p>
                <hr />
                <div className="container">
                    <ul className="show">
                        <div className="show-title">活動即時資訊</div>
                        {Shows.map((show, index) => {
                            return <ShowDetail key={show.id} {...show} />;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ShowDetail = ({ time, showName, note }) => {
    return (
        <li>
            <div className="time">
                {time} {showName} <font>({note})</font>
            </div>
        </li>
    );
};

export default Show;
