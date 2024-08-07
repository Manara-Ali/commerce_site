import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk } from "../thunks/reviewThunks/createReviewThunk";
import { getAllReviewsByMealThunk } from "../thunks/reviewThunks/getAllReviewsByMealThunk";
import { deleteReviewThunk } from "../thunks/reviewThunks/deleteReviewThunk";
import { updateReviewThunk } from "../thunks/reviewThunks/updateReviewThunk";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    reviews: [],
    review: null,
    error: null,
    status: "",
  },
  reducers: {
    clearState(state) {
      state.error = null;
      state.status = "";
    },
  },

  extraReducers(builder) {
    ////////////// PENDING
    builder.addCase(createReviewThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    builder.addCase(getAllReviewsByMealThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    builder.addCase(deleteReviewThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    builder.addCase(updateReviewThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    ////////////// FULFILLED
    builder.addCase(createReviewThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload?.data?.review;
      state.status = action.payload.status;
    });

    builder.addCase(getAllReviewsByMealThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload?.data?.reviews;
      state.status = action.payload.status;
    });

    builder.addCase(deleteReviewThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.review = null;
      state.status = action.payload.status;
    });

    builder.addCase(updateReviewThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload?.data?.review;
      state.status = action.payload.status;
    });

    ////////////// REJECTED
    builder.addCase(createReviewThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.data;
      state.status = action.payload?.status;
    });

    builder.addCase(getAllReviewsByMealThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.data;
      state.status = action.payload?.status;
    });

    builder.addCase(deleteReviewThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.data;
      state.status = action.payload?.status;
    });

    builder.addCase(updateReviewThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.data;
      state.status = action.payload?.status;
    });
  },
});

export const { clearState } = reviewsSlice.actions;
export const reviewsCombinedReducer = reviewsSlice.reducer;
