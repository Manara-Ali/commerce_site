import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAuthThunk = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        // url:"https://commerce-site-igmb.onrender.com/api/v1/users/auth/check-auth",
        url: "/api/v1/users/auth/check-auth",
        method: "GET",
      },
      {
        withCredentials: true
      });

      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
