import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { createTicket } from "../agent";
import Swal from "sweetalert2";

const Add = () => {
    const location = useLocation();
    const history = useHistory();
    const [actId, setActId] = useState("");
    const [actEndTime, setActEndTime] = useState("");
    const [ticketName, setTicketName] = useState("");
    const [maximum, setMaximum] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const onNameChange = (e) => {
        const ticketName = e.target.value;
        setTicketName(ticketName);
    };
    const onMaximumChange = (e) => {
        const maximum = e.target.value;
        setMaximum(maximum);
    };
    const onPriceChange = (e) => {
        const ticketPrice = e.target.value;
        setTicketPrice(ticketPrice);
    };
    const onStartTimeChange = (e) => {
        const startTime = e.target.value;
        setStartTime(startTime);
    };
    const onEndTimeChange = (e) => {
        const endTime = e.target.value;
        setEndTime(endTime);
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            ticketName == "" ||
            maximum == "" ||
            ticketPrice == "" ||
            startTime == "" ||
            endTime == ""
        ) {
            return;
        }
        const response = await createTicket(
            actId,
            ticketName,
            maximum,
            startTime,
            endTime,
            ticketPrice,
            true
        );
        console.log(response);
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "新增成功",
                        confirmButtonText: "繼續",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        history.push("/dashboard/ticketManagement");
                    });
                    break;
                default:
                    Swal.fire({
                        title: "新增失敗",
                        text: JSON.stringify(response.data.results),
                        confirmButtonText: "知道了",
                        confirmButtonColor: "#ffb559",
                        icon: "error",
                    });
                    break;
            }
        } else {
            console.log(response);
        }
    };

    useEffect(() => {
        if (location.state != undefined) {
            setActId(location.state.actId);
            setActEndTime(location.state.endTime);
        }
    }, []);

    return (
        <div className="ticket-box">
            <div className="ticket-box-title">
                <p>新增票卷</p>
                <hr />
            </div>
            <div className="container">
                <form className="ticket-form" onSubmit={submitHandler}>
                    <div className="input-group">
                        <label className="input-label" for="ticketName">
                            票種名稱
                        </label>
                        <input
                            type="text"
                            name=""
                            id="ticketName"
                            value={ticketName}
                            onChange={(e) => onNameChange(e)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" for="peopleMaximum">
                            人數上限
                        </label>
                        <input
                            type="number"
                            name=""
                            id="peopleMaximum"
                            value={maximum}
                            onChange={(e) => onMaximumChange(e)}
                        />
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
                            value={ticketPrice}
                            onChange={(e) => onPriceChange(e)}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label" for="price">
                            開始時間
                        </label>
                        <input
                            type="date"
                            max={actEndTime}
                            value={startTime}
                            onChange={(e) => onStartTimeChange(e)}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label" for="price">
                            結束時間
                        </label>
                        <input
                            type="date"
                            max={actEndTime}
                            value={endTime}
                            onChange={(e) => onEndTimeChange(e)}
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

export default Add;
