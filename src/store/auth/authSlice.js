import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isFetching: false,
        isAuthenticated: localStorage.getItem('id_token') ? true : false
    },
    reducers: {
        loginRequest: (state) => {
            state.isFetching = true,
            state.isAuthenticated = false
        },
        loginSuccess: (state) => {
            state.isFetching = false,
            state.isAuthenticated = true
        },
        loginFailure: (state) => {
            state.isFetching = false,
            state.isAuthenticated = false
        },
    },
})

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions
