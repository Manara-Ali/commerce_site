import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const checkoutPaymentThunk = createAsyncThunk("checkout/payment", async (data, {rejectWithValue}) => {
    console.log(data);
    try {
        const response = await axios({
            // url: "/api/v1/stripe/checkout",
            url: "https://commerce-site-igmb.onrender.com/api/v1/stripe/checkout",
            method: "POST",
            data,
        },
        {
            withCredentials: true,
        });

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error.response?.data);
        return rejectWithValue(error.response?.data);
    }
});