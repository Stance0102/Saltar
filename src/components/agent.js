import axios from "axios";

const url = "http://163.18.42.222:8888";

/******************************************************
                        帳號
*******************************************************/

const login = (username, password) => {
    return axios.post(`${url}/api/Account/login`, {
        username: username,
        password: password,
    });
};

const signup = async (username, password, email, phone) => {
    return axios.post(`${url}/api/Account/create`, {
        username: email,
        actualname: username,
        password: password,
        address: "string",
        phone: phone,
        school: "string",
        devicetoken: "string",
        is_admin: true,
    });
};

const updateAccount = async (
    //使用者ID
    user_Id,
    email,
    username,
    password,
    // address,
    phone,
    school
    // devicetoken,
    // is_admin
) => {
    return axios.put(`${url}/api/Account/update/${user_Id}`, {
        username: email,
        actualname: username,
        password: password,
        address: "string",
        phone: phone,
        school: school,
        devicetoken: "string",
        is_admin: true,
    });
};
/******************************************************
                        群組
*******************************************************/
const createGroup = async (
    //群組名稱
    groupName,
    //群組聯絡人
    phone_number,
    //群組聯絡地址
    address
    //是否還存在?
    // is_active
) => {
    return axios.post(`${url}/api/Groups/create`, {
        groupName: groupName,
        phone_number: phone_number,
        address: address,
        is_active: true,
    });
};

/******************************************************
                        活動
*******************************************************/

const createActivity = async (
    //名稱
    act_Name,
    //簡介
    description,
    //地點
    location,
    //開始時間
    startTime,
    //結束時間
    endTime,
    //活動人數?
    organizer,
    //是否公開?
    is_active
) => {
    return axios.post(`${url}/api/Activity/create`, {
        act_Name: act_Name,
        description: description,
        location: location,
        startTime: startTime,
        endTime: endTime,
        organizer: organizer,
        is_active: is_active,
    });
};

const SelectActivity = async (
    //活動Id
    show_Id
) => {
    return axios.get(`${url}/api/Activity/get/${show_Id}`);
};

const updateActivity = async (
    //活動ID
    act_Id,
    //名稱
    act_Name,
    //簡介
    description,
    //地點
    location,
    //開始時間
    startTime,
    //結束時間
    endTime,
    //活動人數?
    organizer,
    //是否公開?
    is_active
) => {
    return axios.put(`${url}/api/Activity/update/${act_Id}`, {
        act_Name: act_Name,
        description: description,
        location: location,
        startTime: startTime,
        endTime: endTime,
        organizer: organizer,
        is_active: is_active,
    });
};

/******************************************************
                        節目
*******************************************************/

const createShow = async (
    //節目名稱
    show_Name,
    //節目細節
    detail,
    //節目開始時間
    showTime,
    //活動ID
    act_Id
) => {
    return axios.post(`${url}/api/Activity/show/create`, {
        show_Name: show_Name,
        detail: detail,
        showTime: showTime,
        act: act_Id,
        is_active: true,
    });
};

const selectShowByActivity = async (
    //活動ID
    act_Id
) => {
    return axios.get(`${url}/api/Activity/show/getByAct/${act_Id}`);
};

const updateShow = async (
    //節目ID
    show_Id,
    //節目名稱
    show_Name,
    //節目細節
    detail,
    //節目開始時間
    showTime,
    //活動ID 這個應該不能改
    // act_Id,
    //狀態? true false
    is_active
) => {
    return axios.put(`${url}/api/Activity/show/update/${show_Id}`, {
        show_Name: show_Name,
        detail: detail,
        showTime: showTime,
        // act: act_Id,
        is_active: is_active,
    });
};

/******************************************************
                        票券
*******************************************************/

const createTicket = async (
    //票券名稱
    ticket_Name,
    //票券數量
    peopleMaximum,
    //票券販賣開始時間?
    startTime,
    //票券販賣結束時間?
    endTime,
    //價錢
    price,
    //活動ID
    act_Id,
    //開放狀態? true false
    is_active
) => {
    return axios.post(`${url}/api/tickets/create`, {
        ticket_Name: ticket_Name,
        peopleMaxium: peopleMaximum,
        startTime: startTime,
        endTime: endTime,
        price: price,
        act: act_Id,
        is_active: is_active,
    });
};

const selectTicketByActivity = async (
    //活動ID
    act_Id
) => {
    return axios.get(`${url}/api/tickets/get/actId/${act_Id}`);
};

const selectTicket = async (
    //票券ID
    ticket_Id
) => {
    return axios.get(`${url}/api/tickets/get/ticketId/${ticket_Id}`);
};

const updateTicket = async (
    //票券ID
    ticket_Id,
    //票券名稱
    ticket_Name,
    //票券數量
    peopleMaximum,
    //票券販賣開始時間?
    startTime,
    //票券販賣結束時間?
    endTime,
    //價錢
    price,
    //活動ID 應該不能改
    // act_Id,
    //開放狀態? true false
    is_active
) => {
    return axios.put(`${url}/api/tickets/update/${ticket_Id}`, {
        ticket_Name: ticket_Name,
        peopleMaxium: peopleMaximum,
        startTime: startTime,
        endTime: endTime,
        price: price,
        is_active: is_active,
    });
};

/******************************************************
                        其他
*******************************************************/

const getSchool = async () => {
    return axios.get(`${url}/api/Account/getSchool`);
};

//帳號
export { login, signup, updateAccount };
//群組
export { createGroup };
//活動
export { createActivity, SelectActivity, updateActivity };
//節目
export { createShow, selectShowByActivity, updateShow };
//票券
export { createTicket, selectTicket, selectTicketByActivity, updateTicket };
//其他
export { getSchool };
