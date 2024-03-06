import { createSlice } from "@reduxjs/toolkit";
import { getAllMealsThunk } from "../thunks/mealThunks/getAllMealsThunk";

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    loading: false,
    meals: null,
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
    builder.addCase(getAllMealsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    ////////////// FULFILLED
    builder.addCase(getAllMealsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.meals = action.payload?.data?.meals;
      state.status = action.payload.success;
    });

    ////////////// REJECTED
    builder.addCase(getAllMealsThunk.rejected, (state, action) => {
      state.loading = false;
      state.meals = action.payload?.data?.meals;
      state.status = action.payload.status;
    });
  }
});

export const { clearState } = mealsSlice.actions;
export const mealsCombinedReducer = mealsSlice.reducer;
