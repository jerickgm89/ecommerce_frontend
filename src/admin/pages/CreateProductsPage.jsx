import React from 'react'
import { AdminLayout } from '../layout/AdminLayout';
import { CreateProducts } from '../components';

export const CreateProductsPage = () => {
  return (
    <AdminLayout>
      <CreateProducts />
    </AdminLayout>
  )
}