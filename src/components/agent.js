import axios from "./Axios";
/******************************************************
                        帳號
*******************************************************/

const login = (username, password) => {
    return axios.post(
        `/Account/login`,
        {
            username: username,
            password: password,
        },
        { params: { t: new Date().getTime() } }
    );
};

const signup = async (username, password, email, phone, school) => {
    return axios.post(
        `/Account/create`,
        {
            username: email,
            actualname: username,
            password: password,
            address: "string",
            phone: phone,
            school: school,
            devicetoken: "string",
            is_admin: true,
        },
        { params: { t: new Date().getTime() } }
    );
};

const selectAccount = async (userId) => {
    return axios.get(`/Account/get/${userId}`, {
        params: { t: new Date().getTime() },
    });
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
    return axios.put(
        `/Account/update/${userId}`,
        {
            username: email,
            actualname: username,
            password: password,
            address: "string",
            phone: phone,
            school: school,
            devicetoken: "string",
            is_admin: true,
        },
        { params: { t: new Date().getTime() } }
    );
};

//發忘記密碼信
const sendForgetMail = async (email) => {
    return axios.post(
        `/mail/sendForgetMail`,
        {
            Email: email,
        },
        { params: { t: new Date().getTime() } }
    );
};

//忘記密碼修改密碼
const changePassword = async (account_Id, password) => {
    return axios.post(
        `/Account/changePasswd`,
        {
            account_Id: account_Id,
            password: password,
        },
        { params: { t: new Date().getTime() } }
    );
};

//發驗證信
const sendValidMail = async (account_Id) => {
    return axios.post(
        `/mail/sendAccountMail`,
        {
            account_Id: account_Id,
        },
        { params: { t: new Date().getTime() } }
    );
};

//確認認證訊息
const verifyValidMail = async (token) => {
    return axios.post(
        `/mail/VaildMailToken`,
        {
            token: token,
        },
        { params: { t: new Date().getTime() } }
    );
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
    return axios.post(
        `/Groups/create`,
        {
            groupName: groupName,
            phone_number: phone_number,
            address: address,
            is_active: true,
        },
        { params: { t: new Date().getTime() } }
    );
};

const selectGroup = async (groupId) => {
    return axios.get(`/Groups/get/${groupId}`, {
        params: { t: new Date().getTime() },
    });
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
    return axios.put(
        `/Groups/update/${groupId}`,
        {
            groupName: groupName,
            phone_number: phone_number,
            address: "address",
            // is_active: is_active,
        },
        { params: { t: new Date().getTime() } }
    );
};

const createGroupCustomerShip = async (groupID, customerID) => {
    return axios.post(
        `/Groups/CustomerShip/create`,
        {
            Group: groupID,
            Customer: customerID,
        },
        { params: { t: new Date().getTime() } }
    );
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
    return axios.post(
        `/Groups/member/create`,
        {
            Account: userId,
            Group: roupId,
            NID: NID,
            isAdmin: isAdmin,
            is_active: true,
        },
        { params: { t: new Date().getTime() } }
    );
};

const selectGroupMemberByUserId = async (userId) => {
    return axios.get(`/Groups/member/get/account/${userId}`, {
        params: { t: new Date().getTime() },
    });
};

const selectGroupMemberByGroupId = async (groupId) => {
    return axios.get(`/Groups/member/get/group/${groupId}`, {
        params: { t: new Date().getTime() },
    });
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
    return axios.put(
        `/Groups/member/update/${userId}`,
        {
            // Account: userId,
            // Group: groupId,
            isAdmin: isAdmin,
            is_active: is_active,
        },
        { params: { t: new Date().getTime() } }
    );
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
    return axios.post(
        `/Activity/create`,
        {
            act_Name: act_Name,
            description: description,
            location: location,
            startTime: startTime,
            endTime: endTime,
            organizer: organizer,
            is_active: is_active,
        },
        { params: { t: new Date().getTime() } }
    );
};

