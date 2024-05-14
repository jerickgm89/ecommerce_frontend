import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'Products',
    initialState: {
        page: 0,
        products: [],
        isLoading: false,
    },
    reducers: {
        startLoadingProducts: (state) => {
            state.isLoading = true;
        },
        setProducts: (state, action) => {
            state.isLoading = false;
            state.page = action.payload;
            state.products = action.payload.products;
        },
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingProducts, setProducts } = productsSlice.actions;