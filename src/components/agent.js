import axios from "axios";

const url = "http://163.18.42.222:8888";

const login = (username, password) => {
    return axios.post(`${url}/api/Account/login`, {
        username: username,
        password: password,
    });
};

const signup = async (username, password, email, telNumber) => {
    return axios.post(`${url}/api/Account/create`, {
        username: email,
        actualname: username,
        password: password,
        address: "string",
        phone: telNumber,
        school: "string",
        devicetoken: "string",
        is_admin: true,
    });
};

export { login, signup };
