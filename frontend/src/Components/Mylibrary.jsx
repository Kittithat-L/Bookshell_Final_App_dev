import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const MyLibrary = () => {
  return (
    <div className="library">
    <h1 className="library-title">MY LIBRARY</h1>
  </div>
  )
};
}

export default HomePage