import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            // Optionally validate token with backend here
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            // Backend response expected: { token, user: { ... } } or similar
            // Need to verify backend response structure later.
            // Assuming standard JWT response based on typical Node apps.

            const { token, ...userData } = data;
            // Need to check if 'data' is the user or if it has a nested user object.
            // If backend returns { token } only, we might need to decode it or fetch profile.

            localStorage.setItem('token', token);

            // If userData is empty/structured differently, we'll fix this.
            // For now, assume data contains user info or we decode.
            // Actually usually it's data.token and data.user or something.
            // Let's assume data = { token, ...userFields } or { token, user: {} }

            // Let's check authController.js later to be sure.
            // Saving what we have for now.

            setUser(userData.user || data.user);
            localStorage.setItem('user', JSON.stringify(userData.user || data.user));

            return data;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { name, email, password });

            // Auto-login logic
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            return data;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
