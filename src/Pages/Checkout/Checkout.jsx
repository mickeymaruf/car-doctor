import React from 'react';
import { json, useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const Checkout = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const service = useLoaderData();
    const { title, img, price } = service;
    const { user } = useAuth();

    let fname, lname;
    if (user) {
        [fname, lname] = user?.displayName.split(" ");
    }
    // handle form
    const onSubmit = (data, e) => {
        const order = {
            service: service._id,
            customer: data
        }
        reset();
        fetch('https://genius-car-server-rho-azure.vercel.app/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-car-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire(
                        'Order Placed!',
                        `${service.title}`,
                        'success'
                    )
                    navigate('/orders');
                }
            })
            .catch(error => console.log(error));
    };
    return (
        <div className='w-10/12 mx-auto'>
            <div className='h-80 mb-16 rounded-lg relative'>
                <div className='carousel-image h-full'>
                    <img className='w-full h-full rounded-lg object-cover object-center' src={img} alt="" />
                    <div className='absolute top-1/2 -translate-y-1/2 left-20 text-gray-300 z-10'>
                        <h1 className='text-5xl font-bold mb-3'>{title}</h1>
                        <h2 className='text-4xl font-bold'>Price: ${price}</h2>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-10 bg-base-200 mb-20 rounded-lg">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input type="text" {...register('fname', { required: true })} placeholder="First name" className="input input-bordered w-full" defaultValue={fname} />
                    <input type="text" {...register('lname', { required: true })} placeholder="Last name" className="input input-bordered w-full" defaultValue={lname} />
                    <input type="text" {...register('phone', { required: true })} placeholder="Your phone" className="input input-bordered w-full" />
                    <input type="text" {...register('email', { required: true })} placeholder="Your email" className="input input-bordered w-full text-gray-500" defaultValue={user?.email} readOnly />
                    <textarea className="textarea textarea-bordered col-span-2" {...register('message')} placeholder="Your message (optional)"></textarea>
                </div>
                <button className='btn btn-theme w-full mt-5'>Place your order</button>
            </form>
        </div>
    );
};

export default Checkout;