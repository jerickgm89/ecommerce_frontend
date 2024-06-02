import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceUserApi = createApi({
    reducerPath: 'ecommerceUserApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Users', 'Post', 'Address', 'UsersBlocked'],
    endpoints: (builder) => ({

        // CRUD USERS
        // Get all users
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['Post', 'Users'],
        }),
         // Get user by id
         getUserById: builder.query({
            query: (id)  => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'Users', id }],
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
            query: ({ id, pictureUser, ...fields }) => {
              const formData = new FormData();
              Object.keys(fields).forEach(key => formData.append(key, fields[key]));
              if (pictureUser && pictureUser.file) {
                formData.append('pictureUser', pictureUser.file);
              }
              return {
                url: `/users/${id}`,
                method: 'PUT',
                body: formData,
              };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
          }),
        // Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        // Blocked user
        unlockUser: builder.mutation({
            query: (id) => ({
                url: `/users/blocked/${id}`,
                method: 'DELETE',
            }),
            //invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
            invalidatesTags: ['Users', 'UsersBlocked'],
          }),
        // Restore user
        restoreUser: builder.mutation({
            query: (id) => ({
                url: `/users/restore/${id}`,
                method: 'DELETE',
            }),
            //invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
            invalidatesTags: ['Users', 'UsersBlocked'],
        }),
        // Get users blocked
        getUsersBlocked: builder.query({
            query: () => '/users/deactive',
            providesTags: ['UsersBlocked'],
        }),
        // Get isActive
        getIsActive: builder.query({
            query: (emailUser) => `/users/isActive/${emailUser}`,
        }),
        //Get isAdmin
        getIsAdmin: builder.query({
            query: (emailUser) => `/users/admin/${emailUser}`,
        }),
        
        // JWT Peticiones
        // Get user by Token    
        // Get user Token by Email
        getTokenByEmail: builder.query({
            query: (emailUser) => `/users/verify/${emailUser}`,
            providesTags: (result, error, emailUser) => [{ type: 'Post', id: result?.id }],
          }),
        // Get user by Token
        getUserByToken: builder.query({
            query: (token) => ({
              url: `/users/auth/token`,
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              providesTags: (result, error, token) => [{ type: 'Users', id: result?.id }],
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
    useUnlockUserMutation,
    useRestoreUserMutation,
    useGetUsersBlockedQuery,
    useGetIsActiveQuery,
    useGetIsAdminQuery,
    // JWT Peticiones
    useGetTokenByEmailQuery,
    useGetUserByTokenQuery,
} = ecommerceUserApi;