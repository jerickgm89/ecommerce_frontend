import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from './products/productSlice'; 
import { userSlice } from './users/userSlice';
import { searchBarSlice } from './searchBar/searchBarSlice';
import cartReducer from "./cartShopping/cartSlice";
import shippingInfoReducer from "./shippingInfo/shippingInfoSlice";
import { 
    ecommerceApi, 
    ecommerceUserApi,
    ecommerceReviewApi, 
    ecommerceQuestionsApi, 
    ecommerceAddressApi
} from "./api";
// import sus Slice

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartReducer,
        shippingInfo: shippingInfoReducer,
        users: userSlice.reducer,        
        searchBar: searchBarSlice.reducer,
        [ecommerceApi.reducerPath]: ecommerceApi.reducer,
        [ecommerceUserApi.reducerPath]: ecommerceUserApi.reducer,
        [ecommerceReviewApi.reducerPath]: ecommerceReviewApi.reducer,
        [ecommerceQuestionsApi.reducerPath]: ecommerceQuestionsApi.reducer,
        [ecommerceAddressApi.reducerPath]: ecommerceAddressApi.reducer,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(ecommerceApi.middleware)
            .concat(ecommerceUserApi.middleware)
            .concat(ecommerceReviewApi.middleware)
            .concat(ecommerceQuestionsApi.middleware)
            .concat(ecommerceAddressApi.middleware),
});


