import React from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { ListQuestions } from '../components/ListQuestions';
import { QueryClientProvider, QueryClient } from 'react-query';

export const ListQuestionsPage = () => {
  const queryClient = new QueryClient();
  return (
    <AdminLayout>
      <QueryClientProvider client={queryClient}>
        <ListQuestions />
      </QueryClientProvider>
    </AdminLayout>
  )
}
