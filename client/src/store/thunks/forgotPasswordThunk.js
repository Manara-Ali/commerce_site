import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotPasswordThunk = createAsyncThunk("user/forgot-password", async(data, {rejectWithValue}) => {
    try {
        const response = await axios({
            url: "/api/v1/users/forgot/password",
            method: "POST",
            data,
        });

        console.log(response.data);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
})