import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        isLoading: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
});

export const { 
    setUser, 
    setAuthenticated, 
    setLoading 
} = userSlice.actions;


