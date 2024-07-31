import { createSlice } from "@reduxjs/toolkit";
import { formatPrice } from "../../utils/formatPrice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    status: "",
    error: null,

    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))?.cartItems
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

      state.taxPrice = formatPrice(state.itemsPrice * 0.1).toFixed(2);

      state.totalPrice = formatPrice(state.itemsPrice + state.taxPrice);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    addToCartFail(state, action) {
      state.loading = false;
      state.status = "fail";
      state.error = action.payload;
    },
    removeFromCart(state, action) {
      state.itemsPrice = formatPrice(state.itemsPrice - action.payload.price);
      state.taxPrice = formatPrice(state.taxPrice - action.payload.price * 0.1);
      state.totalPrice = formatPrice(
        state.totalPrice - (action.payload.price + action.payload.price * 0.1)
      );
      
      state.cartItems = state.cartItems.filter((element) => {
        return element._id !== action.payload._id;
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  removeFromCart,
  clearCart,
  clearCartState,
} = cartSlice.actions;

export const cartsCombinedReducer = cartSlice.reducer;
