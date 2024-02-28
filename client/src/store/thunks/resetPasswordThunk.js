import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const resetPasswordThunk = createAsyncThunk("user/reset-password", async (data, {rejectWithValue}) => {
    console.log(data);
    try {
        const response = await axios({
            // url: `/api/v1/users/reset/password/${data.resetToken}`,
            url: `https://commerce-site-igmb.onrender.com/api/v1/users/reset/password/${data.resetToken}`,
            method: "PATCH",
            data: {
                password: data.password,
                passwordConfirm: data.passwordConfirm,
            },
        });

        console.log(response.data);

        return response.data;
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data);
    }
})