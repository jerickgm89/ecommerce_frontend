import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://35.167.78.208',
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products/index',
            providesTags: ['Products'],
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
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/products/index/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['Products'],
        }),
        updateProducts: builder.mutation({
            query: (updatedProduct) => ({
                url: `/products/index/${updatedProduct.id}`,
                method: 'PATCH',
                body: updatedProduct
            }),
            invalidatesTags: ['Products'],
        }),

        filterProducts: builder.query({
            query: ({ name, price, year, orderBy, orderDirection, priceMin, priceMax, category, brand }) => {
                const queryUrl = `/filterproducts?name=${name}&price=${price}&year=${year}&orderBy=${orderBy}&orderDirection=${orderDirection}&priceMin=${priceMin}&priceMax=${priceMax}&category=${category}&brand=${brand}`;
                console.log('Parámetros enviados:', { name, price, year, orderBy, orderDirection, priceMin, priceMax, category, brand });
                return queryUrl;
            },
        }),

        searchProductsByName: builder.query({
            query: (name) => `/filterproducts/?name=${name}`,
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
    useFilterProductsQuery,
    useSearchProductsByNameQuery,
    useDeleteProductsMutation,
    useUpdateProductsMutation,
 } = ecommerceApi;