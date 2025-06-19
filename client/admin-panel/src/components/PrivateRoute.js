
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { token, user, loading } = useAuth(); 

    if (loading) {
        
        return <div style={{ textAlign: 'center', paddingTop: '50px' }}>Loading...</div>;
    }

    
    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;