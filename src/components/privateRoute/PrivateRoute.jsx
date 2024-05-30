import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { useGetIsActiveQuery, useGetIsAdminQuery } from "../../store/api/ecommerceUserApi"

export const PrivateRoute = ({ children, requireEmailVerified = false }) => {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth0()
    const { data: isActive, isLoading: activeLoading } = useGetIsActiveQuery(user?.email, {
        skip: !user?.email
    })
    const { data: isAdmin, isLoading: adminLoading } = useGetIsAdminQuery(user?.email, {
        skip: !user?.email
    })

    if (authLoading || activeLoading || adminLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated && isActive && (!requireEmailVerified || isAdmin)) {
        return children;
    }

    return <Navigate to="/" />
}