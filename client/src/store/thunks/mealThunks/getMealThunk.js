import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMealThunk = createAsyncThunk("meal/get-one", async (data, {rejectWithValue}) => {
    console.log(data);
    try {
        const response = await axios({
            url: `/api/v1/meals/${data}`,
            // url: `https://commerce-site-igmb.onrender.com/api/v1/meals/${data}`,
            method: "GET",
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