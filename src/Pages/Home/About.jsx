import React from 'react';
import person from '../../assets/images/about_us/person.jpg';
import parts from '../../assets/images/about_us/parts.jpg';

const About = () => {
    return (
        <div className="flex flex-col lg:flex-row-reverse pb-28 pt-8">
            <div className="flex-1">
                <h3 className='text-xl font-bold text-theme'>About Us</h3>
                <h2 className='text-5xl font-bold mt-3'>We are qualified & of experience in this field</h2>
                <p className="mt-8 mb-5 text-gray-500">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </p>
                <p className="mb-7 text-gray-500">
                    the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </p>
                <button className='btn btn-theme hover:border hover:border-theme rounded-lg'>Get More Info</button>
            </div>
            <div className="flex-1 relative">
                <div className='h-5/6'>
                    <img className='rounded-lg w-[77%] h-full shadow-xl' src={person} alt="" />
                </div>
                <div className='absolute bottom-0 p-2 rounded-lg bg-base-100 right-20 w-1/2 shadow-xl'>
                    <img className='rounded-md' src={parts} alt="" />
                </div>
            </div>
        </div>
    );
};

export default About;