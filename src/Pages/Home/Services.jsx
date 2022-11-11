import React, { useEffect, useRef, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [range, setRange] = useState("");
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&range=${range}&order=${isAsc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(error => console.log(error));
    }, [isAsc, range, search])
    const handleSearch = e => {
        if (e.key === "Enter") {
            setSearch(e.target.value)
        }
    }
    return (
        <div className='pb-20'>
            <div className='w-1/2 mx-auto text-center'>
                <h4 className='text-xl font-bold text-theme'>Service</h4>
                <h2 className='text-4xl font-bold mt-2 mb-4'>Our Service Area</h2>
                <p className='text-gray-500'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>

            <div className='flex justify-between items-end'>
                <div>
                    <button className='btn btn-sm btn-theme mr-2' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'High to Low' : 'Low to High'}</button>
                    <select onChange={e => setRange(e.target.value)} className="select select-bordered select-sm w-32">
                        <option value="" selected>All</option>
                        <option value="100">less than 100</option>
                        <option value="200">less than 200</option>
                        <option value="500">less than 500</option>
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text"></span>
                        <span className="label-text-alt"><kbd className='kbd'>Enter</kbd></span>
                    </label>
                    <input onKeyUp={handleSearch} type="text" placeholder="Search here" className="input input-bordered w-full max-w-xs" />
                </div>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {
                    services.map(service => <div key={service._id} className='p-5 border rounded-lg'>
                        <img className='rounded-lg' src={service.img} alt="" />
                        <div className='flex justify-between'>
                            <div>
                                <h4 className='text-xl font-medium mt-3'>{service.title}</h4>
                                <h5 className='text-lg font-medium mt-1 text-theme'>Price: ${service.price}</h5>
                            </div>
                            <Link to={`/checkout/${service._id}`} className='self-end bg-base-200 p-3 rounded-md'>
                                <BsArrowRight className='w-6 h-6' />
                            </Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Services;