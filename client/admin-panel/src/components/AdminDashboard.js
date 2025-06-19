
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

const AdminDashboard = () => {
    
    const { user, users, loading, error } = useAuth();

    return (
        <div style={dashboardStyles.dashboardContainer}>
            <h2>Welcome, {user?.name || 'Admin'}!</h2>
            <p>Your Role: {user?.role || 'N/A'}</p>
            <p>Last login: (Add logic for this if you store it)</p>

            <div style={dashboardStyles.statsSection}>
                <div style={dashboardStyles.statCard}>
                    <h3>Total Users</h3>
                    <p style={dashboardStyles.statValue}>
                        {loading ? 'Loading...' : error ? 'Error' : users.length}
                    </p>
                </div>
                {}
            </div>

            <div style={dashboardStyles.quickLinks}>
                <h3>Quick Links</h3>
                <ul style={dashboardStyles.linkList}>
                    <li>
                        <Link to="/users" style={dashboardStyles.link}>Manage Users</Link>
                    </li>
                    {}
                </ul>
            </div>
        </div>
    );
};


const dashboardStyles = {
    dashboardContainer: {
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif'
    },
    statsSection: {
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap' 
    },
    statCard: {
        backgroundColor: '#e9ecef',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        flex: '1 1 200px'
    },
    statValue: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#007bff'
    },
    quickLinks: {
        marginTop: '20px'
    },
    linkList: {
        listStyle: 'none',
        padding: 0
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        display: 'block',
        marginBottom: '10px',
        fontSize: '1.1rem'
    }
};

export default AdminDashboard;