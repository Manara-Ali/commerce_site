import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllMealsThunk = createAsyncThunk("meal/get-all", async (data, {rejectWithValue}) => {

    let url;
    if(data?.sort || data?.price) {
        url = `/api/v1/meals?sort=${data?.sort}&price[lte]=${data?.price}`;
        // url = `https://commerce-site-igmb.onrender.com/api/v1/meals?sort=${data?.sort}&price[lte]=${data?.price}`;
    } else {
        url = "/api/v1/meals";
        // url = "https://commerce-site-igmb.onrender.com/api/v1/meals";
    }
    
    try {
        const response = await axios({
            url: url,
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