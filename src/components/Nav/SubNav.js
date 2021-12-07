import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../Router";
import { useSelector } from "react-redux";
// Img
import controlerIcon_02 from "../../images/controlerIcon_02.svg";
import analysisIcon from "../../images/analysisIcon.svg";
import actControl from "../../images/actControl.svg";
import editorIcon from "../../images/editorIcon.svg";
import vector_gray_Icon from "../../images/vector_gray_Icon.svg";
import web_Icon from "../../images/web_Icon.svg";

const SubNav = ({ url }) => {
    const { isOpen } = useSelector((state) => state.Menu);
    const classNameText = isOpen ? "subNav" : "closeNav";
    return (
        <>
            <nav className={classNameText}>
                <ul>
                    <Link to={`${url}/${routes.ACTIVITY_MANAGEMENT}`}>
                        <li>
                            <img src={web_Icon} alt="" />
                            建立/管理一頁式活動頁
                        </li>
                    </Link>
                    <Link to={`${url}/${routes.TICKET_MANAGEMENT}`}>
                        <li>
                            <img src={vector_gray_Icon} alt="" />
                            票卷管理
                        </li>
                    </Link>
                    <Link to={routes.DASHBOARD}>
                        <li>
                            <img src={controlerIcon_02} alt="" />
                            活動主控台
                        </li>
                    </Link>
                    <Link to={`${url}/${routes.ANALYZE}`}>
                        <li>
                            <img src={analysisIcon} alt="" />
                            客戶分析
                        </li>
                    </Link>
                    <Link to={`${url}/${routes.EDIT}`}>
                        <li>
                            <img src={editorIcon} alt="" />
                            編輯主辦方資料
                        </li>
                    </Link>
                </ul>
            </nav>
        </>
    );
};

export default SubNav;
