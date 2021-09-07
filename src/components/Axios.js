import _axios from "axios";

const url = "http://163.18.42.222:8888";

const axios = () => {
    const instance = _axios.create({
        baseURL: url,
        timeout: 1000,
        // params: {
        //     t: timeStamp,
        // },
        // headers: {
        //     "Cache-Control": "no-cache",
        // },
    });
    return instance;
};
export { axios };
export default axios();
