import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const deleteAccountThunk = createAsyncThunk("user/delete-account", async (data, {rejectWithValue}) => {
    try {
      const response = await axios({
        // url: "/api/v1/users/delete/account",
        url:  "https://commerce-site-igmb.onrender.com/api/v1/users/delete/account",
        method: "POST",
        data,
      });

      console.log(response);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
});