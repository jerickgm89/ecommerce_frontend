import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001' 
    }),
    // tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products/index',
            // providesTags: ['Product'],
        }),
        getProductsLimit: builder.query({
            query: (page=1) => `/products/index?limit=9&page=${page}`,
        }),
        getProductById: builder.query({
            query: (id) => `/products/index/${id}`,
        }),
        getBrands: builder.query({
            query: () => '/products/brands',
        }),
        getCategories: builder.query({
            query: () => '/products/category',
        }),
        createProducts: builder.mutation({
            query: (newProduct) => ({
                url: '/products/index',
                method: 'POST',
                body: newProduct
            }) 
        }),
        invalidatesTags: ['Products'],

        filterProducts: builder.query({
            query: ({ name, price, year, orderBy, orderDirection, priceMin, priceMax }) => {
                const queryUrl = `/filterproducts?name=${name}&price=${price}&year=${year}&orderBy=${orderBy}&orderDirection=${orderDirection}&priceMin${priceMin}&priceMax${priceMax}`;
                return queryUrl;
            },
        }),

    }),
});

export const { 
    useGetProductsQuery,
    useGetProductsLimitQuery,
    useGetProductByIdQuery,
    useGetBrandsQuery,
    useGetCategoriesQuery,
    useCreateProductsMutation,
    useFilterProductsQuery
 } = ecommerceApi;