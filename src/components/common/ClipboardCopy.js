import React, { useState } from "react";

const ClipboardCopy = ({ copyText, className = "" }) => {
    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand("copy", true, text);
        }
    }
    const handleCopyClick = () => {
        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div style={{ width: "100%" }}>
            <input
                style={{ width: "70%" }}
                type="text"
                value={copyText}
                readOnly
            />
            <button className={className} onClick={handleCopyClick}>
                <span>{isCopied ? "已複製" : "複製"}</span>
            </button>
        </div>
    );
};
export default ClipboardCopy;
