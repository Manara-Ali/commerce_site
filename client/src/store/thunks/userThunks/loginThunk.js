import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const loginThunk = createAsyncThunk("user/login", async (data, {rejectWithValue}) => {
    try {
        const response = await axios({
            url: "/api/v1/users/login",
            // url: "https://commerce-site-igmb.onrender.com/api/v1/users/login",
            method: "POST",
            data,
        },
        {
            withCredentials: true,
        });

        return response.data;
                
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})