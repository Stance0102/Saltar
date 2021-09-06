import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAccount } from "../../store/slice/AccountSlice";
import * as routes from "../Router";
// Img
import menu_Icon from "../../images/menuIcon.svg";

const SuperNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLogin } = useSelector((state) => state.Account);

    function handleLogout(e) {
        e.preventDefault();
        dispatch(removeAccount());
        localStorage.removeItem("token");
        history.push("/");
    }

    return (
        <nav className="superNav">
            <ul>
                <li>
                    <img src={menu_Icon} alt="" />
                </li>
                <li className="navLogoTxt">
                    <Link to="/">Saltar</Link>
                </li>
            </ul>

            <div className="navBtnGroup">
                {isLogin && (
                    <button
                        className="btn-login"
                        onClick={(e) => handleLogout(e)}
                    >
                        登出
                    </button>
                )}
                {!isLogin && (
                    <Link to={routes.LOGIN}>
                        <button className="btn-login">登入</button>
                    </Link>
                )}
                {!isLogin && (
                    <Link to={routes.SIGNUP}>
                        <button className="btn-signin">註冊</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default SuperNav;
