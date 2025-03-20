import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Loginform = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email: ' , email);
    console.log('Password: ' , password);

  axios.post('http://localhost:5001/api/auth/login' , {
    email : email,
    password : password
  })
  .then(response=>{
    console.log('Login Successfully ' , response.data);
    localStorage.setItem('token' , response.data.token);
    navigate('/');
  })
  .catch(error =>{
    console.error('Login Error ' , error)
  });
}

const gotoRegister = () => {
  navigate('/register');
}

  return (
    <div className=' container justify-center flex min-h-[90vh] items-center min-w-screen'>
      <div className=' mt-40'>
        <div className=' text-white'>
        <div className=' text-white mt-20'>
          <p className=' text-4xl'>Sign In</p>
          <p className=' cursor-pointer hover:underline' onClick={gotoRegister}>New here? Create a VitalSource Account</p>
        </div>
          <form onSubmit={handleSubmit}>
            <p>Email</p>
            <MdEmail className=' absolute text-2xl text-black mx-0.75 my-0.5'/>
            <input type='email'placeholder='Email...' name='email' onChange={(e)=> setEmail(e.target.value)} required className=' border-2 px-7 w-70 bg-[#FFCBBF] rounded-md focus:px-7 text-black'/>
            <p>Password</p>
            <FaLock className=' absolute text-xl text-black mx-0.75 my-1'/>
            <input type='password' placeholder='Password...' name='password' onChange={(e)=> setPassword(e.target.value)} required className=' border-2 px-7 w-70 bg-[#FFCBBF] rounded-md focus:px-7 text-black'/><br />
            <div className=' text-center pt-3'>
              <button type="submit" className='bg-[#BCD3F9] text-2xl rounded-md h-10 w-25 hover:bg-[#97acf0]'>Sign In</button>
            </div>
            <p className=' cursor-pointer hover:underline'>Forgot Username / Password?</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Loginform