import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersCombinedReducer } from "./slices/usersSlice";

const combinedReducers = combineReducers({
    usersCombinedReducer,
});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    }
});

export const persistor = persistStore(store);

export * from "./thunks/signupThunk";
export * from './thunks/loginThunk';
export * from "./thunks/checkAuthThunk";
export * from "./thunks/forgotPasswordThunk";
export * from './thunks/resetPasswordThunk';
export * from './thunks/updateUserDataThunk';
export * from './thunks/updatePasswordThunk';
export * from './thunks/googleAuthThunk';
export * from "./thunks/logoutThunk";
export * from './thunks/deleteAccountThunk';
export * from './slices/usersSlice';