import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

export default function Menu() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addToCart } = useCart();

    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/register');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (!user) return; // Warning: Don't fetch if no user, though redirect happens fast.

        const fetchMenu = async () => {
            try {
                const { data } = await api.get('/menu');
                setItems(data);
            } catch (err) {
                setError('Failed to load menu items');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [user]);

    if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
    if (error) return <div className="container" style={{ padding: '4rem', color: 'red' }}>{error}</div>;

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Menu</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {items.map((item) => (
                    <div key={item._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* If item has image, display it. Assuming 'image' field or similar. If not, placeholder. */}
                        <div style={{
                            height: '200px',
                            background: '#eee',
                            borderRadius: 'var(--radius)',
                            marginBottom: '1rem',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                                alt={item.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'; }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem' }}>{item.name}</h3>
                            <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>${item.price}</span>
                        </div>

                        <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', flex: 1 }}>{item.description}</p>

                        <button
                            onClick={() => addToCart(item)}
                            className="btn btn-primary"
                            style={{ width: '100%', gap: '0.5rem' }}
                        >
                            <Plus size={18} /> Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
