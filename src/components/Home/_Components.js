import React from "react";

const FormInput = ({ Id, Type, ClassName, Handler, Title, ...props }) => {
    return (
        <>
            <label className={ClassName} htmlFor={Id}>
                {Title}
            </label>
            <input type={Type} id={Id} onChange={Handler} {...props} />
        </>
    );
};

export { FormInput };
