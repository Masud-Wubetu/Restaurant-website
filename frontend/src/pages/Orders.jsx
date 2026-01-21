import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [authLoading, user, navigate]);

    useEffect(() => {
        if (!user) return;
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (loading || authLoading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;

    if (orders.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>No orders yet</h2>
                <p style={{ color: 'var(--text-light)' }}>Go to the menu and order something delicious!</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>My Orders</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {orders.map((order) => (
                    <div key={order._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem' }}>Order #{order._id.slice(-6)}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary)' }}>${order.totalPrice.toFixed(2)}</span>
                                {/* <div style={{ fontSize: '0.8rem', background: '#D1FAE5', color: '#065F46', padding: '0.2rem 0.5rem', borderRadius: '4px', marginTop: '0.25rem', display: 'inline-block' }}>Completed</div> */}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {order.items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                                    <span>
                                        <span style={{ fontWeight: 600 }}>{item.quantity}x</span> {item.menuItem ? item.menuItem.name : "Unknown Item"}
                                    </span>
                                    <span>${(item.quantity * (item.menuItem ? item.menuItem.price : 0)).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
