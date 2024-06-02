import React from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { LockedUsers } from '../components'

export const LockedUsersPage = () => {
    return (
        <AdminLayout>
            <LockedUsers />
        </AdminLayout>
    )
}