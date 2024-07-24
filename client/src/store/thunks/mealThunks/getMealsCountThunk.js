import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMealsCountThunk = createAsyncThunk("meal/count", async (_, {rejectWithValue}) => {

    try {
        const response = await axios({
            // url: "/api/v1/meals",
            url: "https://commerce-site-igmb.onrender.com/api/v1/meals",
            method: "GET",
        },
        {
            withCredentials: true,
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        // console.log(error);
        return rejectWithValue(error.response?.data);
    }
});