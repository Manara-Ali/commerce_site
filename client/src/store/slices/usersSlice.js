import { createSlice } from "@reduxjs/toolkit";
import { signupThunk } from "../thunks/signupThunk";
import { loginThunk } from "../thunks/loginThunk";

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
    ///////////////////////////// PENDING
    builder.addCase(signupThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    ///////////////////////////// FULFILLED
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
    });

    ///////////////////////////// REJECTED
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = usersSlice.actions;

export const usersCombinedReducer = usersSlice.reducer;
