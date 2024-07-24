import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyPaymentThunk = createAsyncThunk("verify/payment", async (data, {rejectWithValue}) => {
    try {
        const response = await axios({
            url: `/api/v1/stripe/verify-payment/${data.paymentId}`,
            // url: `https://commerce-site-igmb.onrender.com/api/v1/stripe/verify-payment/${data.paymentId}`,
            method: "POST",
        },
        {
            withCredentials: true,
        });
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});