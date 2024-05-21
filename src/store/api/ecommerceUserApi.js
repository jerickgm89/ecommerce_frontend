import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceUserApi = createApi({
    reducerPath: 'ecommerceUserApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({

        // CRUD USERS
        // Get all users
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['Users'],
        }),
         // Get user by id
         getUserById: builder.query({
            query: (id)  => `/users/${id}`,
        }),
        // Get user by email
        getUserByEmail: builder.query({
            query: (email) => `/users/email/${email}`,
        }),
        // Post Create user
        postCreateUser: builder.mutation({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users'],
        }),
        // Update user
        putUpdateUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: id
            }),
            invalidatesTags: ['Users'],
        }),
        // Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
        
        // JWT Peticiones
        // Get user by Token    
        // Get user Token by Email
        getTokenByEmail: builder.query({
            query: (emailUser) => `/users/verify/${emailUser}`,
          }),
        // Get user by Token
        getUserByToken: builder.query({
            query: (token) => ({
                url: `/users/auth/token`,
                method: 'GET',
                headers: {
                    token: `${token}`,
                },
            }),
        }),   
        
    }),
});

export const {
    // CRUD USERS
    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetUserByEmailQuery,
    usePostCreateUserMutation,
    usePutUpdateUserMutation,
    useDeleteUserMutation,
    // JWT Peticiones
    useGetTokenByEmailQuery,
    useGetUserByTokenQuery,
} = ecommerceUserApi;
