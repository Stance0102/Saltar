import { createSlice } from "@reduxjs/toolkit";
export const AccountSlice = createSlice({
    name: "Account",
    initialState: {
        IsLogin: false,
        token: "",
        UserName: "",
        Password: "",
    },
    reducers: {
        setAccount: (state, action) => {
            state.IsLogin = true;
            state.token = action.token;
            state.UserName = action.UserName;
            state.Password = action.Password;
        },
        removeAccount: (state, action) => {
            state.IsLogin = false;
            state.token = "";
            state.UserName = "";
            state.Password = "";
        },
    },
});

export const SetAccount = (state) => state.Account;
export const RemoveAccount = (state) => state.Account;
export default AccountSlice.reducer