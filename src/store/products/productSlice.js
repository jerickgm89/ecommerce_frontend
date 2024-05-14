import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        filteredProducts: [],
        cart: [],
        minPrice: '',
        maxPrice: '',
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        },
        setMinPrice: (state, action) => {
            state.minPrice = action.payload;
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload;
        },
    },
});

export const { setProducts, setFilteredProducts, setMinPrice, setMaxPrice } = productSlice.actions;
