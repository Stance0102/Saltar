import axios from "./Axios";

const url = "http://163.18.42.222:8888";

/******************************************************
                        帳號
*******************************************************/

const login = (username, password) => {
    return axios.post(`/api/Account/login`, {
        username: username,
        password: password,
    });
};

const signup = async (username, password, email, phone, school) => {
    return axios.post(`/api/Account/create`, {
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

const selectAccount = async (userId) => {
    return axios.get(`/api/Account/get/${userId}`);
};

const updateAccount = async (
    //使用者ID
    userId,
    email,
    username,
    password,
    // address,
    phone,
    school
    // devicetoken,
    // is_admin
) => {
    return axios.put(`/api/Account/update/${userId}`, {
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

//發驗證信
const sendValidMail = async (account_Id) => {
    return axios.post(`/api/Mail/sentAccountMail`, {
        account_Id: account_Id,
    });
};

//確認認證訊息
const verifyValidMail = async (token) => {
    return axios.post(`/api/Mail/VaildMailToken`, {
        token: token,
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
    return axios.post(`/api/Groups/create`, {
        groupName: groupName,
        phone_number: phone_number,
        address: address,
        is_active: true,
    });
};

const selectGroup = async (groupId) => {
    return axios.get(`/api/Groups/get/${groupId}`);
};

const updateGroup = async (
    //群組ID
    groupId,
    //群組名稱
    groupName,
    //群組聯絡人
    phone_number,
    //群組聯絡地址
    address,
    //是否還存在?
    is_active
) => {
    return axios.put(`/api/Groups/update/${groupId}`, {
        groupName: groupName,
        phone_number: phone_number,
        address: address,
        is_active: is_active,
    });
};

const createGroupMember = async (
    //使用者ID
    userId,
    //群組ID
    roupId,
    //管理員 True False
    isAdmin
    //是否還存在?
    // is_active
) => {
    return axios.post(`/api/Groups/member/create`, {
        Account: userId,
        Group: roupId,
        isAdmin: isAdmin,
        is_active: true,
    });
};

const selectGroupMemberByUserId = async (userId) => {
    return axios.get(`/api/Groups/member/get/account/${userId}`);
};

const selectGroupMemberByGroupId = async (groupId) => {
    return axios.get(`/api/Groups/member/get/group/${groupId}`);
};

const updateGroupMember = async (
    //使用者ID
    userId,
    //群組ID 應該不能改才對?
    // groupId,
    isAdmin,
    //是否還存在?
    is_active
) => {
    return axios.put(`/api/Groups/member/update/${userId}`, {
        // Account: userId,
        // Group: groupId,
        isAdmin: isAdmin,
        is_active: is_active,
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
    //主辦方ID
    organizer,
    //是否公開?
    is_active
) => {
    return axios.post(`/api/Activity/create`, {
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
    actId
) => {
    return axios.get(`/api/Activity/get/${actId}`);
};

const SelectActivityByGroupId = async (
    //群組Id
    groupId
) => {
    return axios.get(`/api/Activity/get/group/${groupId}`);
};

const updateActivity = async (
    //活動ID
    actId,
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
    return axios.put(`/api/Activity/update/${actId}`, {
        act_Name: act_Name,
        description: description,
        location: location,
        startTime: startTime,
        endTime: endTime,
        organizer: organizer,
        is_active: is_active,
    });
};

const createActivityPhoto = async () => {
    return axios.post(`/api/Photo/uploadActPhoto`, {});
};

const selectActivityPhoto = async (actId) => {
    return axios.get(`/api/Photo/get/act/${actId}`);
};
const updateActivityPhoto = async (actId) => {
    return axios.put(`/api/Photo/update/${actId}`, {});
};

const getAllInOne = async (actId) => {
    return axios.post(`/api/Activity/getAllinOne}`, {
        act_Id: actId,
    });
};

/******************************************************
                        節目
*******************************************************/

const createShow = async (
    //活動ID
    actId,
    //節目名稱
    show_Name,
    //節目細節
    detail,
    //節目開始時間
    showTime
) => {
    return axios.post(`/api/Activity/show/create`, {
        act: actId,
        show_Name: show_Name,
        detail: detail,
        showTime: showTime,
        is_active: true,
    });
};

const selectShowByActivity = async (
    //活動ID
    actId
) => {
    return axios.get(`/api/Activity/show/getByAct/${actId}`);
};

const updateShow = async (
    //節目ID
    showId,
    //節目名稱
    show_Name,
    //節目細節
    detail,
    //節目開始時間
    showTime,
    //活動ID 這個應該不能改
    // actId,
    //狀態? true false
    is_active
) => {
    return axios.put(`/api/Activity/show/update/${showId}`, {
        show_Name: show_Name,
        detail: detail,
        showTime: showTime,
        // act: actId,
        is_active: is_active,
    });
};

/******************************************************
                        票券
*******************************************************/

const createTicket = async (
    //活動ID
    actId,
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
    //開放狀態? true false
    is_active
) => {
    return axios.post(`/api/tickets/create`, {
        ticket_Name: ticket_Name,
        peopleMaxium: peopleMaximum,
        startTime: startTime,
        endTime: endTime,
        price: price,
        act: actId,
        is_active: is_active,
        count: 0,
    });
};

const selectTicketByActivityId = async (
    //活動ID
    actId
) => {
    return axios.get(`/api/tickets/get/actId/${actId}`);
};

const selectTicket = async (
    //票券ID
    ticketId
) => {
    return axios.get(`/api/tickets/get/ticketId/${ticketId}`);
};

const updateTicket = async (
    //票券ID
    ticketId,
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
    //已賣出數量
    count,
    //活動ID 應該不能改
    actId,
    //開放狀態? true false
    is_active
) => {
    return axios.put(`/api/tickets/update/${ticketId}`, {
        ticket_Name: ticket_Name,
        peopleMaxium: peopleMaximum,
        startTime: startTime,
        endTime: endTime,
        price: price,
        count: count,
        act: actId,
        is_active: is_active,
    });
};

const createTicketMember = async (
    //名稱
    actualname,
    //電話
    phone,
    //電子郵件
    mail,
    //票券ID
    ticketId,
    //性別
    sex
    // ? true false
    // is_active
) => {
    return axios.post(`/api/tickets/member/create`, {
        actualname: actualname,
        phone: phone,
        mail: mail,
        ticketId: ticketId,
        sex: sex,
        is_active: true,
    });
};

const updateTicketMember = async (
    //顧客ID
    ticketMemberId,
    //名稱
    actualname,
    //電話
    phone,
    //電子郵件
    mail,
    //票券ID
    ticketId,
    //性別
    sex
    // ? true false
    // is_active
) => {
    return axios.put(`/api/tickets/member/update/${ticketMemberId}`, {
        actualname: actualname,
        phone: phone,
        mail: mail,
        ticketId: ticketId,
        sex: sex,
        is_active: true,
    });
};

const validTicket = async (token) => {
    return axios.post(`/api/tickets/vaildticket`, {
        token: token,
    });
};

const createCustomerTicket = async (
    //名稱
    actualname,
    //電子郵件
    mail
) => {
    return axios.post(`/api/tickets/member/get/customer`, {
        actualname: actualname,
        mail: mail,
    });
};

const selectTicketMember = async (
    //票券ID
    ticketId
) => {
    return axios.get(`/api/tickets/member/get/ticket/${ticketId}`);
};

const createMailFormate = async (
    //窩ㄅ知道是什麼
    joinedListId
) => {
    return axios.post(`/api/tickets/member/get/customer`, {
        joinedListId: joinedListId,
    });
};

/******************************************************
                        顧客
*******************************************************/

const createCustomer = async (
    groupID,
    actualname,
    phone,
    mail,
    customer_type,
    customer_tag,
    customer_note,
    sex,
    is_inSaltar,
    is_active
) => {
    return axios.post(`/api/customer/create`, {
        actualname: actualname,
        phone: phone,
        mail: mail,
        Group: groupID,
        customer_type: customer_type,
        customer_tag: customer_tag,
        customer_note: customer_note,
        sex: sex,
        is_inSaltar: is_inSaltar,
        is_active: is_active,
    });
};

const selectCustomerByGroupId = async (groupId) => {
    return axios.get(`/api/customer/get/group/${groupId}`);
};

const selectCustomerByName = async (actualname) => {
    return axios.get(`/api/customer/get/name/${actualname}`);
};

const updateCustomer = async (
    CustomerId,
    actualname,
    phone,
    mail,
    groupID,
    customer_type,
    customer_tag,
    customer_note,
    sex,
    is_inSaltar,
    is_active
) => {
    return axios.put(`/api/customer/update/${CustomerId}`, {
        actualname: actualname,
        phone: phone,
        mail: mail,
        Group: groupID,
        customer_type: customer_type,
        customer_tag: customer_tag,
        customer_note: customer_note,
        sex: sex,
        is_inSaltar: is_inSaltar,
        is_active: is_active,
    });
};

const createCustomerFromExcel = async (excelData, groupId) => {
    return axios.post(`/api/customer/createfromexcel`, {
        custom_file: excelData,
        groupId: groupId,
    });
};

const uploadExcelToRFM = async (excelData) => {
    return axios.post(`/api/customer/uploadAnalyze`, {
        custom_file: excelData,
    });
};

const downloadExcelToRFM = async (excelData) => {
    return axios.post(`/api/customer/downloadAnalyze`, {
        custom_file: excelData,
    });
};

/******************************************************
                        分析
*******************************************************/

const createAnalyze = async (act, customerId, stayTime, is_active) => {
    return axios.post(`/api/pageAnalyze/page/create`, {
        act: act,
        cus_Id: customerId,
        stayTime: stayTime,
        is_active: is_active,
    });
};

const selectAnalyzeByActId = async (actId) => {
    return axios.get(`/api/pageAnalyze/act/get/${actId}`);
};

const selectAnalyzeByPageId = async (pageId) => {
    return axios.get(`/api/pageAnalyze/page/get/${pageId}`);
};

const updateAnalyze = async (from, actId) => {
    return axios.post(`/api/pageAnalyze/act/update`, {
        from: from,
        act_Id: actId,
    });
};

/******************************************************
                        Token
*******************************************************/

const getToken = async (username, password) => {
    return axios.post(`/api/token-auth`, {
        username: username,
        password: password,
    });
};

const refreshToken = async (token) => {
    return axios.post(`/api/token-refresh`, {
        token: token,
    });
};

const verifyToken = async (token) => {
    return axios.post(`/api/token-verify`, {
        token: token,
    });
};

/******************************************************
                        其他
*******************************************************/

const getSchool = async () => {
    return axios.get(`/api/Account/getSchool`);
};

//帳號
export {
    login,
    signup,
    selectAccount,
    updateAccount,
    sendValidMail,
    verifyValidMail,
};
//群組
export {
    createGroup,
    selectGroup,
    updateGroup,
    createGroupMember,
    selectGroupMemberByUserId,
    selectGroupMemberByGroupId,
    updateGroupMember,
};
//活動
export {
    createActivity,
    SelectActivity,
    SelectActivityByGroupId,
    updateActivity,
    createActivityPhoto,
    selectActivityPhoto,
    updateActivityPhoto,
    getAllInOne,
};
//節目
export {
    createShow,
    selectShowByActivity,
    updateShow,
    updateCustomer,
    createCustomerFromExcel,
    uploadExcelToRFM,
    downloadExcelToRFM,
};
//票券
export {
    createTicket,
    selectTicket,
    selectTicketByActivityId,
    updateTicket,
    createTicketMember,
    updateTicketMember,
    validTicket,
    createCustomerTicket,
    selectTicketMember,
    createMailFormate,
};
//顧客
export { createCustomer, selectCustomerByGroupId, selectCustomerByName };
//分析
export {
    createAnalyze,
    selectAnalyzeByActId,
    selectAnalyzeByPageId,
    updateAnalyze,
};
//Token
export { getToken, refreshToken, verifyToken };
//其他
export { getSchool };
