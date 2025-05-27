import React, { useState, useEffect, useContext } from 'react';
import { handleError, handleSuccess } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import { context } from './Context';

const Login = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    const { setLoggedIn, setUser } = useContext(context);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { email, password } = formData;
        if (!email || !password) {
            handleError('Email and password should not be empty');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            const { success, message, jwtToken, name, mobile, error,userid } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', email);
                localStorage.setItem('loggedInUserName', name);
                localStorage.setItem('loggedInUserId', userid);
                console.log("user email: ",localStorage.getItem("loggedInUser"));
                

                setLoggedIn(true);
                setUser({ name, email, mobile });

                setTimeout(() => navigate('/home'), 1000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-black text-gray-300 px-6'>
            <form onSubmit={handleSubmit} className='border border-gray-600 rounded-lg p-10 space-y-6 bg-black/80 shadow-lg'>
                <h1 className='text-xl font-semibold text-white'>Hi, welcome back!</h1>

                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-gray-400'>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='bg-white/10 text-gray-200 border-none outline-none p-2 rounded-md focus:ring-2 focus:ring-teal-400'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="password" className='text-gray-400'>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className='bg-white/10 text-gray-200 border-none outline-none p-2 rounded-md focus:ring-2 focus:ring-teal-400'
                    />
                </div>

                <p className='text-sm'>
                    Don't have an account? <Link className='text-yellow-300 hover:underline' to="/register">Register</Link>
                </p>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 font-semibold rounded-md text-black bg-teal-400 hover:bg-teal-500 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
