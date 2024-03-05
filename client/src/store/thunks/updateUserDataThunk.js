import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserDataThunk = createAsyncThunk(
  "user/update-data",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        // url: "/api/v1/users/update-my-data",
        url:  "https://commerce-site-igmb.onrender.com/api/v1/users/update-my-data",
        method: "PATCH",
        data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
