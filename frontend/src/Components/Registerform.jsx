import React, { useState, useEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Registerform = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [loading, setLoading] = useState(false);

    const checkUserAvailability = async () => {
        try {
            await axios.post('http://localhost:5001/api/auth/check-user', {
                email: email,
                username: username,
            });
            setEmailError('');
            setUsernameError('');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                if (error.response.data.message.includes('Email')) {
                    setEmailError(error.response.data.message);
                } else if (error.response.data.message.includes('Username')) {
                    setUsernameError(error.response.data.message);
                }
            }
        }
    };

    useEffect(() => {
        if (email || username) {
            checkUserAvailability();
        }
    }, [email, username]);

    const handleRegister = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setRegisterError('');

            if (emailError || usernameError) {
                setRegisterError('Please correct the errors before registering.');
                setLoading(false);
                return;
            }

            if (!email || !username || !password || !telephone) {
                setRegisterError('Please fill all the fields.');
                setLoading(false);
                return;
            }

            if (password.length < 8) {
                setRegisterError('Password must be at least 8 characters long.');
                setLoading(false);
                return;
            }

            axios.post('http://localhost:5001/api/auth/register', {
                email: email,
                password: password,
                username: username,
                telephone: telephone,
            })
            .then(response => {
                console.log('Register Successfully ', response.data);
                alert('Register Successfully');
                navigate('/login');
            })
            .catch(error => {
                console.error('Register Error ', error);
                if (error.response && error.response.data && error.response.data.message) {
                    setRegisterError(error.response.data.message);
                } else {
                    setRegisterError('Register Error');
                }
            })
            .finally(() => setLoading(false));
        } catch (error) {
            console.error('Register Error ', error);
            setRegisterError('Register Error');
            setLoading(false);
        }
    };

    return (
        <div className='container justify-center flex min-h-[90vh] items-center min-w-screen'>
            <div className='mt-40'>
                <div className='text-white w-auto'>
                    <div className='text-white mt-20'>
                        <p className='text-4xl'>Sign Up</p>
                    </div>
                    <form onSubmit={handleRegister}>
                        <p>Email</p>
                        <MdEmail className='absolute text-2xl text-black mx-0.75 my-0.5' />
                        <input type='email' placeholder='Email...' name='email' onChange={(e) => setEmail(e.target.value)} required className='border-2 px-7 w-70 bg-[#FFCBBF] rounded-md focus:px-7 text-black' />
                        {emailError && <p className='text-red-500'>{emailError}</p>}
                        <p>Username</p>
                        <FaUser className='absolute text-xl text-black mx-0.75 my-1' />
                        <input type='text' placeholder='Username...' name='username' onChange={(e) => setUsername(e.target.value)} required className='border-2 px-7 w-70 bg-[#FFCBBF] rounded-md focus:px-7 text-black' />
                        {usernameError && <p className='text-red-500'>{usernameError}</p>}
                        <p>Password</p>
                        <FaLock className='absolute text-xl text-black mx-0.75 my-1' />
                        <input type='password' placeholder='Password...' name='password' onChange={(e) => setPassword(e.target.value)} required className='border-2 px-7 w-70 bg-[#FFCBBF] rounded-md focus:px-7 text-black' /><br />
                        <p>Phone number</p>
                        <FaPhone className='absolute text-xl text-black mx-0.75 my-1' />
                        <input type='tel' placeholder='Phone number...' name='telephone' onChange={(e) => setTelephone(e.target.value)} required className='border-2 px-7 w-70 bg-[#FFCBBF] rounded-md focus:px-7 text-black' /><br />
                        {registerError && <p className='text-red-500'>{registerError}</p>}
                        <div className='text-center pt-3'>
                            <button type='submit' className='bg-[#BCD3F9] text-2xl rounded-md h-10 w-auto px-3 hover:bg-[#97acf0]' disabled={loading}>
                                {loading ? 'Registering...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};