
import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialUser, isEditing }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); 

    
    useEffect(() => {
        if (initialUser) {
            setName(initialUser.name);
            setEmail(initialUser.email);
            setRole(initialUser.role);
            
        }
    }, [initialUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !email || (!isEditing && !password)) {
            alert('Please fill in all required fields.');
            return;
        }
        onSubmit({ name, email, password: password || undefined, role }); 
        
        if (!isEditing) {
            setName('');
            setEmail('');
            setPassword('');
            setRole('user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{isEditing ? 'Edit User' : 'Add New User'}</h3>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            {!isEditing && ( 
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            )}
            <div>
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
        </form>
    );
};

export default UserForm;