import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";
import { decodeToken, selectMailFormate, deletePackageTicket } from "../agent";
import Swal from "sweetalert2";
import ClipboardCopy from "../common/ClipboardCopy.js";
// Img
import checked_icon from "../../images/checked_icon.svg";
import vector_gray_Icon from "../../images/vector_gray_Icon.svg";
import check_Ticket from "../../images/check_Ticket.svg";
import receip from "../../images/receip.svg";

const Information = () => {
    const [activityData, setActivityData] = useState("");
    const [ticketData, setTicketData] = useState("");
    const [userData, setUserData] = useState({
        actualname: "",
        mail: "",
        phone: "",
        NID: "",
        sex: true,
        is_active: false,
    });
    const [QRcode, setQRcode] = useState("");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const { id } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        if (id !== undefined) {
            const setupData = async () => {
                const tokenResponse = await decodeToken(id);
                // console.log(tokenResponse);
                if (tokenResponse.status === 200) {
                    switch (tokenResponse.data.status) {
                        case 0:
                            const mailResponse = await selectMailFormate(
                                tokenResponse.data.results.joinedList_Id
                            );
                            if (mailResponse.status === 200) {
                                switch (mailResponse.data.status) {
                                    case 0:
                                        const joined =
                                            mailResponse.data.results.joined;
                                        const ticket =
                                            mailResponse.data.results.ticket;
                                        setActivityData(
                                            mailResponse.data.results.act
                                        );
                                        setTicketData(
                                            mailResponse.data.results.ticket
                                        );
                                        setUserData(
                                            mailResponse.data.results.joined
                                        );
                                        setQRcode(
                                            mailResponse.data.results.QRcode
                                        );
                                        if (
                                            joined.payment == "online" &&
                                            !joined.is_pay &&
                                            ticket.count == ticket.peopleMaxium
                                        ) {
                                            Swal.fire({
                                                title: "????????????",
                                                confirmButtonText: "????????????",
                                                confirmButtonColor: "#ffb559",
                                                icon: "info",
                                            }).then(() => {
                                                history.push({
                                                    pathname: `/payment`,
                                                    state: {
                                                        joinedListId: joined.Id,
                                                        userData:
                                                            mailResponse.data
                                                                .results.joined,
                                                        ticketData:
                                                            mailResponse.data
                                                                .results.ticket,
                                                        activityData:
                                                            mailResponse.data
                                                                .results.act,
                                                    },
                                                });
                                            });
                                        }
                                        break;
                                    default:
                                        Swal.fire({
                                            title: "??????????????????",
                                            confirmButtonText: "??????",
                                            confirmButtonColor: "#ffb559",
                                            icon: "info",
                                        }).then(() => {
                                            history.push({
                                                pathname: "/",
                                            });
                                        });
                                        break;
                                }
                            } else {
                                // console.log(mailResponse);
                            }
                            break;
                        default:
                            Swal.fire({
                                title: "??????????????????",
                                confirmButtonText: "??????",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                history.push({
                                    pathname: "/",
                                });
                            });
                            break;
                    }
                } else {
                    // console.log(tokenResponse);
                }
            };
            setupData();
        }
    }, []);

    const deletePackage = async () => {
        // const response = await deletePackageTicket(packageId);
    };

    return (
        <>
            <div className="buy-ticket">
                {/* <div id="success">
                    <img src={checked_icon} alt="" />
                    <p>???????????????????????????????????????</p>
                </div> */}
                <div className="title">
                    <img src={vector_gray_Icon} alt="" />
                    ????????????
                </div>

                <div className="ticket-head">
                    {activityData.act_Name}
                    <font className="ticket-type">
                        <font id="black-dot">???</font>
                        {ticketData.ticket_Name}
                    </font>
                </div>
                <div className="ticket-qrcode">
                    <p>
                        <img src={check_Ticket} alt="" />
                        ?????? QR Code
                    </p>
                    {ticketData.is_pay ? (
                        <div className="qrcode">
                            <img src={`data:image/jpeg;base64,${QRcode}`} />
                            ????????????QR Code?????????
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                marginTop: "10px",
                                justifyContent: "center",
                            }}
                        >
                            <p
                                style={{
                                    display: "flex",
                                    width: "90%",
                                    justifyContent: "center",
                                }}
                            >
                                ???????????????????????????QR Code???
                                <br />
                                ???????????????????????????????????????????????????
                            </p>
                        </div>
                    )}
                </div>
                <div className="ticket-detail">
                    <p>
                        <img src={receip} alt="" />
                        ????????????
                    </p>
                    <div className="detail-row">
                        ???????????? {userData.actualname}{" "}
                        {userData.sex === true ? "??????" : "??????"}
                    </div>
                    <div className="detail-row">??????????????? {userData.mail}</div>
                    <div className="detail-row">
                        ??????????????? {userData.phone}
                    </div>
                    {ticketData.is_package ? (
                        <>
                            <div className="detail-row">
                                ???????????????
                                <ClipboardCopy
                                    copyText={`${window.location.origin}/packageInvite?code=${ticketData.vaild_code}`}
                                    className={"btn"}
                                />
                            </div>
                        </>
                    ) : null}
                    <div className="detail-row">
                        ???????????????{" "}
                        {userData.payment === "online"
                            ? "????????????"
                            : "????????????"}
                    </div>

                    {/* <div className="detail-row">
                        <input
                            className="btn"
                            type="button"
                            value="????????????"
                            onClick={deletePackage}
                        />
                    </div> */}
                    <div className="line">
                        <hr />
                    </div>
                    <div className="total-price">
                        ????????????
                        <p>{ticketData.price}???</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Information;
