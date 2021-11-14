import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../store/slice/AccountSlice";
import qs from "qs";
import Swal from "sweetalert2";
// https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656627554&redirect_uri=http://localhost:3000/linelogin&state=5566peko&scope=profile%20openid

const LineLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const { code, state } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        if (code == "" || state == "") {
            history.push("/");
        }
        const setupData = async () => {
            // const response = await LineLogin(code);
            // if (response.status == 200) {
            //     switch (response.data.status) {
            //         case 0:
            //             const account = response.data.results;
            //             dispatch(setAccount(account));
            //             localStorage.setItem("token", account.token);
            //             Swal.fire({
            //                 title: "登入成功",
            //                 confirmButtonText: "立即開始使用",
            //                 confirmButtonColor: "#ffb559",
            //                 icon: "success",
            //             }).then(() => {
            //                 history.push("/dashboard");
            //             });
            //             break;
            //         default:
            //             break;
            //     }
            // } else {
            //     // console.log(response);
            // }
        };
        setupData();
    }, []);

    return (
        <>
            <div>LINE CallBack Page 等待伺服器登入</div>
        </>
    );
};

export default LineLogin;
