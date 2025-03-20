import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className=' text-white'>
      <h1>Home Page</h1>
      <p className=' cursor-pointer' onClick={handleLogout}>
        Logout
      </p>
      

    </div>
  )
}

export default HomePage