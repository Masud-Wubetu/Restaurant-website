import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        type: 'success', // 'success' or 'error'
    });

    const showNotification = (message, type = 'success') => {
        setNotification({
            isOpen: true,
            message,
            type,
        });
    };

    const hideNotification = () => {
        setNotification(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
