import React from 'react'
import { AdminLayout } from '../layout/AdminLayout';
import { EditProducts } from '../components';
import { useParams } from 'react-router-dom';

export const EditProductsPage = () => {
    const { id } = useParams();  // Capturar el parámetro ID de la URL

    return (
        <AdminLayout>
            <EditProducts id={id} />
        </AdminLayout>
    )
}