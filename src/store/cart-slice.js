import { createSlice } from "@reduxjs/toolkit";

import { openCartActions } from "./ui-slice";

const shopingCartInitialState = {
  items: [],
  totalQuantity: 0,
};

const shopingCartSlice = createSlice({
  name: "shopingCart",
  initialState: shopingCartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      openCartActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data!",
      })
    );

    const sendRequset = async () => {
      const response = await fetch(
        "https://react-http-6bf30-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };
    try {
      await sendRequset();
      dispatch(
        openCartActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sending cart data successufully!",
        })
      );
    } catch (error) {
      dispatch(
        openCartActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const shopingCartActions = shopingCartSlice.actions;

export default shopingCartSlice;
