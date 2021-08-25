import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "./Router";
import SuperNav from "./Nav/SuperNav";
import SubNav from "./Nav/SubNav";
// ----IMG----
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
                <SuperNav />

                <div className="main">
                    <SubNav />
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
