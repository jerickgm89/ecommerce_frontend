import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseURl = import.meta.env.VITE_BASE_URL;
export const ecommerceReviewApi = createApi({
    reducerPath: 'ecommerceReviewApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001',
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({

        // CRUD REVIEWS
        // Get all reviews
        getReviews: builder.query({
            query: () => '/reviews',
            providesTags: ['Reviews'],
        }),
        // Get review by id
        getReviewById: builder.query({
            query: (id)  => `/reviews/${id}`,
            providesTags: (result, error, id) => [{ type: 'Reviews', id }],
        }),
        // Get review by product
        getReviewByProduct: builder.query({
            query: (idProduct) => `/reviews/product/${idProduct}`,
        }),
        // Get review by user
        getReviewByUser: builder.query({
            query: (idUser) => `/reviews/user/${idUser}`,
        }),
        // Post Create review
        postCreateReview: builder.mutation({
            query: (newReview) => ({
                url: '/reviews',
                method: 'POST',
                body: newReview
            }),
            invalidatesTags: ['Reviews'],
        }),
        // Update review
        putUpdateReview: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/reviews/${id}`,
                method: 'PUT',
                body: fields
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Reviews', id }],
        }),
        // Delete review
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Reviews', id }],
        }),
        // Get reviews deactived
        getDeactivedReviews: builder.query({
            query: () => '/reviews/deactived',
            //providesTags: ['Reviews'],
        }),
        // Block reviews
        blockReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/deactive/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reviews'],
        }),
        // Restore reviews
        restoreReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/restore/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reviews'],
        }),
    })
});

export const { 
    useGetReviewsQuery, 
    useGetReviewByIdQuery, 
    useGetReviewByProductQuery, 
    useGetReviewByUserQuery, 
    usePostCreateReviewMutation, 
    usePutUpdateReviewMutation, 
    useDeleteReviewMutation,
    useGetDeactivedReviewsQuery, 
    useBlockReviewMutation,
    useRestoreReviewMutation,
} = ecommerceReviewApi;
