import React from "react";
import { useLocation } from "react-router-dom";
import LineLogin from "../Account/LineLogin";
import qs from "qs";

const PackageInvite = () => {
    const location = useLocation();

    const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
        decoder: (c) => c,
    });
    console.log(code);
    localStorage.setItem("lineReDirect", "invite");
    localStorage.setItem("lineReDirectId", code);
    LineLogin();
};

export default PackageInvite;
