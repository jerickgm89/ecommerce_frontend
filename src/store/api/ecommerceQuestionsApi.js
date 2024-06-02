
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURl = import.meta.env.VITE_BASE_URL;

export const ecommerceQuestionsApi = createApi({
    reducerPath: 'ecommerceQuestionsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://www.ecommercetech.software',
    }),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({

        // CRUD QUESTIONS
        // Get all questions
        getQuestions: builder.query({
            query: () => '/comments',
            providesTags: ['Commets'],
        }),
        // Get question by id
        getQuestionById: builder.query({
            query: (id)  => `/comments/${id}`,
            providesTags: (result, error, id) => [{ type: 'Questions', id }],
        }),
        getDeactivedQuestions: builder.query({
            query: () => '/comments/deactived',
            providesTags: ['Comments'],
        }),
        // Post Create question
        postCreateQuestion: builder.mutation({
            query: (newQuestion) => ({
                url: '/comments',
                method: 'POST',
                body: newQuestion
            }),
            invalidatesTags: ['Comments'],
        }),
        // Update question
        putUpdateQuestion: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/comments/${id}`,
                method: 'PUT',
                body: fields
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Comments', id }],
        }),
        // Delete question by id
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/comments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Comments', id }],
        }),
        // Activate question by id
        activateQuestion: builder.mutation({
            query: (id) => ({
                url: `/comments/restore/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Comments', id }],
        }),
    })
});

export const { 
    useGetQuestionsQuery, 
    useGetQuestionByIdQuery, 
    useGetDeactivedQuestionsQuery, 
    usePostCreateQuestionMutation, 
    usePutUpdateQuestionMutation, 
    useDeleteQuestionMutation, 
    useActivateQuestionMutation 
} = ecommerceQuestionsApi;
