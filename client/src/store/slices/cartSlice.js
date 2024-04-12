import { createSlice } from "@reduxjs/toolkit";
import { formatPrice } from "../../utils/formatPrice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    status: "",
    error: null,

    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    clearCartState(state) {
      state.error = null;
      state.status = "";
    },
    addToCartRequest(state, action) {
      state.loading = true;
      state.status = "pending";
    },
    addToCartSuccess(state, action) {
      console.log(action.payload);
      const payloadItem = action.payload;

      const alreadyInCart = state.cartItems.find((element) => {
        return element._id === payloadItem._id;
      });

      if (alreadyInCart) {
        state.loading = false;
        state.status = "success";
        state.cartItems = state.cartItems.map((element) => {
          return element._id === payloadItem._id ? payloadItem : element;
        });
      } else {
        state.loading = false;
        state.status = "success";
        state.cartItems = [payloadItem, ...state.cartItems];
      }

      state.itemsPrice = formatPrice(
        state.cartItems?.reduce((accumulator, element) => {
          return (accumulator += element.price * element.qty);
        }, 0)
      );

      state.taxPrice = formatPrice(state.itemsPrice * 0.1);

      state.totalPrice = formatPrice(state.itemsPrice + state.taxPrice);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    addToCartFail(state, action) {
      state.loading = false;
      state.status = "fail";
      state.error = action.payload;
    },
    removeFromCart(state, action) {
      cartItems = state.cartItems.filter((element) => {
        return element._id !== action.payload;
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  removeFromCart,
  clearCart,
  clearCartState
} = cartSlice.actions;

export const cartsCombinedReducer = cartSlice.reducer;
