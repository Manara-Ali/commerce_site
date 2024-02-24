import { createSlice } from "@reduxjs/toolkit";
import { signupThunk } from "../thunks/signupThunk";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },

  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(signupThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
    });

    builder.addCase(signupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = usersSlice.actions;

export const usersCombinedReducer = usersSlice.reducer;
