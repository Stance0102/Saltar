import axios from "./Axios";
/******************************************************
                        帳號
*******************************************************/

const login = async (username, password) => {
    return axios.post(`/Account/login`, {
        username: username,
        password: password,
    });
};

const signup = async (
    username,
    password,
    email,
    phone,
    school = "",
    isSociety
) => {
    return axios.post(`/Account/create`, {
        username: email,
        actualname: username,
        password: password,
        address: "string",
        phone: phone,
        school: school,
        devicetoken: "string",
        is_admin: true,
        is_society: isSociety,
    });
};

const selectAccount = async (userId) => {
    return axios.get(`/Account/get/${userId}`);
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
    return axios.put(`/Account/update/${userId}`, {
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

//發忘記密碼信
const sendForgetMail = async (email) => {
    return axios.post(`/mail/sendForgetMail`, {
        Email: email,
    });
};

//忘記密碼修改密碼
const changePassword = async (account_Id, password) => {
    return axios.post(`/Account/changePasswd`, {
        account_Id: account_Id,
        password: password,
    });
};

//發驗證信
const sendValidMail = async (account_Id) => {
    return axios.post(`/mail/sendAccountMail`, {
        account_Id: account_Id,
    });
};

//確認認證訊息
const verifyValidMail = async (token) => {
    return axios.post(`/mail/VaildMailToken`, {
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
    return axios.post(`/Groups/create`, {
        groupName: groupName,
        phone_number: phone_number,
        address: address,
        is_active: true,
    });
};

const selectGroup = async (groupId) => {
    return axios.get(`/Groups/get/${groupId}`);
};

const updateGroup = async (
    //群組ID
    groupId,
    //群組名稱
    groupName,
    //群組聯絡人
    phone_number
    //群組聯絡地址
    // address,
    //是否還存在?
    // is_active
) => {
    return axios.put(`/Groups/update/${groupId}`, {
        groupName: groupName,
        phone_number: phone_number,
        address: "address",
        // is_active: is_active,
    });
};

const createGroupCustomerShip = async (
    groupID,
    customerID,
    pay_MerchantID,
    pay_HashKey,
    pay_HashIV
) => {
    return axios.post(`/Groups/CustomerShip/create`, {
        Group: groupID,
        Customer: customerID,
        pay_MerchantID: pay_MerchantID,
        pay_HashKey: pay_HashKey,
        pay_HashIV: pay_HashIV,
    });
};

const createGroupMember = async (
    //使用者ID
    userId,
    //群組ID
    roupId,
    //身分證字號
    NID,
    //管理員 True False
    isAdmin
    //是否還存在?
    // is_active
) => {
    return axios.post(`/Groups/member/create`, {
        Account: userId,
        Group: roupId,
        NID: NID,
        isAdmin: isAdmin,
        is_active: true,
    });
};

const selectGroupMemberByUserId = async (userId) => {
    return axios.get(`/Groups/member/get/account/${userId}`);
};

const selectGroupMemberByGroupId = async (groupId) => {
    return axios.get(`/Groups/member/get/group/${groupId}`);
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
    return axios.put(`/Groups/member/update/${userId}`, {
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
    return axios.post(`/Activity/create`, {
        act_Name: act_Name,
        description: description,
        location: location,
        startTime: startTime,
        endTime: endTime,
        organizer: organizer,
        is_active: is_active,
    });
};

const selectActivity = async (
    //活動Id
    actId
) => {
    return axios.get(`/Activity/get/${actId}`);
};

const selectActivityByGroupId = async (
    //群組Id
    groupId
) => {
    return axios.get(`/Activity/get/group/${groupId}`);
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
    return axios.put(`/Activity/update/${actId}`, {
        act_Name: act_Name,
        description: description,
        location: location,
        startTime: startTime,
        endTime: endTime,
        organizer: organizer,
        is_active: is_active,
    });
};

const createActivityPhoto = async (formData) => {
    return axios.post(`/photo/uploadActPhoto`, formData, {
        timeout: 50000,
    });
};

const selectActivityPhoto = async (actId) => {
    return axios.get(`/photo/get/act/${actId}`);
};
const updateActivityPhoto = async (actId, photoId, url, is_active) => {
    return axios.put(`/photo/update/${photoId}`, {
        act: actId,
        url: url,
        is_active: is_active,
    });
};

const getAllInOne = async (actId) => {
    return axios.post(`/Activity/getAllinOne`, {
        act_Id: actId,
    });
};

/******************************************************
                        節目
*******************************************************/

const createShow = async (
    // actId
    // show_Name
    // detail
    // note
    // showTime
    // is_active
    shows
) => {
    return axios.post(`Activity/show/create`, shows);
};

const selectShowByActivity = async (
    //活動ID
    actId
) => {
    return axios.get(`/Activity/show/getByAct/${actId}`);
};

const updateShow = async (
    // show_Name
    // detail
    // showTime
    // act
    // note
    // is_active
    shows
) => {
    return axios.put(`/Activity/show/update/`, shows);
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
    return axios.post(`/tickets/create`, {
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
    return axios.get(`/tickets/get/actId/${actId}`);
};

const selectTicket = async (
    //票券ID
    ticketId
) => {
    return axios.get(`/tickets/get/ticketId/${ticketId}`);
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
    //活動ID
    actId,
    //開放狀態? true false
    is_active
) => {
    return axios.put(`/tickets/update/${ticketId}`, {
        ticket_Name: ticket_Name,
        peopleMaxium: peopleMaximum,
        startTime: startTime,
        endTime: endTime,
        price: price,
        act: actId,
        is_active: is_active,
    });
};

const createTicketMember = async (customerId, ticketId) => {
    return axios.post(`/tickets/member/create`, {
        customerInfo: customerId,
        ticket: ticketId,
        is_active: true,
    });
};

const updateTicketMember = async (
    //顧客ID
    joinedListId,
    ticketId,
    customerId,
    is_active,
    is_valid
) => {
    return axios.put(`/tickets/member/update/${joinedListId}`, {
        ticket: ticketId,
        customerInfo: customerId,
        is_active: is_active,
        is_vaild: is_valid,
    });
};

//確認買票信箱
const sendCusValidMail = async (ticket_Id, customerId) => {
    return axios.post(`/mail/sendCusVaildMail`, {
        ticket_Id: ticket_Id,
        Customer_Id: customerId,
    });
};

//發送票卷信件至顧客信箱
const sendTicketMail = async (joinedListId) => {
    return axios.post(`/mail/sendTicketMail`, {
        joinedListId: joinedListId,
    });
};

const validTicket = async (token, groupId) => {
    return axios.post(`/tickets/vaildticket/`, {
        groupId: groupId,
        token: token,
    });
};

const createCustomerTicket = async (
    //名稱
    actualname,
    //電子郵件
    mail
) => {
    return axios.post(`/tickets/member/get/customer`, {
        actualname: actualname,
        mail: mail,
    });
};

const selectTicketMember = async (
    //票券ID
    ticketId
) => {
    return axios.post(`/tickets/member/get/ticket/`, {
        ticketId: ticketId,
    });
};

//拿取買票資料
const selectMailFormate = async (joinedListId) => {
    return axios.post(`/tickets/member/getMailFormat/`, {
        joinedListId: joinedListId,
    });
};

//解密Token
const decodeToken = async (token) => {
    return axios.post(`/mail/releaseToken`, {
        token: token,
    });
};

/******************************************************
                        顧客
*******************************************************/

const lineLogin = async (code) => {
    return axios.post(`/customer/linelogin`, {
        code: code,
    });
};

const createCustomer = async (
    groupID,
    actualname,
    phone,
    mail,
    NID,
    customer_type,
    customer_tag,
    customer_note,
    sex,
    UID
) => {
    return axios.post(`/customer/create`, {
        Group: groupID,
        actualname: actualname,
        phone: phone,
        mail: mail,
        NID: NID,
        customer_type: customer_type,
        customer_tag: customer_tag,
        customer_note: customer_note,
        sex: sex,
        UID: UID,
    });
};

const createCustomerWithBuyTicket = async (
    actualname,
    phone,
    mail,
    UID,
    NID,
    sex
) => {
    return axios.post(`/customer/create`, {
        actualname: actualname,
        phone: phone,
        mail: mail,
        UID: UID,
        NID: NID,
        customer_type: "新顧客",
        customer_tag: "一般",
        customer_note: "註記",
        sex: sex,
    });
};

const selectCustomerByGroupId = async (groupId) => {
    return axios.get(`/customer/get/group/${groupId}`);
};

const selectCustomerByName = async (actualname) => {
    return axios.get(`/customer/get/name/${actualname}`);
};

const updateCustomer = async (
    CustomerId,
    actualname,
    phone,
    mail,
    customer_type,
    customer_tag,
    customer_note,
    NID,
    UID,
    sex
) => {
    return axios.put(`/customer/update/${CustomerId}`, {
        actualname: actualname,
        phone: phone,
        mail: mail,
        customer_type: customer_type,
        customer_tag: customer_tag,
        customer_note: customer_note,
        NID: NID,
        UID: UID,
        sex: sex,
    });
};

const createCustomerFromExcel = async (excelData, groupId) => {
    return axios.post(`/customer/createfromexcel`, {
        custom_file: excelData,
        groupId: groupId,
    });
};

const uploadExcelToRFM = async (excelData) => {
    return axios.post(`/customer/uploadAnalyze`, {
        custom_file: excelData,
    });
};

const downloadExcelToRFM = async (excelData) => {
    return axios.post(`/customer/downloadAnalyze`, {
        custom_file: excelData,
    });
};

const genECPayOrder = async (joinedListId) => {
    return axios.post(`customer/genEcpayOrder`, {
        joinedListId: joinedListId,
    });
};

/******************************************************
                        分析
*******************************************************/

const createAnalyze = async (act, customerId, stayTime, is_active) => {
    return axios.post(`/pageAnalyze/page/create`, {
        act: act,
        cus_Id: customerId,
        stayTime: stayTime,
        is_active: is_active,
    });
};

const selectAnalyzeByActId = async (actId) => {
    return axios.get(`/pageAnalyze/act/get/${actId}`);
};

const selectAnalyzeByPageId = async (pageId) => {
    return axios.get(`/pageAnalyze/page/get/${pageId}`);
};

const updateAnalyze = async (from, actId) => {
    return axios.post(`/pageAnalyze/act/update`, {
        from: from,
        act_Id: actId,
    });
};

/******************************************************
                        Token
*******************************************************/

const getToken = async (username, password) => {
    return axios.post(`/token-auth`, {
        username: username,
        password: password,
    });
};

const refreshToken = async (token) => {
    return axios.post(`/token-refresh`, {
        token: token,
    });
};

const verifyToken = async (token) => {
    return axios.post(`/token-verify`, {
        token: token,
    });
};

/******************************************************
                        其他
*******************************************************/

const getSchool = async () => {
    return axios.get(`/Account/getSchool`);
};

//帳號
export {
    login,
    signup,
    selectAccount,
    updateAccount,
    sendForgetMail,
    sendValidMail,
    verifyValidMail,
    changePassword,
};
//群組
export {
    createGroup,
    selectGroup,
    updateGroup,
    createGroupCustomerShip,
    createGroupMember,
    selectGroupMemberByUserId,
    selectGroupMemberByGroupId,
    updateGroupMember,
};
//活動
export {
    createActivity,
    selectActivity,
    selectActivityByGroupId,
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
    sendCusValidMail,
    sendTicketMail,
    validTicket,
    createCustomerTicket,
    selectTicketMember,
    selectMailFormate,
    decodeToken,
};
//顧客
export {
    lineLogin,
    createCustomer,
    createCustomerWithBuyTicket,
    updateCustomer,
    selectCustomerByGroupId,
    selectCustomerByName,
    genECPayOrder,
};
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
