import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updatePasswordThunk = createAsyncThunk(
  "user/update-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "/api/v1/users/update/password",
        // url:  "https://commerce-site-igmb.onrender.com/api/v1/users/update/password",
        method: "PATCH",
        data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);