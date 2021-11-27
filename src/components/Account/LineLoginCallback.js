import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../store/slice/AccountSlice";
import { lineLogin } from "../agent";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import LineLogin from "./LineLogin";

const LineLoginCallback = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const { code, state } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        const lineState = localStorage.getItem("lineState");
        if (lineState == null) {
            return Swal.fire({
                title: "頁面逾期",
                confirmButtonText: "重新登入",
                confirmButtonColor: "#ffb559",
                icon: "error",
            }).then(() => {
                LineLogin();
            });
        }
        if (lineState != state) {
            return Swal.fire({
                title: "State驗證失敗",
                confirmButtonText: "重新登入",
                confirmButtonColor: "#ffb559",
                icon: "error",
            }).then(() => {
                LineLogin();
            });
        }
        if (code == "" || state == "") {
            return history.push("/login");
        }
        localStorage.removeItem("lineState");
        const setupData = async () => {
            const response = await lineLogin(code);
            if (response.status == 200) {
                switch (response.data.status) {
                    case 0:
                        const lineData = response.data.result;
                        if (lineData.friendship === true) {
                            localStorage.setItem(
                                "lineData",
                                JSON.stringify(lineData)
                            );
                            Swal.fire({
                                title: "登入成功",
                                confirmButtonText: "立即開始使用",
                                confirmButtonColor: "#ffb559",
                                icon: "success",
                            }).then(() => {
                                const lineReDirectId =
                                    localStorage.getItem("lineReDirectId");
                                history.push(`/onePageEvent/${lineReDirectId}`);
                            });
                        } else {
                            Swal.fire({
                                title: "非常抱歉",
                                text: "請將 Saltar LineBot 加入好友或解除封鎖，才能繼續買票喔！",
                                confirmButtonText: "重新登入",
                                confirmButtonColor: "#ffb559",
                                icon: "info",
                            }).then(() => {
                                LineLogin();
                            });
                        }

                        break;
                    default:
                        break;
                }
            } else {
                // console.log(response);
            }
        };
        setupData();
    }, []);

    return (
        <>
            <div>LINE CallBack Page 等待伺服器回應</div>
        </>
    );
};

export default LineLoginCallback;
