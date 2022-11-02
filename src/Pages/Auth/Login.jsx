import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email, password)
            .then((userCredential) => {
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
    return (
        <div className="card flex-1 bg-base-100 rounded-md">
            <div onSubmit={handleSubmit} className="card-body w-10/12 border rounded-md p-14 py-16">
                <h3 className='text-center text-3xl font-medium'>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name='email' placeholder="Your email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="Your password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-theme">Login</button>
                    </div>
                </form>
                <p className='text-center mt-5'>New to Genius Car? <Link className='underline text-theme' to="/auth/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;