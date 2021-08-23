import React from "react";
import menu_Icon from "../../images/menuIcon.svg";
import { BrowserRouter, Router, Link } from "react-router-dom";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";

const Nav = () => {
    return (
        <BrowserRouter>
            <nav className="mainNav">
                <ul>
                    <li>
                        <img src={menu_Icon} />
                    </li>
                    <li className="navLogoTxt">
                        <Link to="/">Saltar</Link>
                    </li>
                </ul>
                <div className="searchBar">
                    <i class="fas fa-search"></i>
                    <input
                        className="searchInp"
                        type="text"
                        name="searchInp"
                        placeholder="搜尋Salter"
                    />
                </div>

                <div className="navBtnGroup">
                    <button className="btn-login">
                        <Link to="/login">登入</Link>
                    </button>
                    <button className="btn-signin">
                        <Link to="/signin">註冊</Link>
                    </button>
                </div>

                <Router exact path="/" component={Home}></Router>
                <Router exact path="/signin" component={SignIn}></Router>
            </nav>
        </BrowserRouter>
    );
};

export default Nav;
