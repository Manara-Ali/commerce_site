import {configureStore} from '@reduxjs/toolkit';
import { usersCombinedReducer } from "./slices/usersSlice";

export const store = configureStore({
    reducer: {
        usersCombinedReducer,
    }
});

export * from "./thunks/signupThunk";
export * from './thunks/loginThunk';
export * from './slices/usersSlice';