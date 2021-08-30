const url = "https://163.18.42.222:8888";

const login = async (username, password) => {
    return fetch(`${url}/api/Account/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then((res) => res.json());
};

export { login };
