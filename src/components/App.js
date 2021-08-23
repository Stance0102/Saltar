import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "./Router";
// ----IMG----
import menu_Icon from "../images/menuIcon.svg";
import controlerIcon_02 from "../images/controlerIcon_02.svg";
import analysisIcon from "../images/analysisIcon.svg";
import actControl from "../images/actControl.svg";
import editorIcon from "../images/editorIcon.svg";
import vector_gray_Icon from "../images/vector_gray_Icon.svg";
import web_Icon from "../images/web_Icon.svg";

const App = () => {
    return (
        <Router>
            <div>
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
                        <Link to="/signin">
                            <button className="btn-signin">註冊</button>
                        </Link>
                    </div>
                </nav>

                <div className="main">
                    <nav className="subNav">
                        <ul>
                            <li>
                                <img src={controlerIcon_02} alt="" />
                                活動主控台
                            </li>
                            <li>
                                <img src={analysisIcon} alt="" />
                                客戶分析
                            </li>

                            <Link to="/ticket/management">
                                <li>
                                    <img src={vector_gray_Icon} alt="" />
                                    票卷管理
                                </li>
                            </Link>

                            <Link to="/activity/show">
                                <li>
                                    <img src={actControl} alt="" />
                                    活動控制
                                </li>
                            </Link>

                            <Link to="/account/edit">
                                <li>
                                    <img src={editorIcon} alt="" />
                                    系學會/社團資料編輯
                                </li>
                            </Link>
                            <li>
                                <img src={web_Icon} alt="" />
                                一頁式活動網站設定
                            </li>
                        </ul>
                    </nav>
                    <div className="content">
                        <Switch>
                            {routes.map((route, key) => {
                                if (route.exact) {
                                    return (
                                        <Route
                                            key={key}
                                            exact
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                } else {
                                    return (
                                        <Route
                                            key={key}
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                }
                            })}
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
