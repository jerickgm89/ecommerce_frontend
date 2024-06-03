import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ecommerceMetricsApi = createApi({

    reducerPath: 'ecommerceMetricsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Metrics'],
    endpoints: (builder) => ({

        getAverageScores: builder.query({
            query: () => 'dash/average-score',
            providesTags: ['Metrics'],
          }),

        getLastRegisteredUsers: builder.query({
            query: () => 'dash/last-registred',
            providesTags: ['Metrics'],
          }),
          


    })

})

export const { 

    useGetAverageScoresQuery,
    useGetLastRegisteredUsersQuery,

} = ecommerceMetricsApi;

     
        

