import { createSlice } from "@reduxjs/toolkit";
import { signupThunk } from "../thunks/signupThunk";
import { loginThunk } from "../thunks/loginThunk";
import { checkAuthThunk } from "../thunks/checkAuthThunk";
import { forgotPasswordThunk } from "../thunks/forgotPasswordThunk";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
    message: "",
  },

  reducers: {
    clearErrors(state) {
      state.error = null;
      state.message = "";
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

    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    ///////////////////////////// FULFILLED
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.isAuthenticated = true;
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.isAuthenticated = true;
    });
    
    builder.addCase(checkAuthThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    
    builder.addCase(forgotPasswordThunk.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = false;
      state.message = action.payload.data.message;
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
    
    builder.addCase(forgotPasswordThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = usersSlice.actions;

export const usersCombinedReducer = usersSlice.reducer;
