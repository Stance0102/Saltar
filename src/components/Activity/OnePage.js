import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    createActivity,
    createShow,
    createActivityPhoto,
    getAllInOne,
} from "../agent";
import Swal from "sweetalert2";
// Img
import calendar_icon from "../../images/calendar_icon.svg";
import Group_icon from "../../images/Group_icon.svg";
import tick_Icon from "../../images/tick_Icon.svg";
import cancel_Icon from "../../images/cancel_Icon.svg";
import location_icon from "../../images/location_icon.svg";
import Organizer_icon from "../../images/Organizer_icon.svg";
import fiesta from "../../images/fiesta.PNG";

// import Edit from "../Account/Edit";

const OnePage = ({ edit, activityId }) => {
    const { groupId, name } = useSelector((state) => state.Account);
    const location = useLocation();
    const history = useHistory();
    const fileInput = useRef(null);
    const [img, setImg] = useState("");
    const [editMode, setEditMode] = useState(edit);
    const [saveMode, setSaveMode] = useState(false);
    const [activityData, setActivityData] = useState({
        title: "",
        location: "",
        startTime: "",
        endTime: "",
        currentStartTime: "2021-09-04 00:00:00",
        currentEndTime: "2021-09-04 00:00:00",
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
            setEditMode(location.state.edit);
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
                                    startTime: startTime.split("T")[0],
                                    endTime: endTime.split("T")[0],
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
                                title: "查無此活動",
                                confirmButtonText: "離開",
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
                    console.log(allInOneResponse);
                }
                setActivityData({
                    ...activityData,
                    ...activity,
                    shows: shows,
                    tickets: tickets,
                    imagePreview: imagePreview,
                });
                console.log(allInOneResponse);
            };
            setupData();
        }
    }, [location]);

    const onTitleChange = (e) => {
        setActivityData({
            ...activityData,
            title: e.target.value,
        });
    };
    const onLocationChange = (e) => {
        setActivityData({
            ...activityData,
            location: e.target.value,
        });
    };
    const onStartTimeChange = (e) => {
        setActivityData({
            ...activityData,
            startTime: e.target.value,
            currentStartTime: e.target.value + " 00:00:00",
        });
    };
    const onEndTimeChange = (e) => {
        setActivityData({
            ...activityData,
            endTime: e.target.value,
            currentEndTime: e.target.value + " 00:00:00",
        });
    };
    const onDescriptionChange = (e) => {
        setActivityData({
            ...activityData,
            description: e.target.value,
        });
    };
    const onShowTimeChange = (e) => {
        setActivityData({
            ...activityData,
            showTime: e.target.value,
        });
    };
    const onShowNameChange = (e) => {
        setActivityData({
            ...activityData,
            showName: e.target.value,
        });
    };
    const onshowNoteChange = (e) => {
        setActivityData({
            ...activityData,
            showNote: e.target.value,
        });
    };

    const onImageAddClick = (e) => {
        const tempImageFiles = [];
        const tempImagePreview = [];
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        Array.from(e.target.files).forEach((file) => {
            tempImageFiles.push(file);
            tempImagePreview.push(URL.createObjectURL(file));
        });
        setActivityData({
            ...activityData,
            imageFiles: [...activityData.imageFiles, tempImageFiles],
            imagePreview: [...activityData.imagePreview, tempImagePreview],
        });
    };

    const handleCreateShow = (e) => {
        e.preventDefault();
        if (activityData.showTime == "" || activityData.showName == "") {
            return;
        }
        setActivityData({
            ...activityData,
            shows: [
                ...activityData.shows,
                {
                    showTime: activityData.showTime,
                    show_Name: activityData.showName,
                    detail: activityData.showNote,
                },
            ],
            showTime: "",
            showName: "",
            showNote: "",
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            activityData.title == "" ||
            activityData.location == "" ||
            activityData.startTime == "" ||
            activityData.endTime == "" ||
            activityData.description == "" ||
            activityData.shows.length == 0 ||
            activityData.imageFiles.length == 0
        ) {
            Swal.fire({
                title: "創建",
                text: "請填寫完整訊息及圖片",
                confirmButtonText: "知道了",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
            return;
        }
        const response = await createActivity(
            activityData.title,
            activityData.description,
            activityData.location,
            activityData.currentStartTime,
            activityData.currentEndTime,
            groupId,
            true
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    console.log("ACT_ID:" + response.data.results.Id);
                    activityData.shows.forEach(async (show) => {
                        const showResponse = await createShow(
                            response.data.results.Id,
                            show.show_Name,
                            show.detail,
                            "備註",
                            `${activityData.startTime} ${show.showTime}`
                        );
                        if (showResponse.status === 200) {
                            switch (showResponse.data.status) {
                                case 0:
                                    break;
                                default:
                                    console.log(showResponse);
                                    break;
                            }
                        } else {
                            console.log(showResponse);
                        }
                    });
                    activityData.imageFiles.forEach(async (file) => {
                        const formData = new FormData();
                        formData.append("act_Photo", file[0]);
                        formData.append("act_Id", response.data.results.Id);
                        const imageResponse = await createActivityPhoto(
                            formData
                        );
                        if (imageResponse.status === 200) {
                            switch (imageResponse.data.status) {
                                case 0:
                                    break;
                                default:
                                    console.log(imageResponse);
                                    break;
                            }
                        } else {
                            console.log(imageResponse);
                        }
                    });
                    Swal.fire({
                        title: "活動創建成功",
                        confirmButtonText: "下一步",
                        confirmButtonColor: "#ffb559",
                        icon: "success",
                    }).then(() => {
                        history.push({
                            pathname: "/dashboard/onePage",
                            state: { edit: false },
                        });
                    });
                    break;

                default:
                    Swal.fire({
                        title: "活動創建失敗",
                        text: JSON.stringify(response.data.results),
                        confirmButtonText: "關閉",
                        confirmButtonColor: "#ffb559",
                        icon: "error",
                        // footer: '<a href="/signup">建立帳號?</a>',
                    });
                    break;
            }
        } else {
            console.log(response);
        }
    };

    return (
        <div className="one-page">
            <form className="one-page-content" onSubmit={submitHandler}>
                <ACT_Title
                    editMode={editMode}
                    onTitleChange={onTitleChange}
                    {...activityData}
                />

                <ACT_Info
                    editMode={editMode}
                    onLocationChange={onLocationChange}
                    onStartTimeChange={onStartTimeChange}
                    onEndTimeChange={onEndTimeChange}
                    name={name}
                    {...activityData}
                />

                {activityData.imagePreview.map((image) => {
                    return <ACT_Img img={image} />;
                })}

                {editMode && (
                    <ACT_Img_Add
                        onImageAddClick={onImageAddClick}
                        fileInput={fileInput}
                    />
                )}

                <ACT_Description
                    editMode={editMode}
                    onDescriptionChange={onDescriptionChange}
                    {...activityData}
                />

                <ACT_Show
                    editMode={editMode}
                    handleCreateShow={handleCreateShow}
                    onShowTimeChange={onShowTimeChange}
                    onShowNameChange={onShowNameChange}
                    onshowNoteChange={onshowNoteChange}
                    {...activityData}
                />

                {!editMode && (
                    <div className="act-ticket-box">
                        <ACT_Ticket {...activityData} />
                    </div>
                )}

                <Save_Btn editMode={editMode} />
            </form>
        </div>
    );
};

// const ACT_Title = ({ editMode }) => {
//     const [actTitle, setActTitle] = useState("高科傳說對決生死賽");

//     function handleActTitle(e) {
//         const act_Title = e.target.value;
//         setActTitle(act_Title);
//     }

const ACT_Title = ({ editMode, title, onTitleChange }) => {
    if (editMode) {
        return (
            <>
                <input
                    type="text"
                    className="act-name"
                    value={title}
                    placeholder="輸入此活動名稱"
                    id="actName"
                    autoComplete="off"
                    required
                    onChange={(e) => onTitleChange(e)}
                />
                {/* <Edit_Btn editMode={editMode} /> */}
            </>
        );
    } else {
        return (
            <>
                <div className="act-name">
                    {title}
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
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
                            placeholder="輸入此活動地點"
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
                        ～
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
                        {startTime} ～ {endTime}
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
            <p>新增一張圖片</p>
        </div>
    );
};

const ACT_Description = ({ editMode, description, onDescriptionChange }) => {
    if (editMode) {
        return (
            <div className="act-description">
                <div className="title">活動簡介</div>
                <textarea
                    className="context"
                    id="act-desctiption"
                    rows="20"
                    minLength="10"
                    maxLength="2000"
                    spellCheck="false"
                    value={description}
                    placeholder="輸入此活動簡介（2000字內）"
                    onChange={(e) => onDescriptionChange(e)}
                />
            </div>
        );
    } else {
        return (
            <div className="act-description">
                <div className="title">活動簡介</div>
                <div className="context">{description}</div>
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
                <div className="title">活動即時資訊</div>
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
                            placeholder="節目名稱"
                            value={showName}
                            onChange={(e) => onShowNameChange(e)}
                        />
                        <font>
                            <input
                                type="text"
                                placeholder="備註"
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
                <div className="title">活動即時資訊</div>
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

const ACT_Ticket = ({ tickets, org_Name }) => {
    return tickets.map((ticket) => {
        const { ticket_Name, startTime, endTime, price, Id: ticketId } = ticket;
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
                        主辦單位：{org_Name}
                    </p>
                    <p className="price">
                        NT$ <font className="number">{price}</font>
                    </p>
                </div>
                <div className="buy-info">
                    <div className="ticket-type">{ticket_Name}</div>
                    <button
                        className="buy-btn"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        購票
                    </button>
                </div>
            </div>
        );
    });
};

const Save_Btn = ({ editMode }) => {
    if (editMode) {
        return (
            <button className="save-btn" type="submit">
                儲存
            </button>
        );
    } else {
        return <div></div>;
    }
};

const Edit_Btn = ({ editMode }) => {
    if (editMode) {
        return (
            <>
                <button className="edit-btn">
                    <img src={tick_Icon} alt="" />
                </button>
                <button className="edit-btn">
                    <img src={cancel_Icon} alt="" />
                </button>
            </>
        );
    } else {
        return (
            <button className="edit-btn">
                <img src={Group_icon} alt="" />
            </button>
        );
    }
};

export default OnePage;
