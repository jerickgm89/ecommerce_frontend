import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001' 
    }),
    // tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products',
            providesTags: ['Products'],
        }),
        createProducts: builder.mutation({
            query: (newProduct) => ({
                url: '/products/index',
                method: 'POST',
                body: newProduct
            }) 
        }),
        invalidatesTags: ['Products'],
    }),
});

export const { useGetProductsQuery, useCreateProductsMutation } = ecommerceApi;