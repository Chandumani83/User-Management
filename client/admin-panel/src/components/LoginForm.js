
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, loading } = useAuth(); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard'); 
        }
        
    
    };

    return (
        <div style={styles.container}>
            <h2>Admin Login</h2>
            {error && <p style={styles.errorText}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                        disabled={loading} 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                        disabled={loading}
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};


const styles = {
    container: {
        width: '300px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif'
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: 'calc(100% - 20px)', 
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '10px'
    }
};

export default LoginForm;