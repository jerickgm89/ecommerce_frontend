import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { useGetIsActiveQuery } from "../../store/api/ecommerceUserApi"

export const PrivateRoute = ({ children }) => {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth0()
    const { data: isActive, isLoading: activeLoading } = useGetIsActiveQuery(user?.email, {
        skip: !user?.email
    })

    if (authLoading || activeLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated && isActive ? children : <Navigate to="/" />
}
