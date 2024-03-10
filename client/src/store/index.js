import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersCombinedReducer } from "./slices/usersSlice";
import { mealsCombinedReducer } from "./slices/mealsSlice";

const combinedReducers = combineReducers({
  usersCombinedReducer,
  mealsCombinedReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);

export * from "./thunks/userThunks/signupThunk";
export * from "./thunks/userThunks/loginThunk";
export * from "./thunks/userThunks/checkAuthThunk";
export * from "./thunks/userThunks/forgotPasswordThunk";
export * from "./thunks/userThunks/resetPasswordThunk";
export * from "./thunks/userThunks/updateUserDataThunk";
export * from "./thunks/userThunks/updatePasswordThunk";
export * from "./thunks/userThunks/googleAuthThunk";
export * from "./thunks/userThunks/logoutThunk";
export * from "./thunks/userThunks/deleteAccountThunk";
export * from './thunks/mealThunks/getAllMealsThunk';
export * from './thunks/mealThunks/createMealThunk';
export * from "./thunks/mealThunks/getMealThunk";
export * from "./slices/usersSlice";
export * from "./slices/mealsSlice";