const selectActivity = async (
    //活動Id
    actId
) => {
    return axios.get(`/Activity/get/${actId}`, {
        params: { t: new Date().getTime() },
    });
};

const selectActivityByGroupId = async (
    //群組Id
    groupId
) => {
    return axios.get(`/Activity/get/group/${groupId}`, {
        params: { t: new Date().getTime() },
    });
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
    return axios.put(
        `/Activity/update/${actId}`,
        {
            act_Name: act_Name,
            description: description,
            location: location,
            startTime: startTime,
            endTime: endTime,
            organizer: organizer,
            is_active: is_active,
        },
        { params: { t: new Date().getTime() } }
    );
};

const createActivityPhoto = async (formData) => {
    return axios.post(`/photo/uploadActPhoto`, formData, {
        params: { t: new Date().getTime() },
    });
};

const selectActivityPhoto = async (actId) => {
    return axios.get(`/photo/get/act/${actId}`, {
        params: { t: new Date().getTime() },
    });
};
const updateActivityPhoto = async (actId, photoId, url, is_active) => {
    return axios.put(
        `/photo/update/${photoId}`,
        { act: actId, url: url, is_active: is_active },
        { params: { t: new Date().getTime() } }
    );
};

const getAllInOne = async (actId) => {
    return axios.post(
        `/Activity/getAllinOne`,
        {
            act_Id: actId,
        },
        { params: { t: new Date().getTime() } }
    );
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
    return axios.post(`Activity/show/create`, shows, {
        params: { t: new Date().getTime() },
    });
};

