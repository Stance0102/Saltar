import React from "react";

const LineLogin = () => {
    const clientID = "1656570244";
    const nonce = "7788";
    const redirectURI = `${
        window.location.protocol + "//" + window.location.host
    }/linelogin`;
    const scope = "profile openid";
    const maxAge = "120";
    const bot_prompt = "aggressive";

    const lineState = (Math.random() + 1).toString(36).substring(2);
    localStorage.setItem("lineState", lineState);

    const baseUrl = "https://access.line.me/oauth2/v2.1/authorize?";
    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientID,
        state: lineState,
        scope: scope,
        nonce: nonce,
        max_age: maxAge,
        prompt: "consent",
        bot_prompt: bot_prompt,
    });

    const finalUrl =
        baseUrl + params.toString() + "&redirect_uri=" + redirectURI;
    window.location.href = finalUrl;
};

export default LineLogin;
