import { configureStore } from "@reduxjs/toolkit";
import { ecommerceApi } from "./api";
// import sus Slice
import { productsSlice } from "./products";

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(ecommerceApi.middleware), 
});


