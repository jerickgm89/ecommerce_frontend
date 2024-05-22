import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://www.ecommercetech.software', //http://localhost:3001, www.ecommercetech.software
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products/index',
            providesTags: ['Products'],
        }),
        getProductsLimit: builder.query({
            query: (page=1) => `/products/index?limit=9&page=${page}`,
            providesTags: ['Products'],
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
        unlockProduct: builder.mutation({
            query: (id) => ({
                url: `/products/index/unlock/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
          }),
        restoreProduct: builder.mutation({
            query: (id) => ({
                url: `/products/index/restore/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
        getProductsLocked: builder.query({
            query: () => '/products/index/deactivate',
            providesTags: ['Products'],
        }),

        filterProducts: builder.query({
            query: ({ name, price, year, orderBy, orderDirection, priceMin, priceMax, category, brand }) => {
                const queryUrl = `/filterproducts?name=${name}&price=${price}&year=${year}&orderBy=${orderBy}&orderDirection=${orderDirection}&priceMin=${priceMin}&priceMax=${priceMax}&category=${category}&brand=${brand}`;
                console.log('Parámetros enviados:', { name, price, year, orderBy, orderDirection, priceMin, priceMax, category, brand });
                return queryUrl;
            },
            providesTags: ['Products'],
        }),

        searchProductsByName: builder.query({
            query: (name) => `/filterproducts/?name=${name}`,
        }),

        postOrder: builder.mutation({
            query: ({ items, payer, token }) => {
                const body = { items };
                if (payer) {
                    body.payer = payer;
                }
                return {
                    url: '/payment/create_order',
                    method: 'POST',
                    body,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
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
    useFilterProductsQuery,
    useSearchProductsByNameQuery,
    useDeleteProductsMutation,
    useUpdateProductsMutation,
    useUnlockProductMutation,
    useRestoreProductMutation,
    useCreateOrderMutation,
    useGetProductsLockedQuery,
    usePostOrderMutation,
 } = ecommerceApi;
