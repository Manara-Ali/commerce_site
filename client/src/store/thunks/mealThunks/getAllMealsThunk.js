import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllMealsThunk = createAsyncThunk("meal/get-all", async (_, {rejectWithValue}) => {
    // let url;
    // if(data) {
    //     url = `/api/v1/meals?name=${data}`;
    // } else {
    //     url= "/api/v1/meals";
    // }
    // console.log(url);
    try {
        const response = await axios({
            url: "/api/v1/meals",
            // url: "https://commerce-site-igmb.onrender.com/api/v1/meals",
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