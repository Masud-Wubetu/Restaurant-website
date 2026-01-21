import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [ordering, setOrdering] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setOrdering(true);
        try {
            const orderItems = cart.map(item => ({
                menuItem: item._id,
                quantity: item.quantity
            }));

            await api.post('/orders', {
                items: orderItems,
                totalPrice
            });

            clearCart();
            showNotification('Order placed successfully! We hope you enjoy your meal.');
            navigate('/orders');
        } catch (err) {
            console.error(err);
            showNotification('Failed to place order. Please check your connection and try again.', 'error');
        } finally {
            setOrdering(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
                <button onClick={() => navigate('/menu')} className="btn btn-primary">Browse Menu</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Your Cart</h1>

            <div className="card">
                {cart.map((item) => (
                    <div key={item._id} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                        {/* Thumbnail if available */}
                        <div style={{ width: '80px', height: '80px', background: '#eee', borderRadius: '8px', backgroundImage: `url(${item.image || ''})`, backgroundSize: 'cover' }}></div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem' }}>{item.name}</h3>
                                <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: '#EF4444' }}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${item.price}</p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                                <button
                                    className="btn btn-outline"
                                    style={{ padding: '0.25rem 0.5rem' }}
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                >-</button>
                                <span>{item.quantity}</span>
                                <button
                                    className="btn btn-outline"
                                    style={{ padding: '0.25rem 0.5rem' }}
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                >+</button>
                            </div>
                        </div>
                    </div>
                ))}

                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '2px dashed var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={ordering}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                    >
                        {ordering ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
}
