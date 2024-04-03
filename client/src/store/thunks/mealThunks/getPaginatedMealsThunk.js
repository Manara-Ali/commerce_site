import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getPaginatedMealsThunk = createAsyncThunk("meal/pagination", async (data, {rejectWithValue}) => {
    try {
        const response = await axios({
            method: "GET",
            url: `/api/v1/meals?page=${data.pageNumber}&limit=4`,
            
            // url: `https://commerce-site-igmb.onrender.com/api/v1/meals?page=${data.pageNumber}&limit=4`,
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