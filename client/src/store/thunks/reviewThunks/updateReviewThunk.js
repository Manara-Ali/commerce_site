import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateReviewThunk = createAsyncThunk(
  "review/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(
        {
          // url: `/api/v1/meals/${data.slug}/reviews/${data.reviewId}`,
          url: `https://commerce-site-igmb.onrender.com/api/v1/meals/${data.slug}/reviews/${data.reviewId}`,
          method: "PATCH",
          data: { review: data.userInput, rating: data.rating },
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
