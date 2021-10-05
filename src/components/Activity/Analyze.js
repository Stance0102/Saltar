import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Bar, Doughnut } from "react-chartjs-2";
import * as routes from "../Router";
import { Link } from "react-router-dom";
import { selectCustomerByGroupId } from "../agent";
// Img
import tick_Icon from "../../images/tick_Icon.svg";
import Email_Icon from "../../images/Email_Icon.svg";

const Analyze = () => {
    const { groupId } = useSelector((state) => state.Account);
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        const setupData = async () => {
            const response = await selectCustomerByGroupId(groupId);
            if (response.status === 200) {
                switch (response.data.status) {
                    case 0:
                        setCustomers(response.data.results);
                        break;
                    default:
                        break;
                }
            } else {
                // console.log(response);
            }
        };
        setupData();
    }, []);

    return (
        <div className="activity-box">
            <div className="activity-box-title">
                客戶分析
                <hr />
            </div>
            <div className="comeBackAnalyze">
                <p>回流頻率人次</p>
                <Bar
                    className="chart"
                    data={comeBackData}
                    options={comeBackOptions}
                />
            </div>
            <div className="analyze-container">
                <div className="genderAnalyze">
                    <p>顧客性別比例</p>
                    <Doughnut className="chart" data={genderData} />
                </div>
                <div className="ageAnalyze">
                    <p>顧客年齡分析</p>
                    <Bar
                        className="chart"
                        data={ageData}
                        options={ageOptions}
                    />
                </div>
            </div>
            <div className="custmerList">
                <p>
                    顧客列表{" "}
                    <Link className="addCustmer" to={`${routes.ADDCUSTOMER}`}>
                        新增顧客
                    </Link>
                </p>
                <div className="custmer-row-box">
                    <div className="row-box-title">
                        <h6>顧客姓名</h6>
                        <h6>性別</h6>
                        <h6>電話</h6>
                        <h6>成交訂單數</h6>
                        <h6>成交訂單金額</h6>
                        <h6>等級</h6>
                        <h6>客戶類別</h6>
                        <h6>備註</h6>
                    </div>
                    {customers.map((customer, index) => {
                        return (
                            <div className="row-container">
                                <h6 className="row-number">{index}</h6>
                                <div className="row-textbox">
                                    <h6 className="row-text">
                                        {customer.actualname}
                                    </h6>
                                    <h6 className="row-text">
                                        {customer.sex === true ? "男" : "女"}
                                    </h6>
                                    <h6 className="row-text">
                                        {customer.phone}
                                    </h6>
                                    <h6 className="row-text">
                                        {customer.customer_orders_count}
                                    </h6>
                                    <h6 className="row-text">
                                        {customer.customer_orders_totalcharge}
                                    </h6>
                                    <h6 className="row-text success">
                                        {customer.customer_type}
                                    </h6>
                                    <h6 className="row-text fail">
                                        {customer.customer_tag}
                                    </h6>
                                    <h6 className="row-text">
                                        {customer.customer_note}
                                    </h6>
                                    <div className="row-btn-group">
                                        <button className="delete">
                                            <img src={Email_Icon} alt="" />
                                        </button>
                                        <button className="check">
                                            <img src={tick_Icon} alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const comeBackData = {
    labels: ["test1", "test2", "test3", "test4", "test5", "test6"],
    datasets: [
        {
            label: "回流頻率人次",
            data: [9, 19, 29, 39, 49, 59],
            barPercentage: 0.12,
            backgroundColor: [
                "#5cb4ff",
                "#5cb4ff",
                "#5cb4ff",
                "#5cb4ff",
                "#5cb4ff",
                "#5cb4ff",
            ],
            borderWidth: 0,
        },
    ],
};

const comeBackOptions = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const genderData = {
    labels: ["男", "女"],
    datasets: [
        {
            label: "顧客性別比例",
            barPercentage: 0.1,
            data: [50, 50],
            backgroundColor: ["#5ab0f9", "#ff6a81"],
            hoverOffset: 4,
            display: false,
            position: "bottom",
        },
    ],
};

const ageData = {
    labels: [
        "17歲以下",
        "18-24",
        "25-34",
        "35-44",
        "45-54",
        "55-64",
        "65歲以上",
    ],
    datasets: [
        {
            label: "顧客年齡分析",
            data: [9, 61, 43, 39, 27, 2, 3],
            barPercentage: 0.1,
            display: false,
            backgroundColor: [
                "#ffb559",
                "#ffb559",
                "#ffb559",
                "#ffb559",
                "#ffb559",
                "#ffb559",
            ],
            borderWidth: 0,
        },
    ],
};

const ageOptions = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

export default Analyze;
