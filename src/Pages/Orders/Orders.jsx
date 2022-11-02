import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(error => console.log(error));
    }, [user?.email])

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