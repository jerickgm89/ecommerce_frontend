import React from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { Users } from '../components'

export const ListUsersPage = () => {
    return (
        <AdminLayout>
            <Users />
        </AdminLayout>
    )
}