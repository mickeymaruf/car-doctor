import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const { createUser, setProfile, verifyEmail } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUser(email, password)
            .then((userCredential) => {
                setProfile(name)
                    .then(() => {
                        //    
                    }).catch(error => {
                        console.log(error);
                    });
                verifyEmail()
                    .then(() => {
                        toast.success('A verification mail has been sent!');
                        navigate('/login');
                    })
                    .catch(error => {
                        console.log(error);
                    });

            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
    return (
        <div className="card flex-1 bg-base-100 rounded-md">
            <div className="card-body w-10/12 border rounded-md p-14 py-16">
                <h3 className='text-center text-3xl font-medium'>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Your name" className="input input-bordered" />
                    </div>
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
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-theme">Sign Up</button>
                    </div>
                </form>
                <p className='text-center mt-5'>Have an account <Link className='underline text-theme' to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;