import _axios from "axios";

// const url = "https://saltar.taipei/api/";
const url = "https://saltar.taipei/test/api/";

let pendingRequests = new Map();
let store;

export const injectStore = (_store) => {
    store = _store;
};

const axios = () => {
    const instance = _axios.create({
        baseURL: url,
        timeout: 10000,
    });

    instance.interceptors.request.use(
        (config) => {
            // Before Request
            const requestKey = `${config.url}/${JSON.stringify(
                config.params
            )}/${JSON.stringify(config.data)}&request_type=${config.method}`;
            if (pendingRequests.has(requestKey)) {
                config.cancelToken = new _axios.CancelToken((cancel) => {
                    cancel(`Request repeat: ${requestKey}`);
                });
            } else {
                pendingRequests.set(requestKey, config);
                config.requestKey = requestKey;
            }

            config.headers = {
                ...config.headers,
                // authorization: `JWT ${store.getState().Customer.token}`,
            };

            config.params = {
                ...config.params,
                t: new Date().getTime(),
            };
            return config;
        },
        (error) => {
            // Request Error
            pendingRequests.clear();
            return error;
        }
    );

    instance.interceptors.response.use(
        (response) => {
            // Response Success
            const requestKey = response.config.requestKey;
            pendingRequests.delete(requestKey);
            return response;
        },
        (error) => {
            // Response Error
            if (_axios.isCancel(error)) {
                return error;
            }
            pendingRequests.clear();
            return error;
        }
    );

    return instance;
};
export { axios };
export default axios();
