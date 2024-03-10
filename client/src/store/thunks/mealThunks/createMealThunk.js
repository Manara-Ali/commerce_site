import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const createMealThunk = createAsyncThunk("meal/create", async (data, {rejectWithValue}) => {
    try {
        const response = await axios({
            // url: "/api/v1/meals",
            url: "https://commerce-site-igmb.onrender.com/api/v1/meals",
            method: "POST",
            data,
        },
        {
            withCredentials: true,
        });

        console.log(response.data);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});