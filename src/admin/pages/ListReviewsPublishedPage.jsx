import React from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { ListReviewsPublished } from '../components'
import { QueryClientProvider, QueryClient } from 'react-query'

export const ListReviewsPublishedPage = () => {
    const queryClient = new QueryClient()

    return (
        <AdminLayout>
            <QueryClientProvider client={queryClient}>
                <ListReviewsPublished />
            </QueryClientProvider>
        </AdminLayout>
    )
}