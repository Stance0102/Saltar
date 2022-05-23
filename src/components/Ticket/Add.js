import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { createTicket } from "../agent";
import Swal from "sweetalert2";
import ReactTooltip from "react-tooltip";
import { FormInput } from "../Home/_Components";

const Add = () => {
    const location = useLocation();
    const history = useHistory();
    const [ticket, setTicket] = useState({
        IsPackage: false,
    });
    const {
        actId,
        startTime,
        endTime,
        entryTime,
        maximum,
        IsPackage,
        packageTime,
        ticketPrice,
        ticketName,
        actEndTime,
    } = ticket;

    const onIsPackageChange = (e) => {
        const IsPackage = e.target.value;
        setTicket({ ...ticket, IsPackage: IsPackage === "true" });
    };
    const onPackageTimeChange = (e) => {
        const packageTime = e.target.value;
        setTicket({ ...ticket, packageTime: packageTime });
    };
    const onNameChange = (e) => {
        const ticketName = e.target.value;
        setTicket({ ...ticket, ticketName: ticketName });
    };
    const onMaximumChange = (e) => {
        const maximum = e.target.value;
        setTicket({ ...ticket, maximum: maximum });
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
    const onEntryTimeChange = (e) => {
        const entryTime = e.target.value;
        setTicket({ ...ticket, entryTime: entryTime });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            ticketName == "" ||
            maximum == "" ||
            ticketPrice == "" ||
            startTime == "" ||
            endTime == "" ||
            entryTime == ""
        ) {
            Swal.fire({
                title: "資料完整填寫",
                confirmButtonText: "繼續",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
            return;
        }
        if (IsPackage && packageTime <= 0) {
            Swal.fire({
                title: "組團限制時間不能低於1小時",
                confirmButtonText: "繼續",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
            return;
        }
        const response = await createTicket(
            actId,
            ticketName,
            maximum,
            startTime,
            endTime,
            entryTime,
            ticketPrice,
            IsPackage,
            IsPackage ? packageTime : 0,
            true
        );
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
            // console.log(response);
        }
    };

    useEffect(() => {
        if (location.state != undefined) {
            setTicket({
                ...ticket,
                actId: location.state.actId,
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
                    <div className="input-radio-group">
                        <FormInput
                            Type="radio"
                            name="IsPackage"
                            Handler={onIsPackageChange}
                            value={false}
                            defaultChecked={true}
                            Title="一般票"
                        />
                        <FormInput
                            Type="radio"
                            name="IsPackage"
                            Handler={onIsPackageChange}
                            value={true}
                            Title="套票"
                        />
                        <div data-tip="套票只能由一個發起人購買，其他購買者需透過他提供的連結購買">
                            ？
                        </div>
                        <ReactTooltip place="top" type="dark" effect="solid" />
                    </div>

                    {IsPackage ? (
                        <FormInput
                            Id="ticketName"
                            ClassName="input-label"
                            Type="number"
                            min="1"
                            Handler={onPackageTimeChange}
                            Title="組團限制時間"
                            notice="從購買後開始計算，時間到達後，該票券就無法繼續邀請其他人購買(以小時為單位)"
                        />
                    ) : null}

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
                        Type="datetime-local"
                        Handler={onStartTimeChange}
                        Title="開始時間"
                        max={actEndTime}
                        value={startTime}
                    />
                    <FormInput
                        Id="endDate"
                        ClassName="input-label"
                        Type="datetime-local"
                        Handler={onEndTimeChange}
                        Title="結束時間"
                        max={actEndTime}
                        value={endTime}
                    />
                    <FormInput
                        Id="endDate"
                        ClassName="input-label"
                        Type="datetime-local"
                        Handler={onEntryTimeChange}
                        Title="入場時間"
                        min={startTime}
                        value={entryTime}
                    />
                    <div className="form-btn-group">
                        <button className="form-save" type="submit">
                            新增
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;
