import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-car-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('genius-car-token');
                    return logout();
                }
                return res.json()
            })
            .then(data => Array.isArray(data) ? setOrders(data) : [])
            .catch(error => console.log(error));
    }, [user?.email, logout])

    return (
        <div className="overflow-x-auto w-full pb-20">
            <table className="table w-full">
                <tbody>
                    {
                        orders.map(order => <OrderRow
                            key={order._id}
                            order={order}
                            setOrders={setOrders}
                        />)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Orders;