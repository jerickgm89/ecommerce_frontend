import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001' 
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.query({
            query: async(credentials) => {
                await loginWithCredentials({
                    appState: { targetUrl: '/login' },
                });
            },
        }),
        logout: builder.mutation({
            query: async() => {
                await logout();
            },
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginQuery, useLogoutMutation, useRegisterMutation } = authApi;
