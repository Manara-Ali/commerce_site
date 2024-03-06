import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllMealsThunk = createAsyncThunk("meal/get-all", async (_, {rejectWithValue}) => {
    try {
        const response = await axios({
            // url: "/api/v1/meals",
            url: "https://commerce-site-igmb.onrender.com/api/v1/meals",
            method: "GET",
        },
        {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});