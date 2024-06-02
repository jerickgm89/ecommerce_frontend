import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { useGetIsActiveQuery, useGetIsAdminQuery } from "../../store/api/ecommerceUserApi"
import { Box, Typography, CircularProgress } from '@mui/material'

export const PrivateRoute = ({ children, requireEmailVerified = false }) => {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth0()
    const { data: isActive, isLoading: activeLoading } = useGetIsActiveQuery(user?.email, {
        skip: !user?.email
    })
    const { data: isAdmin, isLoading: adminLoading } = useGetIsAdminQuery(user?.email, {
        skip: !user?.email
    })

    if (authLoading || activeLoading || adminLoading) {
        return (                            
            <Box
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100vh"
            >
                <CircularProgress />
                <Typography
                    variant="h6" 
                    component="div" 
                    sx={{ ml: 2 }}
                >
                    Cargando...
                </Typography>
            </Box>
        )               
    }

    if (isAuthenticated && isActive && (!requireEmailVerified || isAdmin)) {
        return children;
    }

    return <Navigate to="/" />
}