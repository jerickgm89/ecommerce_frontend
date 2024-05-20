import React from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { LockedProducts } from '../components'

export const LockedProductsPage = () => {
    return (
        <AdminLayout>
            <LockedProducts />
        </AdminLayout>
    )
}