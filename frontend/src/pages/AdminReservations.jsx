import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const res = await api.get('/reservations/all');
            setReservations(res.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/reservations/${id}`, { status: newStatus });
            // Optimistic update or refetch
            setReservations(reservations.map(res =>
                res._id === id ? { ...res, status: newStatus } : res
            ));
            alert(`Reservation ${newStatus}`);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin: Reservation Management</h1>
            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem' }}>User</th>
                            <th style={{ padding: '1rem' }}>Date/Time</th>
                            <th style={{ padding: '1rem' }}>Guests</th>
                            <th style={{ padding: '1rem' }}>Special Request</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(res => (
                            <tr key={res._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>
                                    {res.name}
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{res.user?.email}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {res.date} <br /> {res.time}
                                </td>
                                <td style={{ padding: '1rem' }}>{res.guests}</td>
                                <td style={{ padding: '1rem', maxWidth: '200px' }}>
                                    {res.specialRequest || <span style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>None</span>}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        background: res.status === 'Confirmed' ? '#D1FAE5' : res.status === 'Cancelled' ? '#FEE2E2' : '#FEF3C7',
                                        color: res.status === 'Confirmed' ? '#065F46' : res.status === 'Cancelled' ? '#991B1B' : '#92400E'
                                    }}>
                                        {res.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {res.status === 'Pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleStatusUpdate(res._id, 'Confirmed')}
                                                style={{ padding: '0.5rem', background: '#10B981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(res._id, 'Cancelled')}
                                                style={{ padding: '0.5rem', background: '#EF4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
