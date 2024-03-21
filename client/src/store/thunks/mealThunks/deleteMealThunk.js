import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteMealThunk = createAsyncThunk("meal/delete", async (data, {rejectWithValue}) => {
    try {
        const response = await axios({
            url: `/api/v1/meals/${data}`,
            // url: `https://commerce-site-igmb.onrender.com/api/v1/meals/${data}`,
            method: "DELETE",
        },
        {
            withCredentials: true,
        });
                
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});