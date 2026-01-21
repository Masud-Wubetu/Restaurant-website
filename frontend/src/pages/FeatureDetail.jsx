import { useParams, Link } from 'react-router-dom';

export default function FeatureDetail() {
    const { id } = useParams();

    const features = {
        'fresh-ingredients': {
            title: 'Fresh Ingredients',
            description: 'We believe that great food starts with great ingredients. That is why we source our produce daily from local organic farms. Our meat is ethically sourced, and our seafood is fresh from the catch. We never compromise on quality because we know you can taste the difference.',
            image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        },
        'expert-chefs': {
            title: 'Expert Chefs',
            description: 'Our culinary team is led by award-winning chefs with years of experience in top restaurants around the world. They bring passion, creativity, and precision to every dish. From the perfect sear on a steak to the delicate balance of spices in our sauces, our chefs ensure every bite is a masterpiece.',
            image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        },
        'fast-delivery': {
            title: 'Fast Delivery',
            description: 'Hungry? We’ve got you covered. Our efficient delivery network ensures that your food reaches you hot and fresh. We use state-of-the-art thermal packaging to maintain the perfect temperature. Track your order in real-time and enjoy restaurant-quality food from the comfort of your home.',
            image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        },
        'best-prices': {
            title: 'Best Prices',
            description: 'We believe that luxury dining should be accessible to everyone. Our pricing strategy ensures you get the best value for your money without compromising on quality. We offer regular promotions and student discounts to make your dining experience even more affordable.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        },
        'event-catering': {
            title: 'Event Catering',
            description: 'From intimate gatherings to grand celebrations, our catering service brings the restaurant experience to your event. We offer customizable menus, professional staff, and seamless service. Let us handle the food so you can focus on making memories with your guests.',
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        },
        '24-7-support': {
            title: '24/7 Support',
            description: 'Your satisfaction is our top priority. Our dedicated support team is available around the clock to assist you with orders, reservations, or any inquiries. Whether it’s a late-night craving or a feedback, we’re here to listen and serve you better.',
            image: 'https://images.unsplash.com/photo-1521791136064-7985c2717883?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        }
    };

    const feature = features[id];

    if (!feature) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Feature not found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--primary)', fontWeight: 500 }}>&larr; Back to Home</Link>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{
                    height: '400px',
                    background: `url(${feature.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>

                <div style={{ padding: '2rem' }}>
                    <h1 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{feature.title}</h1>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text)' }}>
                        {feature.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
