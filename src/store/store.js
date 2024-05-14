import { configureStore } from "@reduxjs/toolkit";
import { ecommerceApi } from "./api";
// import sus Slice

export const store = configureStore({
    reducer: {
        [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(ecommerceApi.middleware), 
});