const selectShowByActivity = async (
    //活動ID
    actId
) => {
    return axios.get(`/Activity/show/getByAct/${actId}`, {
        params: { t: new Date().getTime() },
    });
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
    return axios.put(`/Activity/show/update/`, shows, {
        params: { t: new Date().getTime() },
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
    return axios.post(
        `/tickets/create`,
        {
            ticket_Name: ticket_Name,
            peopleMaxium: peopleMaximum,
            startTime: startTime,
            endTime: endTime,
            price: price,
            act: actId,
            is_active: is_active,
            count: 0,
        },
        { params: { t: new Date().getTime() } }
    );
};

const selectTicketByActivityId = async (
    //活動ID
    actId
) => {
    return axios.get(`/tickets/get/actId/${actId}`, {
        params: { t: new Date().getTime() },
    });
};

const selectTicket = async (
    //票券ID
    ticketId
) => {
    return axios.get(`/tickets/get/ticketId/${ticketId}`, {
        params: { t: new Date().getTime() },
    });
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
    return axios.put(
        `/tickets/update/${ticketId}`,
        {
            ticket_Name: ticket_Name,
            peopleMaxium: peopleMaximum,
            startTime: startTime,
            endTime: endTime,
            price: price,
            count: count,
            act: actId,
            is_active: is_active,
        },
        { params: { t: new Date().getTime() } }
    );
};

const createTicketMember = async (
    //票券ID
    ticketId,
    //名稱
    actualname,
    //電話
    phone,
    //電子郵件
    mail,
    NID,
    //性別
    sex,
    // ? true false
    is_active
) => {
    return axios.post(
        `/tickets/member/create`,
        {
            actualname: actualname,
            phone: phone,
            mail: mail,
            ticket: ticketId,
            NID: NID,
            sex: sex,
            is_active: is_active,
        },
        { params: { t: new Date().getTime() } }
    );
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
    sex,
    // ? true false
    is_active
) => {
    return axios.put(
        `/tickets/member/update/${ticketMemberId}`,
        {
            actualname: actualname,
            phone: phone,
            mail: mail,
            ticket: ticketId,
            sex: sex,
            is_active: is_active,
        },
        { params: { t: new Date().getTime() } }
    );
};

const validTicket = async (token) => {
    return axios.post(
        `/tickets/vaildticket`,
        {
            token: token,
        },
        { params: { t: new Date().getTime() } }
    );
};

const createCustomerTicket = async (
    //名稱
    actualname,
    //電子郵件
    mail
) => {
    return axios.post(
        `/tickets/member/get/customer`,
        {
            actualname: actualname,
            mail: mail,
        },
        { params: { t: new Date().getTime() } }
    );
};

const selectTicketMember = async (
    //票券ID
    ticketId
) => {
    return axios.get(`/tickets/member/get/ticket/${ticketId}`, {
        params: { t: new Date().getTime() },
    });
};

const createMailFormate = async (
    //窩ㄅ知道是什麼
    joinedListId
) => {
    return axios.post(
        `/tickets/member/get/customer`,
        {
            joinedListId: joinedListId,
        },
        { params: { t: new Date().getTime() } }
    );
};

/******************************************************
                        顧客
*******************************************************/

const createCustomer = async (
    groupID,
    actualname,
    phone,
    mail,
    NID,
    customer_type,
    customer_tag,
    customer_note,
    sex
) => {
    return axios.post(
        `/customer/create`,
        {
            Group: groupID,
            actualname: actualname,
            phone: phone,
            mail: mail,
            NID: NID,
            customer_type: customer_type,
            customer_tag: customer_tag,
            customer_note: customer_note,
            sex: sex,
        },
        { params: { t: new Date().getTime() } }
    );
};

const selectCustomerByGroupId = async (groupId) => {
    return axios.get(`/customer/get/group/${groupId}`, {
        params: { t: new Date().getTime() },
    });
};

const selectCustomerByName = async (actualname) => {
    return axios.get(`/customer/get/name/${actualname}`, {
        params: { t: new Date().getTime() },
    });
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
    return axios.put(
        `/customer/update/${CustomerId}`,
        {
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
        },
        { params: { t: new Date().getTime() } }
    );
};

const createCustomerFromExcel = async (excelData, groupId) => {
    return axios.post(
        `/customer/createfromexcel`,
        {
            custom_file: excelData,
            groupId: groupId,
        },
        { params: { t: new Date().getTime() } }
    );
};

const uploadExcelToRFM = async (excelData) => {
    return axios.post(
        `/customer/uploadAnalyze`,
        {
            custom_file: excelData,
        },
        { params: { t: new Date().getTime() } }
    );
};

const downloadExcelToRFM = async (excelData) => {
    return axios.post(
        `/customer/downloadAnalyze`,
        {
            custom_file: excelData,
        },
        { params: { t: new Date().getTime() } }
    );
};

/******************************************************
                        分析
*******************************************************/

const createAnalyze = async (act, customerId, stayTime, is_active) => {
    return axios.post(
        `/pageAnalyze/page/create`,
        {
            act: act,
            cus_Id: customerId,
            stayTime: stayTime,
            is_active: is_active,
        },
        { params: { t: new Date().getTime() } }
    );
};

const selectAnalyzeByActId = async (actId) => {
    return axios.get(`/pageAnalyze/act/get/${actId}`, {
        params: { t: new Date().getTime() },
    });
};

const selectAnalyzeByPageId = async (pageId) => {
    return axios.get(`/pageAnalyze/page/get/${pageId}`, {
        params: { t: new Date().getTime() },
    });
};

const updateAnalyze = async (from, actId) => {
    return axios.post(
        `/pageAnalyze/act/update`,
        {
            from: from,
            act_Id: actId,
        },
        { params: { t: new Date().getTime() } }
    );
};

/******************************************************
                        Token
*******************************************************/

const getToken = async (username, password) => {
    return axios.post(
        `/token-auth`,
        {
            username: username,
            password: password,
        },
        { params: { t: new Date().getTime() } }
    );
};

const refreshToken = async (token) => {
    return axios.post(
        `/token-refresh`,
        {
            token: token,
        },
        { params: { t: new Date().getTime() } }
    );
};

const verifyToken = async (token) => {
    return axios.post(
        `/token-verify`,
        {
            token: token,
        },
        { params: { t: new Date().getTime() } }
    );
};

/******************************************************
                        其他
*******************************************************/

const getSchool = async () => {
    return axios.get(`/Account/getSchool`, {
        params: { t: new Date().getTime() },
    });
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
