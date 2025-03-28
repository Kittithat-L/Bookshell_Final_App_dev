import React, { useState } from 'react';
import { MdOutlineMail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forget = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);

        axios.post('http://localhost:5001/api/auth/forgot-password', {
            email: email
        })
            .then(response => {
                console.log('Reset Link Sent:', response.data);
                alert('A password reset link has been sent to your email.');
            })
            .catch(error => {
                console.error('Reset Error:', error);
            });
    };

    const backToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-[#fdf6e3]'>
            <div className='bg-transparent p-10 rounded-lg w-[1000px] '>
                <h1 className='text-4xl font-extrabold text-black mb-5 text-center'>BookShell</h1>
                <h2 className='text-2xl font-bold text-black '>Forgot Password?</h2>
                <p className='text-black font-medium '>Know your password? <span className='text-blue-600 cursor-pointer hover:underline' onClick={backToLogin}>Sign In</span></p>
                <p className='text-black mb-4'>Enter the email address you use to sign in and we’ll send you an email to reset your password.</p>
                <form onSubmit={handleSubmit} className='mt-5'>
                    <label className='block text-left text-black font-semibold mb-1'>Email</label>
                    <div className='relative'>
                        <MdOutlineMail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl' />
                        <input
                            type='email'
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='border border-black pl-10 pr-3 py-2 w-80 bg-[#FFD3C2] rounded-md focus:outline-none text-black mt-1 placeholder-gray-700' />
                    </div>
                    <button type='submit' className='bg-[#BCD3F9] text-2xl rounded-md h-10 w-32 mt-3 hover:bg-[#97acf0] block mx-25'>
    Submit
</button>

                </form>
            </div>
        </div>
    );
};
export default Forget;