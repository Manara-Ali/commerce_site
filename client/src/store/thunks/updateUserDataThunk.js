import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserDataThunk = createAsyncThunk(
  "user/update-data",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios({
        // url:  "https://commerce-site-igmb.onrender.com/api/v1/users/update-my-data",
        url: "/api/v1/users/update-my-data",
        method: "POST",
        data,
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
