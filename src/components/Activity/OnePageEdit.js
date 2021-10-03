import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    updateActivity,
    createShow,
    createActivityPhoto,
    selectActivity,
    selectShowByActivity,
    selectActivityPhoto,
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

const OnePage = ({ activityId }) => {
    const { groupId, name } = useSelector((state) => state.Account);
    const location = useLocation();
    const history = useHistory();
    const fileInput = useRef(null);
    const [editMode, setEditMode] = useState(true);
    const [editData, setEditData] = useState({
        addShows: [],
        delShows: [],
        addImageFile: [],
        delImageFile: [],
    });
    const [activityData, setActivityData] = useState({
        activityId: "",
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
                let imagePreview = [];
                const activityResponse = await selectActivity(activityId);
                if (activityResponse.status === 200) {
                    switch (activityResponse.data.status) {
                        case 0:
                            const {
                                Id: activityId,
                                act_Name: title,
                                description,
                                startTime,
                                endTime,
                                location,
                                org_Name,
                            } = activityResponse.data.results[0];
                            activity = {
                                activityId: activityId,
                                title: title,
                                description: description,
                                currentStartTime: startTime,
                                currentEndTime: endTime,
                                startTime: startTime.split(" ")[0],
                                endTime: endTime.split(" ")[0],
                                location: location,
                                org_Name: org_Name,
                            };
                            break;
                        default:
                            Swal.fire({
                                title: "查無此活動",
                                confirmButtonText: "離開",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                history.push({
                                    pathname: "/dashboard/managementActivity",
                                });
                            });
                            break;
                    }
                } else {
                    console.log(activityResponse);
                }
                // 節目列表
                const showsResponse = await selectShowByActivity(activityId);
                console.log(showsResponse);
                if (showsResponse.status === 200) {
                    switch (showsResponse.data.status) {
                        case 0:
                            const days = new Date(
                                new Date(
                                    activityResponse.data.results[0].endTime
                                ) -
                                    new Date(
                                        activityResponse.data.results[0].startTime
                                    )
                            ).getDate();
                            const startDate = new Date(
                                activityResponse.data.results[0].startTime
                            );
                            for (let i = 0; i < days; i++) {
                                const showsDay = [];
                                const tempDate = new Date(startDate.getTime());
                                tempDate.setDate(tempDate.getDate() + i);
                                showsResponse.data.results.forEach((show) => {
                                    const showDate = new Date(
                                        show.showTime.split(" ")[0] + " 00:00"
                                    );
                                    if (
                                        tempDate.getTime() ===
                                        showDate.getTime()
                                    ) {
                                        showsDay.push({ ...show, tag: "" });
                                    }
                                });
                                shows.push(showsDay);
                            }

                            break;
                        default:
                            break;
                    }
                } else {
                    console.log(showsResponse);
                }
                // 圖片列表
                const photosResponse = await selectActivityPhoto(activityId);
                console.log("photosResponse", photosResponse.data.results);
                if (photosResponse.status === 200) {
                    switch (photosResponse.data.status) {
                        case 0:
                            photosResponse.data.results.forEach((photo) => {
                                imagePreview.push(photo.url);
                            });
                            break;
                        default:
                            break;
                    }
                } else {
                    console.log(photosResponse);
                }

                setActivityData({
                    ...activityData,
                    ...activity,
                    shows: shows,
                    imagePreview: imagePreview,
                });
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

    const handleCreateShow = (e, day) => {
        e.preventDefault();
        console.log(day);
        if (activityData.showTime == "" || activityData.showName == "") {
            return;
        }
        const shows = [];
        activityData.shows.forEach((dayShows, i) => {
            if (i === day) {
                shows.push([
                    ...dayShows,
                    {
                        showTime: activityData.showTime,
                        show_Name: activityData.showName,
                        detail: activityData.showNote,
                        is_active: true,
                        tag: "new",
                    },
                ]);
            } else {
                shows.push(dayShows);
            }
        });

        setActivityData({
            ...activityData,
            shows: shows,
            showTime: "",
            showName: "",
            showNote: "",
        });
    };

    const handelDeleteShow = (e, day, index) => {
        e.preventDefault();
        console.log(day);
        console.log(index);
        const shows = [];
        activityData.shows.forEach((dayShows, i) => {
            if (i === day) {
                dayShows[index] = {
                    ...dayShows[index],
                    is_active: false,
                    tag: "edit",
                };
                shows.push(dayShows);
            } else {
                shows.push(dayShows);
            }
        });
        setActivityData({
            ...activityData,
            shows: shows,
        });
        console.log(activityData.shows);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const {
            activityId,
            title,
            description,
            location,
            startTime,
            endTime,
            currentStartTime,
            currentEndTime,
            shows,
            imageFiles,
        } = activityData;
        if (
            title == "" ||
            location == "" ||
            startTime == "" ||
            endTime == "" ||
            description == ""
        ) {
            Swal.fire({
                title: "更新",
                text: "請填寫完整訊息及圖片",
                confirmButtonText: "知道了",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
            return;
        }
        const response = await updateActivity(
            activityId,
            title,
            description,
            location,
            currentStartTime,
            currentEndTime,
            groupId,
            true
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    console.log(response.data.results);
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
                    // activityData.imageFiles.forEach(async (file) => {
                    //     const formData = new FormData();
                    //     formData.append("act_Photo", file[0]);
                    //     formData.append("act_Id", response.data.results.Id);
                    //     const imageResponse = await createActivityPhoto(
                    //         formData
                    //     );
                    //     if (imageResponse.status === 200) {
                    //         switch (imageResponse.data.status) {
                    //             case 0:
                    //                 break;
                    //             default:
                    //                 console.log(imageResponse);
                    //                 break;
                    //         }
                    //     } else {
                    //         console.log(imageResponse);
                    //     }
                    // });
                    // Swal.fire({
                    //     title: "活動創建成功",
                    //     confirmButtonText: "下一步",
                    //     confirmButtonColor: "#ffb559",
                    //     icon: "success",
                    // }).then(() => {
                    //     history.push({
                    //         pathname: "/dashboard/onePage",
                    //         state: { edit: false },
                    //     });
                    // });
                    break;

                default:
                    Swal.fire({
                        title: "活動更新失敗",
                        text: JSON.stringify(response.data.results),
                        confirmButtonText: "關閉",
                        confirmButtonColor: "#ffb559",
                        icon: "error",
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

                <ACT_Img_Add
                    onImageAddClick={onImageAddClick}
                    fileInput={fileInput}
                />

                <ACT_Description
                    editMode={editMode}
                    onDescriptionChange={onDescriptionChange}
                    {...activityData}
                />

                <ACT_Show
                    editMode={editMode}
                    handleCreateShow={handleCreateShow}
                    handelDeleteShow={handelDeleteShow}
                    onShowTimeChange={onShowTimeChange}
                    onShowNameChange={onShowNameChange}
                    onshowNoteChange={onshowNoteChange}
                    {...activityData}
                />

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
                    placeholder="輸入此活動名稱"
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
    handelDeleteShow,
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
                {shows.map((dayShows, days) => {
                    return dayShows
                        .filter((show) => show.is_active === true)
                        .map((show, index) => {
                            return (
                                <ACT_Show_Detail
                                    key={show.id}
                                    handelDeleteShow={handelDeleteShow}
                                    days={days}
                                    index={index}
                                    {...show}
                                />
                            );
                        });
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
                            // 0幫我改成變數  0為第一天 1為第二天
                            onClick={(e) => handleCreateShow(e, 0)}
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

const ACT_Show_Detail = ({
    showTime,
    show_Name,
    detail,
    handelDeleteShow,
    days,
    index,
}) => {
    return (
        <li>
            <div className="time">
                {showTime.split(" ")[1]} {show_Name}{" "}
                <font className="note">({detail})</font>
                <button onClick={(e) => handelDeleteShow(e, days, index)}>
                    刪除
                </button>
            </div>
        </li>
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

export default OnePage;
