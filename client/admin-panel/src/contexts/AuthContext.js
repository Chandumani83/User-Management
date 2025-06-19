
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'; // Import useCallback
import { login as loginApi, getUsers as fetchUsersApi, addUser as addUserApi, deleteUser as deleteUserApi } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]);

    
    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
            
            

            setUser({ id: 'admin_user_001', role: 'admin', name: 'Admin User' });
        }
        setLoading(false); 
    }, []); 

    
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await loginApi(email, password);
            setToken(userData.token);
            setUser(userData.user); 
            localStorage.setItem('jwtToken', userData.token);
            
            await fetchUsers(); 
            return true;
        } catch (err) {
            setError(err.message || 'Login failed');
            setToken(null);
            setUser(null);
            localStorage.removeItem('jwtToken');
            setLoading(false); 
            return false;
        }
        
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setUsers([]); 
        localStorage.removeItem('jwtToken');
        setLoading(false); 
    };

    
    const fetchUsers = useCallback(async () => {
        if (!token) { 
            setUsers([]);
            return;
        }
        setLoading(true); 
        setError(null);
        try {
            const userList = await fetchUsersApi();
            setUsers(userList);
        } catch (err) {
            setError(err.message || 'Failed to fetch users');
            setUsers([]);
        } finally {
            setLoading(false); 
        }
    }, [token]); 

    const addUser = async (userData) => {
        if (!token) return; 
        try {
            const newUser = await addUserApi(userData);
            
            setUsers(prevUsers => [...prevUsers, newUser]);
            return newUser;
        } catch (err) {
            setError(err.message || 'Failed to add user');
            throw err; 
        }
    };

    const deleteUser = async (userId) => {
        if (!token) return; 
        try {
            await deleteUserApi(userId);
            
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch (err) {
            setError(err.message || 'Failed to delete user');
            throw err; 
        }
    };

    

    return (
        <AuthContext.Provider value={{
            token,
            user,
            login,
            logout,
            error,
            loading, 
            users,
            fetchUsers, 
            addUser,
            deleteUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);