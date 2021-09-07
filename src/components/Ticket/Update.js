import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { updateTicket } from "../agent";
import Swal from "sweetalert2";

const Add = () => {
    const location = useLocation();
    const history = useHistory();
    const [ticket, setTicket] = useState({});
    const {
        Id: ticketId,
        act: actId,
        count,
        startTime,
        endTime,
        peopleMaxium: maximum,
        price: ticketPrice,
        ticket_Name: ticketName,
        actEndTime,
    } = ticket;

    const onNameChange = (e) => {
        const ticketName = e.target.value;
        setTicket({ ...ticket, ticket_Name: ticketName });
    };
    const onMaximumChange = (e) => {
        const maximum = e.target.value;
        setTicket({ ...ticket, peopleMaxium: maximum });
    };
    const onPriceChange = (e) => {
        const ticketPrice = e.target.value;
        setTicket({ ...ticket, ticketPrice: ticketPrice });
    };
    const onStartTimeChange = (e) => {
        const startTime = e.target.value;
        setTicket({ ...ticket, startTime: startTime });
    };
    const onEndTimeChange = (e) => {
        const endTime = e.target.value;
        setTicket({ ...ticket, endTime: endTime });
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
        const response = await updateTicket(
            ticketId,
            ticketName,
            maximum,
            startTime,
            endTime,
            ticketPrice,
            count,
            actId,
            true
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    Swal.fire({
                        title: "更新成功",
                        confirmButtonText: "繼續",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        history.push("/dashboard/ticketManagement");
                    });
                    break;
                default:
                    Swal.fire({
                        title: "更新失敗",
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
            setTicket({
                ...location.state.tickets,
                actEndTime: location.state.endTime,
            });
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
