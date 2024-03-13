import { createSlice } from "@reduxjs/toolkit";
import { getAllMealsThunk } from "../thunks/mealThunks/getAllMealsThunk";
import { createMealThunk } from "../thunks/mealThunks/createMealThunk";
import { getMealThunk } from "../thunks/mealThunks/getMealThunk";
import { updateMealThunk } from "../thunks/mealThunks/updateMealThunk";

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    loading: false,
    meals: [],
    meal: {},
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

    builder.addCase(createMealThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    builder.addCase(getMealThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    builder.addCase(updateMealThunk.pending, (state) => {
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

    builder.addCase(createMealThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.meal = action.payload?.data?.meal;
      state.status = action.payload.success;
    });

    builder.addCase(getMealThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.meal = action.payload?.data?.meal;
      state.status = action.payload.success;
    });

    builder.addCase(updateMealThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.meal = action.payload?.data?.meal;
      state.status = action.payload.success;
    });

    ////////////// REJECTED
    builder.addCase(getAllMealsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.data;
      state.status = action.payload.status;
    });

    builder.addCase(createMealThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.data;
      state.status = action.payload.status;
    });

    builder.addCase(getMealThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = { message: action.payload?.message };
      state.status = action.payload.status;
    });

    builder.addCase(updateMealThunk.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = { message: action.payload?.message };
      state.status = action.payload.status;
    });
  },
});

export const { clearState } = mealsSlice.actions;
export const mealsCombinedReducer = mealsSlice.reducer;
