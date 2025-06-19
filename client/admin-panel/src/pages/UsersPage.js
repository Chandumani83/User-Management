// src/pages/UsersPage.js
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserTable from '../components/UserTable'; // Create this component
import UserForm from '../components/UserForm'; // Create this component

const UsersPage = () => {
    const { users, loading, error, fetchUsers, addUser, deleteUser } = useAuth(); // Get functions from context

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAddUser = async (userData) => {
        try {
            await addUser(userData); // Call the context function
            fetchUsers(); // Refresh the user list after adding
        } catch (err) {
            alert('Error adding user: ' + (err.message || err));
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId); // Call the context function
                fetchUsers(); // Refresh the user list after deleting
            } catch (err) {
                alert('Error deleting user: ' + (err.message || err));
            }
        }
    };

    return (
        <div>
            <h1>User Management</h1>
            {/* Add User Form */}
            <UserForm onSubmit={handleAddUser} />

            <hr />

            {/* User List */}
            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && users.length === 0 && <p>No users found.</p>}
            {!loading && !error && users.length > 0 && (
                <UserTable users={users} onDelete={handleDeleteUser} />
            )}
        </div>
    );
};

export default UsersPage;