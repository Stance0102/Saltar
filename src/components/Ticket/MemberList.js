import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { selectTicketMember, updateTicketMember, validTicket } from "../agent";
import { useSelector } from "react-redux";
import QrReader from "react-qr-reader";
import Swal from "sweetalert2";
import { FormInput } from "../Home/_Components";
// Img
import garbage_can_Icon from "../../images/garbage_can_Icon.svg";
import tick_Icon from "../../images/tick_Icon.svg";
import check_Ticket from "../../images/check_Ticket.svg";
import question from "../../images/question.png";

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
                                    ticketName: ticket.ticket_Name,
                                });
                            });
                            break;
                    }
                }
            }
            // console.log(buyers);
            setBuyers(buyers);
        };

        if (reload) {
            setupData();
            setReload(false);
        }
    }, [reload]);

    const validTicketHandle = async (e, buyer) => {
        e.preventDefault();
        const {
            Id,
            actualname,
            phone,
            mail,
            ticket: ticketId,
            sex,
            NID,
            is_active,
        } = buyer;
        const response = await updateTicketMember(
            Id,
            actualname,
            phone,
            mail,
            ticketId,
            sex,
            NID,
            is_active,
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
    const DeleteTicketHandler = async (e, buyer) => {
        e.preventDefault();
        const {
            Id,
            actualname,
            phone,
            mail,
            ticket: ticketId,
            sex,
            NID,
            is_vaild,
        } = buyer;
        const response = await updateTicketMember(
            Id,
            actualname,
            phone,
            mail,
            ticketId,
            sex,
            NID,
            false,
            is_vaild
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
            title: "鏡頭打不開?",
            text: "Windows10需要透過：設定>隱私權>(左側)相機>(下滑)允許傳統型應用程式存取",
            confirmButtonText: "繼續",
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
                                title: "驗證成功",
                                text: `${act_Name} ${ticket_Name} ${actualname}${
                                    sex === true ? "先生" : "小姐"
                                }驗證成功`,
                                confirmButtonText: "繼續",
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
                                title: "查無票卷",
                                confirmButtonText: "繼續",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                setScanning(false);
                            });
                            break;
                        case 20:
                            Swal.fire({
                                title: "此票券已驗證過了",
                                confirmButtonText: "繼續",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                setScanning(false);
                            });
                            break;
                        default:
                            Swal.fire({
                                title: "發生意外錯誤",
                                confirmButtonText: "繼續",
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
                                在
                                <input
                                    type="number"
                                    id="inputTimer"
                                    value={inputTimer}
                                    onChange={inputTimerHandler}
                                />
                                毫秒後確認視窗將自動關閉
                            </label>
                            <font className="Timer-tips">(1000毫秒=1秒)</font>
                        </div>

                        <div className="check-row">
                            <label className="Timer-CheckBox">
                                <input
                                    type="checkbox"
                                    value={checkboxTimer}
                                    onChange={checkboxTimerHandler}
                                />
                                驗票成功自動關閉確認視窗
                            </label>
                            <span className="Timer-tips">
                                (打勾才會在設定的時間後自動關閉喔！)
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

                    <p>活動參加狀況</p>
                    <hr />
                </div>
                <div className="member-row-box">
                    <div className="row-box-title">
                        <h6>同學姓名</h6>
                        <h6>手機號碼</h6>
                        <h6>票卷種類</h6>
                        <h6>票卷使用狀態</h6>
                    </div>
                    {buyers
                        .filter((buyer) => {
                            return buyer.is_active;
                        })
                        .map((buyer, index) => {
                            const { actualname, phone, ticketName, is_vaild } =
                                buyer;
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
                                                已使用
                                            </h6>
                                        ) : (
                                            <h6 className="row-text fail">
                                                未使用
                                            </h6>
                                        )}

                                        <div className="row-btn-group">
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
                    {/* <div className="row-container">
                        <h6 className="row-number">01</h6>
                        <div className="row-textbox">
                            <h6 className="row-text act-name">李慶毅</h6>
                            <h6 className="row-text">0925420706</h6>
                            <h6 className="row-text">外系票</h6>
                            <h6 className="row-text success">已使用</h6>
                            <div className="row-btn-group">
                                <button className="check">
                                    <img src={tick_Icon} alt="" />
                                </button>
                                <button className="delete">
                                    <img src={garbage_can_Icon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row-container">
                        <h6 className="row-number">02</h6>
                        <div className="row-textbox">
                            <h6 className="row-text">李慶毅</h6>
                            <h6 className="row-text">0925420706</h6>
                            <h6 className="row-text">非外系票</h6>
                            <h6 className="row-text fail">未使用</h6>
                            <div className="row-btn-group">
                                <button className="check">
                                    <img src={tick_Icon} alt="" />
                                </button>
                                <button className="delete">
                                    <img src={garbage_can_Icon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default MemberList;
