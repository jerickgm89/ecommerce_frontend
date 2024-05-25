import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        isLoading: true,
        userData: null,
        isSaving: false,
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
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateUserData: (state, action) => {
            state.userData = action.payload;
            state.isSaving = false;

            if (action.payload) {
                state.messageSaved = 'User data saved successfully';
                window.location.reload();
            } else {
                state.messageSaved = 'Error saving user data';
            }
        },
    }
});

export const { 
    setUser, 
    setAuthenticated, 
    setLoading,
    setUserData,
    updateUserData
} = userSlice.actions;


