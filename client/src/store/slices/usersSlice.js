import { createSlice } from "@reduxjs/toolkit";
import { signupThunk } from "../thunks/signupThunk";
import { loginThunk } from "../thunks/loginThunk";
import { checkAuthThunk } from "../thunks/checkAuthThunk";
import { forgotPasswordThunk } from "../thunks/forgotPasswordThunk";
import { resetPasswordThunk } from "../thunks/resetPasswordThunk";
import { updateUserDataThunk } from "../thunks/updateUserDataThunk";
import { googleAuthThunk } from "../thunks/googleAuthThunk";
import { logoutThunk } from "../thunks/logoutThunk";
import { deleteAccountThunk } from "../thunks/deleteAccountThunk";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
    message: "",
    status: "",
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

    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUserDataThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(googleAuthThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteAccountThunk.pending, (state) => {
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
      state.loading = false;
      state.message = action.payload.data.message;
    });
    
    builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.message = action.payload.data.message;
      state.isAuthenticated = true;
    });
    
    builder.addCase(updateUserDataThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.updatedUser;
      state.status = action.payload.status;
      state.isAuthenticated = true;
    });
    
    builder.addCase(googleAuthThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.status = action.payload.status;
      state.isAuthenticated = true;
    });
    
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.user = null;
      state.status = action.payload.status;
      state.isAuthenticated = false;
    });
    
    builder.addCase(deleteAccountThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.user = null;
      state.status = action.payload.statusText;
      state.isAuthenticated = false;
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
    
    builder.addCase(resetPasswordThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = action.payload.message;
    });
    
    builder.addCase(updateUserDataThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = action.payload.status;
    });
    
    builder.addCase(googleAuthThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = action.payload.status;
    });

    builder.addCase(logoutThunk.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload;
      // state.status = action.payload.status;
    });
  },
});

export const { clearErrors } = usersSlice.actions;

export const usersCombinedReducer = usersSlice.reducer;
