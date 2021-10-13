import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "./slice/AccountSlice";
import MenuSlice from "./slice/MenuSlice";

export default configureStore({
    reducer: {
        Account: AccountSlice,
        Menu: MenuSlice,
    },
});
