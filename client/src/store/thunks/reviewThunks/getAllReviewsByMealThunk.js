import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllReviewsByMealThunk = createAsyncThunk("review/get-all", async (data, {rejectWithValue}) => {
    try {
        const response = await axios({
            // url: `/api/v1/meals/${data.slug}/reviews`,
            url: `https://commerce-site-igmb.onrender.com/api/v1/meals/${data.slug}/reviews`,
            method: "GET",
        },
        {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data);
    }
});