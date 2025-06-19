
import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; 


const api = axios.create({
    baseURL: API_URL,
});


api.interceptors.request.use(
    (config) => {
        
        const token = localStorage.getItem('jwtToken'); 

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data; 
    } catch (error) {
        
        throw error.response ? error.response.data : error.message;
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get('/users'); 
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};



export default api;