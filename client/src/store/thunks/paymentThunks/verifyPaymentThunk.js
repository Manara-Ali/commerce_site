import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyPaymentThunk = createAsyncThunk("verify/payment", async (data, {rejectWithValue}) => {
    console.log(data);
    try {
        const response = await axios({
            // url: `/api/v1/stripe/verify-payment/${data.paymentId}`,
            url: `https://commerce-site-igmb.onrender.com/api/v1/stripe/verify-payment/${data.paymentId}`,
            method: "POST",
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