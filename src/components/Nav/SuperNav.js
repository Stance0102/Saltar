import React from "react";
import { Link, Redirect } from "react-router-dom";
// Img
import menu_Icon from "../../images/menuIcon.svg";

const SuperNav = () => {
    const location = {
        pathname: "/signin",
        state: { fromDashboard: true },
    };

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
            {/* <div className="searchBar">
                <i class="fas fa-search"></i>
                <input
                    className="searchInp"
                    type="text"
                    name="searchInp"
                    placeholder="搜尋Salter"
                />
            </div> */}

            <div className="navBtnGroup">
                <Link to="/login">
                    <button className="btn-login">登入</button>
                </Link>
                <Link to="/siginin">
                    <button className="btn-signin">註冊</button>
                </Link>
            </div>
        </nav>
    );
};

export default SuperNav;
