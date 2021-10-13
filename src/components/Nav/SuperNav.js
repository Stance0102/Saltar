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

    const [menuOpen, setMenuOpen] = useState(true);
    let i = 1;
    const handleMenuSwitch = () => {
        i++;
        if (i % 2 === 0) {
            setMenuOpen(false);
        } else {
            setMenuOpen(true);
        }
    };

    return (
        <nav className="superNav">
            <ul>
                <li>
                    <img src={menu_Icon} onClick={handleMenuSwitch} />
                </li>
                <li className="navLogoTxt">
                    <Link to="/">Saltar</Link>
                </li>
            </ul>

            <div className="navBtnGroup">
                {isLogin && (
                    <Link to={routes.DASHBOARD} className="btn-dashboard">
                        Dashborad
                    </Link>
                )}
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
