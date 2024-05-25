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
        // updateUser: (state, action) => {
        //     state.isSaving = false;
        //     state.userData = state.userData.map((user) => {
        //         if (user.id === action.payload.id) {
        //             return action.payload;
        //         }
        //         return user;
        //     });

        //     state.messageSaved = `${action.payload.title}, actualizada correctamente!`

        // },
    }
});

export const { 
    setUser, 
    setAuthenticated, 
    setLoading,
    setUserData
} = userSlice.actions;


