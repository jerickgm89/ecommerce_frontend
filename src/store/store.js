import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from './auth/authSlice';
import { authApi } from "./api";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authApi.middleware),
});
