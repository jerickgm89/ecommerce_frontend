import React from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { ListReviews } from '../components'
import { QueryClientProvider, QueryClient } from 'react-query'

export const ListReviewsPage = () => {
    const queryClient = new QueryClient()

    return (
        <AdminLayout>
            <QueryClientProvider client={queryClient}>
                <ListReviews />
            </QueryClientProvider>
        </AdminLayout>
    )
}