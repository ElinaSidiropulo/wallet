// components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
