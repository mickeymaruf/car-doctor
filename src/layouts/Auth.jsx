import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header';
import loginImg from '../assets/images/login/login.svg';

const Auth = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-col items-start justify-center lg:flex-row-reverse pb-28 pt-8">
                <Outlet />
                <div className="flex-1 mt-5">
                    <img className='w-4/6 mx-auto' src={loginImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Auth;