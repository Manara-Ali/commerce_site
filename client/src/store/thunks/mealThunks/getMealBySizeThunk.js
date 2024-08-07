import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMealBySizeThunk = createAsyncThunk("meal/get-one-by-size", async (obj, {rejectWithValue}) => {
    try {
        const response = await axios(
          {
            url: `/api/v1/meals/${obj.data}?size=${obj.size}`,
            // url: `https://commerce-site-igmb.onrender.com/api/v1/meals/${obj.data}?size=${obj.size}`,
            method: "GET",
          },
          {
            withCredentials: true,
          }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});