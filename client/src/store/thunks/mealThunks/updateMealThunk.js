import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const updateMealThunk = createAsyncThunk("meal/update", async (data, {rejectWithValue}) => {
    const formData = {...data};

    delete formData.slug;

    try {
        const response = await axios({
            // url: `/api/v1/meals/${data.slug}`,
            url: `https://commerce-site-igmb.onrender.com/api/v1/meals/${data.slug}`,
            method: "PATCH",
            data: formData,
        },
        {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        // console.log(error);
        return rejectWithValue(error.response?.data);
    }
});