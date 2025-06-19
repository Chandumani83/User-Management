// src/pages/DashboardPage.js
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { user, logout, fetchUsers } = useAuth();

    useEffect(() => {
        fetchUsers(); // Fetch users when the dashboard loads
    }, [fetchUsers]); // Depend on fetchUsers from context

    return (
        <div>
            <h1>Welcome, {user?.name}!</h1>
            <p>Your Role: {user?.role}</p>
            <button onClick={logout}>Logout</button>
            <hr />
            <h2>Admin Actions</h2>
            <nav>
                <Link to="/users">Manage Users</Link>
            </nav>
            {/* You can add more dashboard elements here */}
        </div>
    );
};

export default DashboardPage;