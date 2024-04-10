import { createSlice } from "@reduxjs/toolkit";
import { getAllMealsThunk } from "../thunks/mealThunks/getAllMealsThunk";
import { createMealThunk } from "../thunks/mealThunks/createMealThunk";
import { getMealThunk } from "../thunks/mealThunks/getMealThunk";
import { updateMealThunk } from "../thunks/mealThunks/updateMealThunk";
import { deleteMealThunk } from "../thunks/mealThunks/deleteMealThunk";
import { getMealsCountThunk } from "../thunks/mealThunks/getMealsCountThunk";
import { getPaginatedMealsThunk } from "../thunks/mealThunks/getPaginatedMealsThunk";

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    loading: false,
    meals: [],
    sortedMeals: [],
    paginatedMeals: [],
    totalMeals: [],
    mealsCount: null,
    meal: {},
    error: null,
    status: "",
  },
  reducers: {
    clearState(state) {
      state.error = null;
      state.status = "";
      state.totalMeals = [];
    },
    resetSortedMeals(state) {
      state.error = null;
      state.status = "";
      state.sortedMeals = [];
    },
    storePagination(state) {
      // console.log("Here");
      // if(!state.totalMeals?.length) return;
      
      // console.log("There");
      if(state.totalMeals.length) {
        const idArr = state.totalMeals?.map((element) => element._id);
  
        state?.paginatedMeals?.forEach((element) => {
          if (!idArr?.includes(element._id)) {
            state.totalMeals = [...state.totalMeals, element];
          }
        });
      } else {
        state.totalMeals = state.paginatedMeals;
      }
    }
  },

  extraReducers(builder) {
    ////////////// PENDING
    builder.addCase(getAllMealsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    builder.addCase(getPaginatedMealsThunk.pending, (state) => {
      state.loadingPagination = true;
      state.error = null;
      state.status = "";
    });

    builder.addCase(getMealsCountThunk.pending, (state) => {
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

    builder.addCase(deleteMealThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });

    ////////////// FULFILLED
    builder.addCase(getAllMealsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.meals = action.payload?.data?.meals;
      state.sortedMeals = action.payload?.data?.meals;
      state.status = action.payload.status;
    });

    builder.addCase(getPaginatedMealsThunk.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loadingPagination = false;
      state.paginatedMeals = action.payload?.data?.meals;
      state.status = action.payload.status;
    });

    builder.addCase(getMealsCountThunk.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.mealsCount = action.payload?.results;
      state.status = action.payload.status;
    });

    builder.addCase(createMealThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.meal = action.payload?.data?.meal;
      state.status = action.payload.status;
    });

    builder.addCase(getMealThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.meal = action.payload?.data?.meal;
      state.status = action.payload.status;
    });

    builder.addCase(updateMealThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.meal = action.payload?.data?.meal;
      state.status = action.payload.status;
    });

    builder.addCase(deleteMealThunk.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.meal = action.payload?.data?.meal;
      state.status = action.payload.status;
    });

    ////////////// REJECTED
    builder.addCase(getAllMealsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.data;
      state.status = action.payload?.status;
    });

    builder.addCase(getPaginatedMealsThunk.rejected, (state, action) => {
      state.loadingPagination = false;
      state.error = action.payload?.data;
      state.status = action.payload.status;
    });

    builder.addCase(getMealsCountThunk.rejected, (state, action) => {
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
      // console.log(action.payload);
      state.loading = false;
      state.error = { message: action.payload?.message };
      state.status = action.payload.status;
      state.meal = null;
    });

    builder.addCase(updateMealThunk.rejected, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.error = { message: action.payload?.message };
      // state.status = action.payload.status;
    });

    builder.addCase(deleteMealThunk.rejected, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.error = { message: action.payload?.message };
      // state.status = action.payload.status;
    });
  },
});

export const { clearState, resetSortedMeals, storePagination } = mealsSlice.actions;
export const mealsCombinedReducer = mealsSlice.reducer;
