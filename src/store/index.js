import { configureStore } from "@reduxjs/toolkit";

import openCartSlice from "./ui-slice";
import shopingCartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    openCart: openCartSlice.reducer,
    shopingCart: shopingCartSlice.reducer,
  },
});

export default store;
