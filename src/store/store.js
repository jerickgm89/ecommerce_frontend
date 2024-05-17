import { configureStore } from "@reduxjs/toolkit";
import { ecommerceApi } from "./api";
import { authSlice } from './auth/authSlice';
import { productSlice } from './products/productSlice'; 
// import sus Slice

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productSlice.reducer,
        [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(ecommerceApi.middleware), 
});


