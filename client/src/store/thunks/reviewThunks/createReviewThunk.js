import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const createReviewThunk = createAsyncThunk("review/create", async (data, {rejectWithValue}) => {
    // console.log(data);
    try {
        const response = await axios({
            url: `/api/v1/meals/${data.slug}/reviews`,
            // url: `https://commerce-site-igmb.onrender.com/api/v1/meals/${data.slug}/reviews`,
            method: "POST",
            data,
        },
        {
            withCredentials: true,
        });

        // console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data);
    }
});