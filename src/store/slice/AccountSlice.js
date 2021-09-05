import { createSlice } from "@reduxjs/toolkit";

export const AccountSlice = createSlice({
    name: "Account",
    initialState: {
        isLogin: false,
        Id: "",
        name: "",
        groupId: "",
        token: "",
    },
    reducers: {
        SetAccount: (state, action) => {
            state.isLogin = true;
            state.Id = action.payload.Id;
            state.name = action.payload.name;
            state.groupId = action.payload.groupId;
            state.token = action.payload.token;
        },
        removeAccount: (state, action) => {
            state.isLogin = false;
            state.Id = "";
            state.name = "";
            state.groupId = "";
            state.token = "";
        },
    },
});

export const { SetAccount, RemoveAccount } = AccountSlice.actions;
export default AccountSlice.reducer;
