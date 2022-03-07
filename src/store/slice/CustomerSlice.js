import { createSlice } from "@reduxjs/toolkit";
export const CustomerSlice = createSlice({
    name: "Customer",
    initialState: {
        Customer_Id: null,
        NID: "",
        actualname: "",
        customer_note: "",
        customer_tag: "",
        customer_type: "",
        displayName: "",
        friendship: false,
        is_active: false,
        mail: "",
        phone: "",
        pictureUrl: "",
        sex: true,
        token: "",
        uid: "",
    },
    reducers: {
        setCustomer: (state, action) => {
            state.Customer_Id = action.payload.Customer_Id;
            state.NID = action.payload.NID;
            state.actualname = action.payload.actualname;
            state.customer_note = action.payload.customer_note;
            state.customer_tag = action.payload.customer_tag;
            state.customer_type = action.payload.customer_type;
            state.displayName = action.payload.displayName;
            state.friendship = action.payload.friendship;
            state.is_active = action.payload.is_active;
            state.mail = action.payload.mail;
            state.phone = action.payload.phone;
            state.pictureUrl = action.payload.pictureUrl;
            state.sex = action.payload.sex;
            state.token = action.payload.token;
            state.uid = action.payload.uid;
        },
    },
});

export const { setCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;
