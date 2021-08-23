import React from "react";
import controlerIcon_02 from "../../images/controlerIcon_02.svg";
import analysisIcon from "../../images/analysisIcon.svg";
import actControl from "../../images/actControl.svg";
import editorIcon from "../../images/editorIcon.svg";

const SubNav = () => {
    return (
        <nav className="subNav">
            <ul>
                <li>
                    <img src={controlerIcon_02} />
                    活動主控台
                </li>
                <li>
                    <img src={analysisIcon} />
                    客戶分析
                </li>
                <li>
                    <img src={actControl} />
                    活動控制
                </li>
                <li>
                    <img src={editorIcon} />
                    系學會/社團資料編輯
                </li>
            </ul>
        </nav>
    );
};

export default SubNav;
