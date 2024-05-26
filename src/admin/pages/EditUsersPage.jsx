import React from 'react'
import { AdminLayout } from '../layout/AdminLayout';
import { EditUsers } from '../components';
import { useParams } from 'react-router-dom';

export const EditUsersPage = () => {
    const { id } = useParams();  // Capturo el parámetro ID de la URL

    return (
        <AdminLayout>
            <EditUsers id={id} />
        </AdminLayout>
    )
}