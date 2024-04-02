import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllMealsThunk = createAsyncThunk("meal/get-all", async (data, {rejectWithValue}) => {

    console.log(data);
    let url;
    if(data?.sort || data?.price) {
        url = `/api/v1/meals?sort=${data?.sort}&price[lte]=${data?.price}`;
        // url = `https://commerce-site-igmb.onrender.com/api/v1/meals?sort=${data?.sort}&price[lte]=${data?.price}`;
    } else if(data?.pageNumber) {
        url = `/api/v1/meals?page=${data.pageNumber}&limit=5`;
        // url = `https://commerce-site-igmb.onrender.com/api/v1/meals?page=${pageNumber}&limit=5`;
    } else {
        url = "/api/v1/meals";
        // url = "https://commerce-site-igmb.onrender.com/api/v1/meals";
    }
    console.log(url);
    try {
        const response = await axios({
            url: url,
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