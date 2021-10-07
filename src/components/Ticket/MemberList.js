import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { selectTicketMember, updateTicketMember, validTicket } from "../agent";
import { useSelector } from "react-redux";
import QrReader from "react-qr-reader";
// Img
import garbage_can_Icon from "../../images/garbage_can_Icon.svg";
import tick_Icon from "../../images/tick_Icon.svg";
import check_Ticket from "../../images/check_Ticket.svg";

const MemberList = () => {
    const { query } = useLocation();
    const [buyers, setBuyers] = useState([]);
    const [reload, setReload] = useState(true);
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

    const handleValidTicket = async (e, buyer) => {
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
    const handleDeleteTicket = async (e, buyer) => {
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

    const [QRresult, setResult] = useState("No result");
    const delay = 500;

    const handleScan = (QRresult) => {
        if (QRresult) {
            setResult(QRresult);
            console.log(QRresult);
        }
    };

    const handleError = (error) => {
        console.log(error);
    };

    return (
        <>
            <div className="ticket-box">
                <div className="ticket-box-title">
                    <div className="btn-group">
                        <button className="scanner-btn">
                            <img src={check_Ticket} alt="" />
                        </button>
                    </div>
                    <div className="scanner-box">
                        <QrReader
                            delay={delay}
                            onError={handleError}
                            onScan={handleScan}
                            className="scanner"
                        />
                    </div>
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
                                            <h6 className="row-text success">
                                                未使用
                                            </h6>
                                        )}

                                        <div className="row-btn-group">
                                            <button
                                                className="check"
                                                onClick={(e) => {
                                                    handleValidTicket(e, buyer);
                                                }}
                                            >
                                                <img src={tick_Icon} alt="" />
                                            </button>
                                            <button
                                                className="delete"
                                                onClick={(e) => {
                                                    handleDeleteTicket(
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
