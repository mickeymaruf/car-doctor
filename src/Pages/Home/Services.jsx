import React, { useEffect, useState } from 'react';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(error => console.log(error));
    }, [])
    return (
        <div className='pb-20'>
            <div className='w-1/2 mx-auto text-center'>
                <h4 className='text-xl font-bold text-theme'>Service</h4>
                <h2 className='text-4xl font-bold mt-2 mb-4'>Our Service Area</h2>
                <p className='text-gray-500'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {
                    services.map(service => <div key={service._id} className='p-5 border rounded-lg'>
                        <img className='rounded-lg' src={service.img} alt="" />
                        <div>
                            <h4 className='text-xl font-medium mt-3'>{service.title}</h4>
                            <h5 className='text-lg font-medium mt-1 text-theme'>Price: ${service.price}</h5>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Services;