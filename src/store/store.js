import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "./slice/AccountSlice";
import MenuSlice from "./slice/MenuSlice";
import CustomerSlice from "./slice/CustomerSlice";

export default configureStore({
    reducer: {
        Account: AccountSlice,
        Menu: MenuSlice,
        Customer: CustomerSlice,
    },
});
