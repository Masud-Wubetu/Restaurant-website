import { CheckCircle, XCircle, X } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useEffect } from 'react';

export default function NotificationModal() {
    const { notification, hideNotification } = useNotification();
    const { isOpen, message, type } = notification;

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                hideNotification();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, hideNotification]);

    if (!isOpen) return null;

    const isSuccess = type === 'success';

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div className="card" style={{
                width: '90%',
                maxWidth: '400px',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
                animation: 'slideUp 0.3s ease-out',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '1px solid var(--border)'
            }}>
                <button
                    onClick={hideNotification}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-light)',
                        cursor: 'pointer',
                        padding: '0.25rem'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    {isSuccess ? (
                        <CheckCircle size={64} color="#10B981" />
                    ) : (
                        <XCircle size={64} color="#EF4444" />
                    )}

                    <div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '0.5rem',
                            color: isSuccess ? '#065F46' : '#991B1B'
                        }}>
                            {isSuccess ? 'Success!' : 'Oops!'}
                        </h3>
                        <p style={{ color: 'var(--text)', lineHeight: '1.5' }}>
                            {message}
                        </p>
                    </div>

                    <button
                        onClick={hideNotification}
                        className={`btn ${isSuccess ? 'btn-primary' : ''}`}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            marginTop: '0.5rem',
                            background: isSuccess ? '#10B981' : '#EF4444',
                            color: 'white',
                            border: 'none'
                        }}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
