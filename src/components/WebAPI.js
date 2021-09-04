import swal from "sweetalert";

const url = "http://163.18.42.222:8888";

const login = async (username, password) => {
    try {
        await fetch(`${url}/api/Account/login`, {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            mode: "cors",
            // 疑似後端接收成Form表單了
            // body: JSON.stringify({
            //     username: `${username}`,
            //     password: `${password}`,
            // }),
            body: `username=${username}&password=${password}`,
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        if (data.status == 0) {
                            swal("成功！", "登入完成囉！快去使用吧！", "success");
                            return data;
                        } else if (data.status == 1) {
                            swal("未註冊！", "此帳號尚未註冊！", "info");
                        } else if (data.status == 2) {
                            swal("失敗！", "登入失敗！請確認帳號密碼是否有錯！", "error");
                        }
                        console.log("in done");
                    });
                } else {
                    console.log(res);
                }
            })
            .catch((e) => console.log(e));
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
