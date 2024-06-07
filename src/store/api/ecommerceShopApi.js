import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceShopApi = createApi({
    reducerPath: 'ecommerceShopApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Shop'],
    endpoints: (builder) => ({

        // Get all Order
        getShopOrder: builder.query({
            query: () => '/shop/order',
            providesTags: ['Shop'],
        }),
        // Get Order by ID
        getOrderById: builder.query({
            query: (id) => `/shop/order/user/${id}`,
            providesTags: ['Shop'],
        }),
        // Get Oder by Operation
        getOrderOperation: builder.query({
            query: (operation) => `/shop/order/operation/${operation}`,
            providesTags: ['Shop'],
        }),
        // Get Order by Status
        getOrderStatus: builder.query({
            query: (status) => `/shop/order/orderStatus/${status}`,
            providesTags: ['Shop'],
        }),
        // Get details
        getShopDetails: builder.query({
        query: () => '/shop/details',
        providesTags: ['Shop'],
        }),
        // Get details by Token
        getDetailsByToken: builder.query({
            query: (token) => ({
                url: '/shop/details/token',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                providesTags: (result, error, token) => [{ type: 'Shop', token }],
            })
        }),
        // Get payment
        getShopPayment: builder.query({
            query: () => '/shop/payment',
            providesTags: ['Shop'],
        }),

    }),
});

export const { 
    useGetShopOrderQuery, 
    useGetShopDetailsQuery, 
    useGetShopPaymentQuery,
    useGetDetailsByTokenQuery,
    useGetOrderByIdQuery,
    useGetOrderOperationQuery,
    useGetOrderStatusQuery
} = ecommerceShopApi;