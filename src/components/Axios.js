import _axios from "axios";

const url = "https://saltar.taipei/api/";

const axios = () => {
    const instance = _axios.create({
        baseURL: url,
        timeout: 3000,
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
