import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001' 
    }),
    endpoints: (builder) => ({
        
        getProducts: builder.query({
            query: ({ orderBy, orderDirection }) => {
                const queryUrl = '/filterproducts';
                if (orderBy && orderDirection) {
                  return `${queryUrl}?orderBy=${orderBy}&orderDirection=${orderDirection}`;
                } else {
                  return queryUrl;
                }
            },
        }),
        
        getProductById: builder.query({
            query: (id) => `/products/index/${id}`,
        }),
        
        getCategories: builder.query({
            query: () => '/products/category',
        }),
        
        getBrands: builder.query({
            query: ({ orderBy, orderDirection }) => {
                const queryUrl = '/filterbrand';
                if (orderBy && orderDirection) {
                  return `${queryUrl}?orderBy=${orderBy}&orderDirection=${orderDirection}`;
                } else {
                  return queryUrl;
                }
            },
        }),
        
        filterProducts: builder.query({
            query: ({ name, price, year, orderBy, orderDirection }) => {
                const queryUrl = `/filterproducts?name=${name}&price=${price}&year=${year}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
                return queryUrl;
            },
        }),
        
        filterCategories: builder.query({
            query: ({ name, orderBy, orderDirection }) => {
                const queryUrl = `/filtercategory?nameCategory=${name}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
                return queryUrl;
            },
        }),
        
        filterBrands: builder.query({
            query: ({ name, orderBy, orderDirection }) => {
                const queryUrl = `/filterbrand?nameBrand=${name}&orderBy=${orderBy}&orderDirection=${orderDirection}`;
                return queryUrl;
            },
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductByIdQuery, 
    useGetCategoriesQuery, 
    useGetBrandsQuery,
    useFilterProductsQuery,
    useFilterCategoriesQuery,
    useFilterBrandsQuery,
} = ecommerceApi;
