import _axios from "axios";

// const url = "https://saltar.taipei/api/";
const url = "https://saltar.taipei/test/api/";

const axios = () => {
    const instance = _axios.create({
        baseURL: url,
        timeout: 10000,
    });
    return instance;
};
export { axios };
export default axios();
