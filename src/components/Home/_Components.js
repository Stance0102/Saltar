import React from "react";

const FormInput = ({
    Id,
    Type,
    ClassName,
    Handler,
    Title,
    notice,
    ...props
}) => {
    return (
        <>
            <label className={ClassName} htmlFor={Id}>
                {Title}
                <font className="notice">{notice}</font>
            </label>
            <input type={Type} id={Id} onChange={Handler} {...props} />
        </>
    );
};

export { FormInput };
