import swal from "sweetalert";

const url = "http://163.18.42.222:8888";

const login = async (username, password) => {
    try {
        await fetch(`${url}/api/Account/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            mode: "no-cors",
            body: JSON.stringify({
                username,
                password,
                // email,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => console.log(data));
                } else {
                    console.log(res);
                }
            })
            .catch((e) => console.log(e));

        return swal("成功！", "登入完成囉！快去使用吧！", "success");
    } catch (err) {
        console.log(err);
    }
};

const signin = async (username, password, email, telNumber) => {
    try {
        console.log(username, password, telNumber, email);
        await fetch(`${url}/api/Account/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                username: `${email}`,
                actualname: `${username}`,
                password: `${password}`,
                address: "string",
                phone: `${telNumber}`,
                school: "string",
                devicetoken: "string",
                is_admin: true,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    console.log(res.json());
                } else {
                    console.log(res);
                }
            })
            // .then((data) => console.log(data))
            .catch((e) => console.log(e));
        return swal("成功！", "註冊完成囉！快去登入吧！", "success");
    } catch (err) {
        console.log(err);
    }
};

export { login, signin };

// if (res.ok) {
//     res.json().then((data) => console.log(data));
// } else {
//     console.log(res);
// }
