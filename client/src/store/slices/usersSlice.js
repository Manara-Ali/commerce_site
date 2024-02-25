import { createSlice } from "@reduxjs/toolkit";
import { signupThunk } from "../thunks/signupThunk";
import { loginThunk } from "../thunks/loginThunk";
import { checkAuthThunk } from "../thunks/checkAuthThunk";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
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

    builder.addCase(checkAuthThunk.pending, (state) => {
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
    
    builder.addCase(checkAuthThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    
    ///////////////////////////// REJECTED
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // state.isAuthenticated = action.payload.data.isAuthenticated;
    });
    
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    
    builder.addCase(checkAuthThunk.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
  },
});

export const { clearErrors } = usersSlice.actions;

export const usersCombinedReducer = usersSlice.reducer;
