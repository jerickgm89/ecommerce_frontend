import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        filteredProducts: [],
        cart: [],
        priceMin: '',
        priceMax: '',
        orderBy: '',
        orderDirection: 'ASC',
        category: '',
        page: 1,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
            state.page = action.payload.page;
        },
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        },
        setPriceMin: (state, action) => {
            state.priceMin = action.payload;
        },
        setPriceMax: (state, action) => {
            state.priceMax = action.payload;
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload;
        },
        setOrderDirection: (state, action) => {
            state.orderDirection = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setBrand: (state, action) => {
            state.brand = action.payload;
        },
        setOpen: (state, action) => {
            state.open = action.payload;
        },
    },
});

export const { 
    setProducts, 
    setFilteredProducts, 
    setpriceMin, 
    setpriceMax, 
    setOrderBy, 
    setOrderDirection,
    setCategory,
    setBrand,
    setOpen,
} = productSlice.actions;