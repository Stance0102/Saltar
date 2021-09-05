import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({
    component: Component,
    authenticated,
    ...rest
}) => {
    //取出 Redux
    const { isLogin } = useSelector((state) => state.Account);
    console.log(isLogin);
    return (
        <Route
            {...rest}
            render={(props) => {
                console.log(props);
                if (isLogin) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
