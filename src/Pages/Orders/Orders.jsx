import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider';

const Orders = () => {
    const { user } = useAuth();
    useEffect(() => {
        fetch(`https://localhost:5000/orders?email=${user.email}`)
    }, [])
    return (
        <div>

        </div>
    );
};

export default Orders;