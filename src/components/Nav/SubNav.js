import React from "react";
import { Link } from "react-router-dom";
// Img
import controlerIcon_02 from "../../images/controlerIcon_02.svg";
import analysisIcon from "../../images/analysisIcon.svg";
import actControl from "../../images/actControl.svg";
import editorIcon from "../../images/editorIcon.svg";
import vector_gray_Icon from "../../images/vector_gray_Icon.svg";
import web_Icon from "../../images/web_Icon.svg";

const SubNav = () => {
    return (
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
    );
};

export default SubNav;
