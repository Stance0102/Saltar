import React from "react";

const LineButton = ({ clientID, state, nonce, scope, redirectURI, maxAge }) => {
    const lineLogin = (e) => {
        e.preventDefault();

        const baseUrl = "https://access.line.me/oauth2/v2.1/authorize?";
        const params = new URLSearchParams({
            response_type: "code",
            client_id: clientID,
            state: state,
            scope: scope,
            nonce: nonce,
            max_age: maxAge,
        });

        const finalUrl =
            baseUrl + params.toString() + "&redirect_uri=" + redirectURI;
        window.location.href = finalUrl;
    };

    return (
        <div>
            <button onClick={(e) => lineLogin(e)}>Line 登入</button>
        </div>
    );
};

export default LineButton;
