import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteReviewThunk = createAsyncThunk("review/delete", async (data, {rejectWithValue}) => {
    console.log(data);
    try {
        const response = await axios({
            url: `/api/v1/meals/${data.slug}/reviews/${data.reviewId}`,
            // url: `https://commerce-site-igmb.onrender.com/api/v1/meals/${data.slug}/reviews/${data.reviewId}`,
            method: "DELETE",
        },
        {
            withCredentials: true,
        });

        console.log(response);

        return response;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data);
    }
});