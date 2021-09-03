import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../Router";
// import Auth from "../Auth";
// Img
import menu_Icon from "../../images/menuIcon.svg";

const SuperNav = () => {
    // const history = useHistory();

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
                {/* {isLogged && (
                    <button
                        className="btn-login"
                        onClick={() => {
                            Auth.logout(() => {
                                history.push("/login");
                            });
                        }}
                    >
                        登出
                    </button>
                )} */}
                {/* {!isLogged && ( */}
                <Link to={routes.LOGIN}>
                    <button className="btn-login">登入</button>
                </Link>
                {/* )} */}
                {/* {!isLogged && ( */}
                <Link to={routes.SIGNIN}>
                    <button className="btn-signin">註冊</button>
                </Link>
                {/* )} */}
            </div>
        </nav>
    );
};

export default SuperNav;
