import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { updateTicket } from "../agent";
import Swal from "sweetalert2";
import { FormInput } from "../Home/_Components";

const Update = () => {
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
        setTicket({ ...ticket, price: ticketPrice });
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
            ticketName === "" ||
            maximum === "" ||
            ticketPrice === "" ||
            startTime === "" ||
            endTime === ""
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
            actId,
            true
        );
        if (response.status === 200) {
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
            // console.log(response);
        }
    };

    useEffect(() => {
        if (location.state !== undefined) {
            setTicket({
                ...location.state.tickets,
                actEndTime: location.state.endTime,
            });
        }
    }, []);

    return (
        <div className="ticket-box">
            <div className="ticket-box-title">
                <p>修改票卷</p>
                <hr />
            </div>
            <div className="container">
                <form className="ticket-form" onSubmit={submitHandler}>
                    <FormInput
                        Id="ticketName"
                        ClassName="input-label"
                        Type="text"
                        Handler={onNameChange}
                        Title="票種名稱"
                        value={ticketName}
                    />

                    <FormInput
                        Id="peopleMaximum"
                        ClassName="input-label"
                        Type="number"
                        Handler={onMaximumChange}
                        Title="人數上限"
                        value={maximum}
                    />

                    <FormInput
                        Id="price"
                        ClassName="input-label"
                        Type="number"
                        mix="0"
                        step="any"
                        Handler={onPriceChange}
                        Title="票卷金額"
                        value={ticketPrice}
                    />

                    <FormInput
                        Id="startDate"
                        ClassName="input-label"
                        Type="date"
                        Handler={onStartTimeChange}
                        Title="開始時間"
                        max={actEndTime}
                        value={startTime}
                    />

                    <FormInput
                        Id="endDate"
                        ClassName="input-label"
                        Type="date"
                        Handler={onEndTimeChange}
                        Title="結束時間"
                        max={actEndTime}
                        value={endTime}
                    />
                    <div className="form-btn-group">
                        <button className="form-save" type="submit">
                            修改
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;
