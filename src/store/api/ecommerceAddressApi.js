import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceAddressApi = createApi({
    reducerPath: 'ecommerceAddressApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Address'],
    endpoints: (builder) => ({

        // CRUD ADDRESS
        // Get all address
        getAddresses: builder.query({
            query: () => '/address',
            providesTags: ['Address'],
        }),
         // Get address by id
         getAddressById: builder.query({
            query: (id)  => `/address/${id}`,
            providesTags: (result, error, id) => [{ type: 'Address', id }],
        }),
        // Get address by user
        getAddressByUser: builder.query({
            query: (idUser) => `/address/user/${idUser}`,
        }),
        // Post Create address
        postCreateAddress: builder.mutation({
            query: (idUser, ...fields) => ({
                url: `/address/${idUser}`,
                method: 'POST',
                body: fields
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Address', id }],

        }),
        // Update address
        putUpdateAddress: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/address/${id}`,
                method: 'PUT',
                body: fields,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Address', id }],
          }),
        // Delete address
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Address', id }],
        }),
    }),
});

export const { 
    useGetAddressesQuery, 
    useGetAddressByIdQuery, 
    useGetAddressByUserQuery, 
    usePostCreateAddressMutation, 
    usePutUpdateAddressMutation, 
    useDeleteAddressMutation 
} = ecommerceAddressApi;
