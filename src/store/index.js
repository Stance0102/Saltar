import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "./slice/account";

export default configureStore({
    reducer: {
        Account: AccountSlice,
    },
});