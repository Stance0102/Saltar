import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormInput } from "../Home/_Components";
import { createCustomer, createGroupCustomerShip } from "../agent";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const AddCustomer = () => {
    const history = useHistory();
    const { groupId } = useSelector((state) => state.Account);
    const [customer, setCustomer] = useState({});
    const {
        cusName,
        cusSex,
        cusMail,
        cusTel,
        cusNID,
        cusTicketsNum,
        cusTicketsPrice,
        cusType,
        cusTag,
        cusNote,
    } = customer;

    const onChangeCusName = (e) => {
        const cusName = e.target.value;
        setCustomer({ ...customer, cusName: cusName });
    };
    const onChangeCusSex = (e) => {
        // console.log(e);
        const cusSex = e.target.value;
        setCustomer({ ...customer, cusSex: cusSex });
    };
    const onChangeCusMail = (e) => {
        const cusMail = e.target.value;
        setCustomer({ ...customer, cusMail: cusMail });
    };
    const onChangeCusNID = (e) => {
        const cusNID = e.target.value;
        setCustomer({ ...customer, cusNID: cusNID });
    };
    const onChangeCusTel = (e) => {
        const cusTel = e.target.value;
        setCustomer({ ...customer, cusTel: cusTel });
    };
    const onChangeCusTicketsNum = (e) => {
        const cusTicketsNum = e.target.value;
        setCustomer({ ...customer, cusTicketsNum: cusTicketsNum });
    };
    const onChangeCusTicketsPrice = (e) => {
        const TicketsPrice = e.target.value;
        setCustomer({ ...customer, TicketsPrice: TicketsPrice });
    };
    const onChangeCusType = (e) => {
        const cusType = e.target.value;
        setCustomer({ ...customer, cusType: cusType });
    };
    const onChangeCusTag = (e) => {
        const cusTag = e.target.value;
        setCustomer({ ...customer, cusTag: cusTag });
    };
    const onChangeCusNote = (e) => {
        const cusNote = e.target.value;
        setCustomer({ ...customer, cusNote: cusNote });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            cusName === "" ||
            cusSex === "" ||
            cusMail === "" ||
            cusNID === "" ||
            cusTel === "" ||
            cusTicketsNum === "" ||
            cusTicketsPrice === "" ||
            cusType === "" ||
            cusTag === "" ||
            cusNote === ""
        ) {
            return Swal.fire({
                title: "?????????????????????",
                confirmButtonText: "?????????",
                confirmButtonColor: "#ffb559",
                icon: "info",
            });
        }
        const response = await createCustomer(
            groupId,
            cusName,
            cusTel,
            cusMail,
            cusNID,
            cusType,
            cusTag,
            cusNote,
            cusSex === "male",
            null
        );
        if (response.status == 200) {
            switch (response.data.status) {
                case 0:
                    const shipResponse = await createGroupCustomerShip(
                        groupId,
                        response.data.results.Id,
                        null,
                        null,
                        null
                    );
                    if (shipResponse.status == 200) {
                        switch (shipResponse.data.status) {
                            case 0:
                                Swal.fire({
                                    title: "????????????",
                                    confirmButtonText: "??????",
                                    confirmButtonColor: "#ffb559",
                                    icon: "success",
                                }).then(() => {
                                    history.push("/dashboard");
                                });
                                break;
                            default:
                                Swal.fire({
                                    title: "????????????",
                                    text: JSON.stringify(response.data.results),
                                    confirmButtonText: "?????????",
                                    confirmButtonColor: "#ffb559",
                                    icon: "error",
                                });
                                break;
                        }
                    }

                    break;
                default:
                    Swal.fire({
                        title: "????????????",
                        text: JSON.stringify(response.data.results),
                        confirmButtonText: "?????????",
                        confirmButtonColor: "#ffb559",
                        icon: "error",
                    });
                    break;
            }
        } else {
            // console.log(response);
        }
    };

    return (
        <div className="account-box">
            <div className="account-box-title">
                <p>????????????</p>
                <hr />
            </div>
            <div className="container">
                <form className="edit-form" onSubmit={handleSubmit}>
                    <FormInput
                        Id="customerName"
                        Type="text"
                        ClassName="input-label"
                        Title="????????????"
                        onChange={(e) => onChangeCusName(e)}
                    />

                    <p>????????????</p>
                    <div className="input-radio-group">
                        <FormInput
                            Id="sex"
                            Type="radio"
                            ClassName=""
                            Title="???"
                            value="male"
                            name="sex"
                            onChange={(e) => onChangeCusSex(e)}
                        />

                        <FormInput
                            Id="sex"
                            Type="radio"
                            ClassName=""
                            Title="???"
                            value="female"
                            name="sex"
                            onChange={(e) => onChangeCusSex(e)}
                        />
                    </div>

                    <FormInput
                        Id="email"
                        Type="email"
                        ClassName="input-label"
                        Title="????????????"
                        onChange={(e) => onChangeCusMail(e)}
                    />

                    <FormInput
                        Id="email"
                        Type="text"
                        ClassName="input-label"
                        Title="?????????????????????"
                        onChange={(e) => onChangeCusNID(e)}
                    />

                    <FormInput
                        Id="telNumber"
                        Type="tel"
                        ClassName="input-label"
                        onChange={(e) => onChangeCusTel(e)}
                        Title="??????????????????"
                    />

                    <FormInput
                        Id="orderNumber"
                        Type="number"
                        ClassName="input-label"
                        Title="?????????????????????"
                        onChange={(e) => onChangeCusTicketsNum(e)}
                    />

                    <FormInput
                        Id="orderPrice"
                        Type="number"
                        ClassName="input-label"
                        Title="?????????????????????"
                        onChange={(e) => onChangeCusTicketsPrice(e)}
                    />

                    <FormInput
                        Id="customerLevel"
                        Type="text"
                        ClassName="input-label"
                        Title="????????????"
                        onChange={(e) => onChangeCusType(e)}
                    />

                    <FormInput
                        Id="customerSort"
                        Type="text"
                        ClassName="input-label"
                        Title="????????????"
                        onChange={(e) => onChangeCusTag(e)}
                    />

                    <FormInput
                        Id="note"
                        Type="text"
                        ClassName="input-label"
                        Title="??????"
                        onChange={(e) => onChangeCusNote(e)}
                    />

                    <div className="form-btn-group">
                        <button className="form-save" type="submit">
                            ??????
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;
