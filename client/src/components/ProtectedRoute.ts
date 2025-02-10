import React from "react";
import { useUserStore } from "../store/useUserStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, user } = useUserStore()
    if (!isAuthenticated) {
        Navigate({ to: '/login', replace: true })
        return
    }
    if (!user.is_verified) {
        Navigate({ to: '/verify-email', replace: true })
        return
    }


    return children

}

export const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user } = useUserStore()
    if (isAuthenticated && user?.is_verified) {
        Navigate({ to: '/', replace: true })
        return
    }

    return children
}

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {

    const { user, isAuthenticated } = useUserStore()

    if (!isAuthenticated) {
        return Navigate({ to: '/login', replace: true })
    }
    if (!user.seller) {
        return Navigate({ to: '/', replace: true })
    }

    return children
}