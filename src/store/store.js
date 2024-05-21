import { configureStore } from "@reduxjs/toolkit";
import { ecommerceApi, ecommerceUserApi } from "./api";
import { productSlice } from './products/productSlice'; 
import { userSlice } from './users/userSlice';
import { searchBarSlice } from './searchBar/searchBarSlice';
import cartReducer from "./cartShopping/cartSlice";
// import sus Slice

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartReducer,
        users: userSlice.reducer,        
        searchBar: searchBarSlice.reducer,
        [ecommerceApi.reducerPath]: ecommerceApi.reducer,
        [ecommerceUserApi.reducerPath]: ecommerceUserApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(ecommerceApi.middleware)
            .concat(ecommerceUserApi.middleware),
});


