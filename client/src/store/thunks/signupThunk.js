import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupThunk = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios({
        url: "/api/v1/users/signup",
        url: "https://commerce-site-igmb.onrender.com/api/v1/users/signup",
        method: "POST",
        data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
