import { createSlice } from "@reduxjs/toolkit";

export const MenuSlice = createSlice({
    name: "Menu",
    initialState: {
        isOpen: true,
    },
    reducers: {
        openMenu: (state, action) => {
            state.isOpen = true;
        },
        closeMenu: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openMenu, closeMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
