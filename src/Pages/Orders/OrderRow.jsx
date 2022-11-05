import React, { useEffect, useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import Swal from 'sweetalert2';

const OrderRow = ({ order, setOrders }) => {
    const [service, setService] = useState({});
    const [status, setStatus] = useState(order.status);
    useEffect(() => {
        fetch(`http://localhost:5000/services/${order.service}`)
            .then(res => res.json())
            .then(data => setService(data))
            .catch(error => console.log(error));
    }, [order.service])
    const handleDeleteOrder = () => {
        fetch(`http://localhost:5000/orders/${order._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-car-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setOrders(prevState => prevState.filter(ordr => ordr._id !== order._id));
                    Swal.fire(
                        'Order Cancled!',
                        `${service.title}`,
                        'success'
                    )
                }
            })
            .catch(error => console.log(error));
    }
    const confirmOrder = () => {
        fetch(`http://localhost:5000/orders/${order._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-car-token')}`
            },
            body: JSON.stringify()
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setStatus('approved');
                }
            });
    }
    return (
        <tr>
            <th>
                {
                    status === "approved" ||
                    <label>
                        <button onClick={handleDeleteOrder} className='bg-base-300 p-2 rounded-full '><HiOutlineXMark className='w-6 h-6' /> </button>
                    </label>
                }
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar mr-3">
                        <div className="mask mask-squircle w-32 h-3w-32">
                            <img src={service?.img} alt={service?.title} />
                        </div>
                    </div>
                    <div>
                        <div className="text-xl font-medium">{service.title}</div>
                    </div>
                </div>
            </td>
            <td>
                <p className='font-medium'>${service.price}</p>
            </td>
            <td>{order.customer?.email} <br />{order.customer?.phone}</td>
            <th>
                {
                    status === 'approved' ?
                        <button className="btn btn-ghost btn-xs bg-green-500 hover:bg-green-500 text-white">Approved</button>
                        :
                        <button onClick={confirmOrder} className="btn btn-ghost btn-xs bg-[#ff3811] hover:bg-[#ff3811] text-white">Pending</button>
                }
            </th>
        </tr>
    );
};

export default OrderRow;