import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../store/slice/CustomerSlice";
import { lineLogin, createPackageTicketMember } from "../agent";
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
            if (response.data.status == 0) {
                const lineData = response.data.result;
                if (lineData.friendship === true) {
                    const lineReDirect = localStorage.getItem("lineReDirect");
                    const lineReDirectId =
                        localStorage.getItem("lineReDirectId");
                    dispatch(setCustomer(lineData)); // Token 已經在裡面
                    localStorage.setItem("token", lineData.token);
                    switch (lineReDirect) {
                        case "onePage":
                            Swal.fire({
                                title: "登入成功",
                                confirmButtonText: "立即開始使用",
                                confirmButtonColor: "#ffb559",
                                icon: "success",
                            }).then(() => {
                                history.push(`/onePageEvent/${lineReDirectId}`);
                            });
                            break;

                        case "lineEdit":
                            Swal.fire({
                                title: "登入成功",
                                confirmButtonText: "前往修改資料",
                                confirmButtonColor: "#ffb559",
                                icon: "success",
                            }).then(() => {
                                history.push(`/${lineReDirectId}`);
                            });
                            break;

                        case "invite":
                            if (lineData.Customer_Id == null) {
                                Swal.fire({
                                    title: "請先註冊",
                                    confirmButtonText: "前往註冊帳號",
                                    confirmButtonColor: "#ffb559",
                                    icon: "info",
                                }).then(() => {
                                    history.push("/lineEdit");
                                });
                            }
                            const packageResponse =
                                await createPackageTicketMember(
                                    lineReDirectId,
                                    lineData.Customer_Id
                                );
                            switch (packageResponse.data.status) {
                                case 0:
                                    Swal.fire({
                                        title: "接受邀請成功",
                                        confirmButtonText: "回首頁",
                                        confirmButtonColor: "#ffb559",
                                        icon: "success",
                                    }).then(() => {
                                        history.push(`/`);
                                    });
                                    break;
                                case 17:
                                    Swal.fire({
                                        title: "已經接受邀請",
                                        confirmButtonText: "回首頁",
                                        confirmButtonColor: "#ffb559",
                                        icon: "error",
                                    }).then(() => {
                                        history.push(`/`);
                                    });
                                    break;
                                case 18:
                                    Swal.fire({
                                        title: "此套票已額滿",
                                        confirmButtonText: "回首頁",
                                        confirmButtonColor: "#ffb559",
                                        icon: "error",
                                    }).then(() => {
                                        history.push(`/`);
                                    });
                                    break;
                                case 19:
                                    Swal.fire({
                                        title: "查無票券",
                                        confirmButtonText: "回首頁",
                                        confirmButtonColor: "#ffb559",
                                        icon: "error",
                                    }).then(() => {
                                        history.push(`/`);
                                    });
                                    break;
                                case 25:
                                    Swal.fire({
                                        title: "請驗證電子郵件信箱",
                                        confirmButtonText: "回首頁",
                                        confirmButtonColor: "#ffb559",
                                        icon: "info",
                                    }).then(() => {
                                        history.push(`/`);
                                    });
                                    break;
                            }
                    }
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
