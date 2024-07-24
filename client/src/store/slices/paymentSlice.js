import { createSlice } from "@reduxjs/toolkit";
import { checkoutPaymentThunk } from "../thunks/paymentThunks/checkoutPaymentThunk";
import { verifyPaymentThunk } from "../thunks/paymentThunks/verifyPaymentThunk";

const paymentsSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    error: null,
    status: "",
    clientSecret: "",
    paymentId: "",
    metadata: null,
  },
  reducers: {
    clearPaymentState(state) {
      state.error = null;
      state.status = "";
    },
  },

  extraReducers(builder) {
    ////////////// PENDING
    builder.addCase(checkoutPaymentThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    builder.addCase(verifyPaymentThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    ////////////// FULFILLED
    builder.addCase(checkoutPaymentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "success";
      state.clientSecret = action.payload.clientSecret;
      state.paymentId = action.payload.paymentId;
      state.metadata = action.payload.metadata;
    });

    builder.addCase(verifyPaymentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.paymentReferenceId = action.payload.paymentReferenceId;
    });

    ////////////// REJECTED
    builder.addCase(checkoutPaymentThunk.rejected, (state, action) => {
      state.loading = false;
      state.status = action.payload?.status;
      state.error = action.payload;
    });

    builder.addCase(verifyPaymentThunk.rejected, (state, action) => {
      state.loading = false;
    //   state.status = action.payload?.status;
    //   state.error = action.payload;
    });
  },
});

export const { clearPaymentState } = paymentsSlice.actions;
export const paymentsCombinedReducer = paymentsSlice.reducer;
