import { createSlice } from "@reduxjs/toolkit";

const openCartInitialState = { isOpen: false, notification: null };

const openCartSlice = createSlice({
  name: "openCart",
  initialState: openCartInitialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },

    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const openCartActions = openCartSlice.actions;

export default openCartSlice;
