import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllInOne } from "../agent";
import LineLogin from "../Account/LineLogin";
import Swal from "sweetalert2";
// Img
import calendar_icon from "../../images/calendar_icon.svg";
import location_icon from "../../images/location_icon.svg";
import Organizer_icon from "../../images/Organizer_icon.svg";
import fiesta from "../../images/fiesta.PNG";

// import Edit from "../Account/Edit";

const OnePage = ({ activityId }) => {
    const { groupId, name } = useSelector((state) => state.Account);
    const location = useLocation();
    const history = useHistory();
    const [editMode, setEditMode] = useState(false);
    const [activityData, setActivityData] = useState({
        title: "",
        location: "",
        startTime: "",
        endTime: "",
        currentStartTime: "",
        currentEndTime: "",
        description: "",
        showTime: "",
        showName: "",
        showNote: "",
        org_Name: name,
        shows: [],
        tickets: [],
        imageFiles: [],
        imagePreview: [],
    });

    useEffect(() => {
        if (location.state !== undefined) {
            activityId = location.state.activityId;
        }
        if (activityId !== undefined) {
            const setupData = async () => {
                let activity = {};
                let shows = [];
                let tickets = [];
                let imagePreview = [];
                const allInOneResponse = await getAllInOne(activityId);
                if (allInOneResponse.status === 200) {
                    switch (allInOneResponse.data.status) {
                        case 0:
                            if (allInOneResponse.data.results.length !== 0) {
                                const {
                                    act_Name: title,
                                    description,
                                    startTime,
                                    endTime,
                                    location,
                                    organizer,
                                } = allInOneResponse.data.results.act;
                                activity = {
                                    title: title,
                                    description: description,
                                    currentStartTime: startTime,
                                    currentEndTime: endTime,
                                    startTime: startTime.split(" ")[0],
                                    endTime: endTime.split(" ")[0],
                                    location: location,
                                    org_Name: organizer,
                                };
                                shows = allInOneResponse.data.results.show;
                                tickets = allInOneResponse.data.results.tickets;
                                allInOneResponse.data.results.photos.forEach(
                                    (photo) => {
                                        imagePreview.push(photo.url);
                                    }
                                );
                            }
                            break;
                        default:
                            Swal.fire({
                                title: "???????????????",
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
                    // console.log(allInOneResponse);
                }
                setActivityData({
                    ...activityData,
                    ...activity,
                    shows: shows,
                    tickets: tickets,
                    imagePreview: imagePreview,
                });
            };
            setupData();
        }
    }, [location]);

    const { uid } = useSelector((state) => state.Customer);

    const buyTicketHandler = (e, ticketId) => {
        e.preventDefault();
        if (uid == "") {
            localStorage.setItem("lineReDirect", "onePage");
            localStorage.setItem("lineReDirectId", activityId);
            // const dispatch = useDispatch();
            // let localStorageToken = localStorage.getItem("token");

            // if (localStorageToken !== "" || localStorageToken !== null) {
            //     dispatch(setCustomer(localStorageToken));
            // }
            LineLogin();
        } else {
            const tempActivityData = {
                ...activityData,
                act_Name: activityData.title,
            };
            history.push({
                pathname: "/buyTicket",
                state: { ticketId: ticketId, activityData: tempActivityData },
            });
        }
    };

    return (
        <div className="one-page">
            <form className="one-page-content">
                <ACT_Title editMode={editMode} {...activityData} />

                <ACT_Info editMode={editMode} name={name} {...activityData} />

                {activityData.imagePreview.map((image) => {
                    return <ACT_Img img={image} />;
                })}

                <ACT_Description editMode={editMode} {...activityData} />

                <ACT_Show editMode={editMode} {...activityData} />

                <div className="act-ticket-box">
                    <ACT_Ticket
                        {...activityData}
                        buyTicketHandler={buyTicketHandler}
                    />
                </div>

                <Save_Btn editMode={editMode} />
            </form>
        </div>
    );
};

const ACT_Title = ({ editMode, title, onTitleChange }) => {
    if (editMode) {
        return (
            <>
                <input
                    type="text"
                    className="act-name"
                    value={title}
                    placeholder="?????????????????????"
                    id="actName"
                    autoComplete="off"
                    required
                    onChange={(e) => onTitleChange(e)}
                />
            </>
        );
    } else {
        return (
            <>
                <div className="act-name">{title}</div>
            </>
        );
    }
};

const ACT_Info = ({
    editMode,
    org_Name,
    location,
    startTime,
    endTime,
    onLocationChange,
    onStartTimeChange,
    onEndTimeChange,
}) => {
    if (editMode) {
        return (
            <>
                <div className="act-info">
                    <div>
                        <img src={Organizer_icon} alt="" />
                        {org_Name}
                    </div>
                    <div>
                        <img src={location_icon} alt="" />
                        <input
                            type="text"
                            id="location"
                            placeholder="?????????????????????"
                            value={location}
                            autoComplete="off"
                            onChange={(e) => onLocationChange(e)}
                        />
                    </div>
                    <div>
                        <img src={calendar_icon} alt="" />
                        <input
                            type="date"
                            id="starttime"
                            className="datetime"
                            value={startTime}
                            onChange={(e) => onStartTimeChange(e)}
                        />
                        ???
                        <input
                            type="date"
                            id="endtime"
                            className="datetime"
                            value={endTime}
                            onChange={(e) => onEndTimeChange(e)}
                        />
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="act-info">
                    <div>
                        <img src={Organizer_icon} alt="" />
                        {org_Name}
                    </div>
                    <div>
                        <img src={location_icon} alt="" />
                        {location}
                    </div>
                    <div>
                        <img src={calendar_icon} alt="" />
                        {startTime} ??? {endTime}
                    </div>

                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
            </>
        );
    }
};

const ACT_Img = ({ img, editMode }) => {
    if (editMode) {
        return <img src={img} alt="" className="act-img" />;
    } else {
        return <img src={img} alt="" className="act-img" />;
    }
};

const ACT_Img_Add = ({ onImageAddClick, fileInput }) => {
    return (
        <div
            className="act-img-add"
            onClick={() => {
                fileInput.current.click();
            }}
        >
            <input
                type="file"
                ref={fileInput}
                accept="image/png, image/jpeg"
                multiple
                onChange={(e) => onImageAddClick(e)}
                onClick={(e) => {
                    e.target.value = null;
                }}
                hidden
            />
            <img src={calendar_icon} alt="" />
            <p>??????????????????</p>
        </div>
    );
};

const ACT_Description = ({ editMode, description, onDescriptionChange }) => {
    if (editMode) {
        return (
            <div className="act-description">
                <div className="title">????????????</div>
                <textarea
                    className="context"
                    id="act-desctiption"
                    rows="20"
                    minLength="10"
                    maxLength="2000"
                    spellCheck="false"
                    value={description}
                    placeholder="????????????????????????2000?????????"
                    onChange={(e) => onDescriptionChange(e)}
                />
            </div>
        );
    } else {
        return (
            <div className="act-description">
                <div className="title">????????????</div>
                <pre className="context">{description}</pre>
            </div>
        );
    }
};

const ACT_Show = ({
    editMode,
    handleCreateShow,
    onShowTimeChange,
    onShowNameChange,
    onshowNoteChange,
    shows,
    showTime,
    showName,
    showNote,
}) => {
    if (editMode) {
        return (
            <ul className="act-show">
                <div className="title">??????????????????</div>
                {shows.map((show, index) => {
                    return <ACT_Show_Detail key={show.id} {...show} />;
                })}
                <li>
                    <div className="time">
                        <input
                            type="time"
                            value={showTime}
                            onChange={(e) => onShowTimeChange(e)}
                        />
                        <input
                            type="text"
                            placeholder="????????????"
                            value={showName}
                            onChange={(e) => onShowNameChange(e)}
                        />
                        <font>
                            <input
                                type="text"
                                placeholder="??????"
                                value={showNote}
                                onChange={(e) => onshowNoteChange(e)}
                            />
                        </font>
                        <button
                            className="add-btn"
                            onClick={(e) => handleCreateShow(e)}
                        >
                            +
                        </button>
                    </div>
                </li>
            </ul>
        );
    } else {
        return (
            <ul className="act-show">
                <div className="title">??????????????????</div>
                {shows.map((show, index) => {
                    return <ACT_Show_Detail key={show.id} {...show} />;
                })}
            </ul>
        );
    }
};

const ACT_Show_Detail = ({ showTime, show_Name, detail }) => {
    return (
        <li>
            <div className="time">
                {showTime.split(" ")[1]} {show_Name}{" "}
                <font className="note">({detail})</font>
            </div>
        </li>
    );
};

const ACT_Ticket = ({ tickets, org_Name, buyTicketHandler }) => {
    return tickets.map((ticket) => {
        const {
            ticket_Name,
            startTime,
            endTime,
            price,
            is_package,
            peopleMaxium,
            count,
            Id: ticketId,
        } = ticket;
        return (
            <div className="act-ticket">
                <div className="img-box">
                    <img src={fiesta} alt="" />
                </div>
                <div className="context">
                    <p className="title">{ticket_Name}</p>
                    <p>
                        <img src={location_icon} alt="" />
                        {startTime} - {endTime}
                    </p>
                    <p>
                        <img src={Organizer_icon} alt="" />
                        ???????????????{org_Name}
                    </p>
                    <p className="price">
                        NT$ <font className="number">{price}</font>
                    </p>
                </div>
                <div className="buy-info">
                    <div className="ticket-type">{ticket_Name}</div>
                    {new Date() < new Date(ticket.startTime) ? (
                        <button className="soldout-btn">??????????????????</button>
                    ) : new Date() > new Date(ticket.endTime) ? (
                        <button className="soldout-btn">???????????????</button>
                    ) : count >= peopleMaxium ? (
                        <button className="soldout-btn">?????????</button>
                    ) : is_package == true && count >= 1 ? (
                        <button className="soldout-btn">?????????</button>
                    ) : (
                        <button
                            className="buy-btn"
                            onClick={(e) => buyTicketHandler(e, ticketId)}
                        >
                            ??????
                        </button>
                    )}
                </div>
            </div>
        );
    });
};

const Save_Btn = ({ editMode }) => {
    if (editMode) {
        return (
            <button className="save-btn" type="submit">
                ??????
            </button>
        );
    } else {
        return <div></div>;
    }
};

export default OnePage;
