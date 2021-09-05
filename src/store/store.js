import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "./slice/AccountSlice";

export default configureStore({
    reducer: {
        Account: AccountSlice,
    },
});
