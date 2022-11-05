import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../contexts/AuthProvider';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const menuItems = <>
        <li className='hover:text-theme'><Link to="/">Home</Link></li>
        {
            user && <li className='hover:text-theme'><Link to="/orders">Orders</Link></li>
        }
        <li className='hover:text-theme'><Link to="/">Services</Link></li>
        <li className='hover:text-theme'><Link to="/">Blog</Link></li>
        <li className='hover:text-theme'><Link to="/">Contact</Link></li>
    </>
    const handleLogout = () => {
        logout()
            .then(() => {
                navigate("/auth");
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="navbar bg-base-100 py-7">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content font-medium mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/">
                    <img className='w-20' src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="gap-10 menu-horizontal p-0 font-medium">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?
                        <>
                            <div className="avatar online">
                                <div className="w-10 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" alt='' />
                                </div>
                            </div>
                            <button onClick={handleLogout} className="btn btn-theme-outline rounded-md ml-3">Logout</button>
                        </>
                        :
                        <Link to="/auth"><button className="btn btn-theme-outline rounded-md">Get Started</button></Link>
                }
            </div>
        </div>
    );
};

export default Header;