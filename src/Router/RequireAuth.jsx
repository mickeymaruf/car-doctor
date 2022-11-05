import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const RequireAuth = ({ children }) => {
    const { user, loader } = useAuth();
    const location = useLocation();
    if (loader) {
        return 'Loading...';
    }
    if (user && user.email) {
        return children;
    }
    return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default RequireAuth;