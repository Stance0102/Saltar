import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { createActivity, createShow } from "../agent";
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

const OnePage = ({ edit }) => {
    const { groupId } = useSelector((state) => state.Account);
    const location = useLocation();
    const history = useHistory();
    const [img, setImg] = useState("");
    const [imgState, setImgState] = useState(false);
    const [editMode, setEditMode] = useState(edit);
    const [saveMode, setSaveMode] = useState(false);
    const [activityData, setActivityData] = useState({
        title: "高科傳說對決生死賽",
        location: "高雄科技大學第一校區",
        startTime: "2021-09-04",
        endTime: "2021-09-04",
        currentTime: "2021-09-04 00:00:00",
        description:
            "=============================================================================================================",
        showTime: "",
        showName: "",
        showNote: "",
        shows: [],
    });

    useEffect(() => {
        if (location.state != undefined) {
            setEditMode(location.state.edit);
        }
    }, []);

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
            currentTime: e.target.value + " 00:00:00",
        });
    };
    const onEndTimeChange = (e) => {
        setActivityData({
            ...activityData,
            endTime: e.target.value,
            currentTime: e.target.value + " 00:00:00",
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

    const handleCreateShow = () => {
        if (
            activityData.showTime == "" ||
            activityData.showName == "" ||
            activityData.showNote == ""
        ) {
            return;
        }
        setActivityData({
            ...activityData,
            shows: [
                ...activityData.shows,
                {
                    time: activityData.showTime,
                    showName: activityData.showName,
                    note: activityData.showNote,
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
            activityData.shows.length == 0
        ) {
            return;
        }
        const response = await createActivity(
            activityData.title,
            activityData.description,
            activityData.location,
            activityData.currentTime,
            activityData.currentTime,
            groupId,
            true
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    activityData.shows.forEach(async (show) => {
                        await createShow(
                            response.data.results.Id,
                            show.showName,
                            show.note,
                            show.time
                        );
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

    if (img != "") {
        setImgState(true);
    }

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
                    {...activityData}
                />

                {imgState && <ACT_Img img="" />}

                {editMode && <ACT_Img_Add />}

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

                {!editMode && <ACT_Ticket />}

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

// const ACT_Info = ({ editMode }) => {
//     const [actInfo, setActInfo] = useState({
//         location: "高雄科技大學第一校區",
//         starttime: "2021-09-04",
//     });

//     function handleActInfo(e) {
//         setActInfo({
//             [e.target.id]: e.target.value,
//         });
//     }

const ACT_Info = ({
    editMode,
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
                        高雄科大資管系
                    </div>
                    <div>
                        <img src={location_icon} alt="" />
                        <input
                            type="text"
                            id="location"
                            //                             value={actInfo.location}
                            //                             autoComplete="off"
                            //                             onChange={handleActInfo}
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
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="act-info">
                    <div>
                        <img src={Organizer_icon} alt="" />
                        高雄科大資管系
                    </div>
                    <div>
                        <img src={location_icon} alt="" />
                        {location}
                    </div>
                    <div>
                        <img src={calendar_icon} alt="" />
                        {startTime}
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

const ACT_Img_Add = () => {
    return (
        <div className="act-img-add">
            <img src={calendar_icon} alt="" />
            <p>新增一張圖片</p>
        </div>
    );
};

const ACT_Description = ({ editMode, description, onDescriptionChange }) => {
    if (editMode) {
        return (
            <div className="act-description">
                <div className="title">
                    活動簡介
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
                <textarea
                    className="context"
                    id="act-desctiption"
                    rows="20"
                    minLength="10"
                    maxLength="2000"
                    spellCheck="false"
                    value={description}
                    onChange={(e) => onDescriptionChange(e)}
                />
            </div>
        );
    } else {
        return (
            <div className="act-description">
                <div className="title">
                    活動簡介
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
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
                <div className="title">
                    活動即時資訊
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
                {shows.map((show, index) => {
                    return <ACT_Show_Detail key={show.id} {...show} />;
                })}
                <li>
                    <div className="time">
                        <input
                            type="time"
                            value={showTime}
                            onChange={(e) => onShowTimeChange(e)}
                        />{" "}
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
                            onClick={() => handleCreateShow()}
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
                <div className="title">
                    活動即時資訊
                    {/* <Edit_Btn editMode={editMode} /> */}
                </div>
                {shows.map((show, index) => {
                    return <ACT_Show_Detail key={show.id} {...show} />;
                })}
            </ul>
        );
    }
};

const ACT_Show_Detail = ({ time, showName, note }) => {
    return (
        <li>
            <div className="time">
                {time} {showName} <font className="note">({note})</font>
            </div>
        </li>
    );
};

const ACT_Ticket = () => {
    return (
        <div className="act-ticket">
            <img src={fiesta} alt="" />
            <div className="context">
                <p className="title">高科傳說對決生死賽</p>
                <p>
                    <img src={location_icon} alt="" />
                    2021-07-20 - 2021-07-21
                </p>
                <p>
                    <img src={Organizer_icon} alt="" />
                    主辦單位：高雄科大資管系
                </p>
                <p className="price">
                    NT$ <font className="number">200</font>
                </p>
            </div>
            <div className="buy-info">
                <div className="ticket-type">學生票</div>
                <button className="buy-btn">購票</button>
            </div>
        </div>
    );
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
