import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    selectTicketMember,
    updateTicketMember,
    deleteTicketMember,
    validTicket,
} from "../agent";
import { useSelector } from "react-redux";
import QrReader from "react-qr-reader";
import Swal from "sweetalert2";
// Img
import garbage_can_Icon from "../../images/garbage_can_Icon.svg";
import tick_Icon from "../../images/tick_Icon.svg";
import check_Ticket from "../../images/check_Ticket.svg";
import question from "../../images/question.png";
import money from "../../images/money.png";

const MemberList = () => {
    const { query } = useLocation();
    const [buyers, setBuyers] = useState([]);
    const [reload, setReload] = useState(true);
    const [inputTimer, setInputTimer] = useState(1000);
    const [checkboxTimer, setCheckboxTimer] = useState(false);
    const { groupId } = useSelector((state) => state.Account);

    useEffect(() => {
        const setupData = async () => {
            const buyers = [];
            for (let i = 0; i < query.tickets.length; i++) {
                const ticket = query.tickets[i];
                const response = await selectTicketMember(ticket.Id);
                // console.log(response);
                if (response.status === 200) {
                    switch (response.data.status) {
                        case 0:
                            response.data.results.forEach((buyer) => {
                                buyers.push({
                                    ...buyer,
                                });
                            });
                            break;
                    }
                }
            }
            console.log(buyers);
            setBuyers(buyers);
        };

        if (reload) {
            setupData();
            setReload(false);
        }
    }, [reload]);

    const payTicketHandle = async (e, buyer) => {
        e.preventDefault();
        const {
            Id,
            ticketId,
            customerInfo: customerId,
            is_active,
            is_vaild,
        } = buyer;
        const response = await updateTicketMember(
            Id,
            ticketId,
            customerId,
            is_active,
            is_vaild,
            true
        );
        if (response.status === 200) {
            switch (response.data.status) {
                case 0:
                    setReload(true);
                    break;
                default:
                    break;
            }
        }
    };

    const validTicketHandle = async (e, buyer) => {
        e.preventDefault();
        const {
            Id,
            ticketId,
            customerInfo: customerId,
            is_active,
            is_pay,
        } = buyer;
        const response = await updateTicketMember(
            Id,
            ticketId,
            customerId,
            is_active,
            true,
            is_pay
        );
        if (response.status === 200) {
            switch (response.data.status) {
                case 0:
                    setReload(true);
                    break;
                default:
                    break;
            }
        }
    };
    const DeleteTicketHandler = async (e, buyer) => {
        e.preventDefault();
        const { Id } = buyer;
        const response = await deleteTicketMember(Id);
        console.log(response);
        if (response.status === 200) {
            switch (response.data.status) {
                case 0:
                    setReload(true);
                    break;
                default:
                    break;
            }
        }
    };

    const inputTimerHandler = (e) => {
        setInputTimer(e.target.value);
    };
    const checkboxTimerHandler = (e) => {
        setCheckboxTimer(e.target.value);
    };

    const [CameraOpen, setCameraOpen] = useState(false);
    const cameraOpenHandler = () => {
        if (CameraOpen) {
            setCameraOpen(false);
        } else {
            setCameraOpen(true);
        }
    };
    const cameraQuestionHandler = () => {
        Swal.fire({
            title: "????????????????",
            text: "Windows10?????????????????????>?????????>(??????)??????>(??????)?????????????????????????????????",
            confirmButtonText: "??????",
            confirmButtonColor: "#ffb559",
        });
    };

    const [scanning, setScanning] = useState(false);
    const delay = 500;

    const scanHandler = async (QRresult) => {
        if (!scanning) {
            if (QRresult) {
                setScanning(true);
                const response = await validTicket(QRresult, groupId);
                if (response.status === 200) {
                    switch (response.data.status) {
                        case 0:
                            const { actualname, is_active, mail, phone, sex } =
                                response.data.results.joined;
                            const { act_Name } = response.data.results.act;
                            const { ticket_Name, price } =
                                response.data.results.ticket;
                            Swal.fire({
                                title: "????????????",
                                text: `${act_Name} ${ticket_Name} ${actualname}${
                                    sex === true ? "??????" : "??????"
                                }????????????`,
                                confirmButtonText: "??????",
                                confirmButtonColor: "#ffb559",
                                icon: "success",
                                timer: checkboxTimer ? inputTimer : null,
                            }).then(() => {
                                setReload(true);
                                setScanning(false);
                            });
                            break;
                        case 19:
                            Swal.fire({
                                title: "????????????",
                                confirmButtonText: "??????",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                setScanning(false);
                            });
                            break;
                        case 20:
                            Swal.fire({
                                title: "????????????????????????",
                                confirmButtonText: "??????",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                setScanning(false);
                            });
                            break;
                        case 21:
                            Swal.fire({
                                title: "???????????????",
                                confirmButtonText: "??????",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                setScanning(false);
                            });
                            break;
                        default:
                            Swal.fire({
                                title: "??????????????????",
                                confirmButtonText: "??????",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                setScanning(false);
                            });
                            break;
                    }
                }
            }
        }
    };

    const errorHandler = (error) => {
        console.log(error);
    };

    return (
        <>
            <div className="ticket-box">
                <div className="ticket-box-title">
                    <div className="scanner-group">
                        <div className="scanner-btn-group">
                            <button
                                className="scanner-btn"
                                id="scanner-ticket"
                                onClick={cameraOpenHandler}
                            >
                                <img src={check_Ticket} alt="" />
                            </button>
                            <button
                                className="scanner-btn"
                                id="questionIcon"
                                onClick={cameraQuestionHandler}
                            >
                                <img src={question} alt="" />
                            </button>
                        </div>

                        <div className="timer-row">
                            <label className="Timer-Setting">
                                ???
                                <input
                                    type="number"
                                    id="inputTimer"
                                    value={inputTimer}
                                    onChange={inputTimerHandler}
                                />
                                ????????????????????????????????????
                            </label>
                            <font className="Timer-tips">(1000??????=1???)</font>
                        </div>

                        <div className="check-row">
                            <label className="Timer-CheckBox">
                                <input
                                    type="checkbox"
                                    value={checkboxTimer}
                                    onChange={checkboxTimerHandler}
                                />
                                ????????????????????????????????????
                            </label>
                            <span className="Timer-tips">
                                (???????????????????????????????????????????????????)
                            </span>
                        </div>
                    </div>

                    {CameraOpen && (
                        <div className="scanner-box">
                            <QrReader
                                delay={delay}
                                onError={errorHandler}
                                onScan={scanHandler}
                                className="scanner"
                            />
                        </div>
                    )}

                    <p>??????????????????</p>
                    <hr />
                </div>
                <div className="member-row-box">
                    <div className="row-box-title">
                        <h6>????????????</h6>
                        <h6>????????????</h6>
                        <h6>????????????</h6>
                        <h6>??????????????????</h6>
                        <h6>??????????????????</h6>
                    </div>
                    {buyers
                        .filter((buyer) => {
                            return buyer.is_active;
                        })
                        .map((buyer, index) => {
                            const {
                                actualname,
                                phone,
                                ticketName,
                                is_vaild,
                                is_pay,
                            } = buyer;
                            return (
                                <div className="row-container">
                                    <h6 className="row-number">{index + 1}</h6>
                                    <div className="row-textbox">
                                        <h6 className="row-text act-name">
                                            {actualname}
                                        </h6>
                                        <h6 className="row-text">{phone}</h6>
                                        <h6 className="row-text">
                                            {ticketName}
                                        </h6>
                                        {is_vaild ? (
                                            <h6 className="row-text success">
                                                ?????????
                                            </h6>
                                        ) : (
                                            <h6 className="row-text fail">
                                                ?????????
                                            </h6>
                                        )}

                                        {is_pay ? (
                                            <h6 className="row-text success">
                                                ?????????
                                            </h6>
                                        ) : (
                                            <h6 className="row-text fail">
                                                ?????????
                                            </h6>
                                        )}

                                        <div className="row-btn-group">
                                            <button
                                                className="pay"
                                                onClick={(e) => {
                                                    payTicketHandle(e, buyer);
                                                }}
                                            >
                                                <img src={money} alt="" />
                                            </button>
                                            <button
                                                className="check"
                                                onClick={(e) => {
                                                    validTicketHandle(e, buyer);
                                                }}
                                            >
                                                <img src={tick_Icon} alt="" />
                                            </button>
                                            <button
                                                className="delete"
                                                onClick={(e) => {
                                                    DeleteTicketHandler(
                                                        e,
                                                        buyer
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={garbage_can_Icon}
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default MemberList;
