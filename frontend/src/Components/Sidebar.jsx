<<<<<<< HEAD
import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const Sidebar = () => {
  return (
    <div className="sidebar">
    <h1 className="title">BOOKSHELL</h1>
    <div className="menu">
      <button className="menu-button">🏠 HOME</button>
      <button className="menu-button">🔍 SEARCH</button>
    </div>
    <h2 className="shelves-title">#MY SHELVES</h2>
    <div className="shelves">
      <button className="shelves-button">MY LIBRARY</button>
      <button className="shelves-button">FAVORITES</button>
    </div>
    <div className="account-section">
      <button className="account-button">👤 My account</button>
      <button className="account-button">❓ Help</button>
      <button className="account-button">📖 Feedback</button>
    </div>
  </div>
  )
};
}

export default HomePage
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosExit } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";

const Sidebar = ({ handleLogout }) => {
    const navigate = useNavigate();
    const homePage = () =>{
        navigate('/')
        window.location.reload();
    }

    return (
        <aside className=" text-black min-w-[250px] px-[20px] py-[20px] flex flex-col justify-between">
            <h1 className=" text-center font-bold text-[1.8em]">BOOKSHELL</h1>
            <nav>
                <button className=" w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center" onClick={homePage}><FaHouseUser className='mx-2 text-xl' /> HOME</button>
            </nav>
            <div className="mt-[50%]">
                <h2>#MY SHELVES</h2>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">MY LIBRARY</button>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">FAVORITES</button>
            </div>
            <div className="mt-auto">
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center"><FaUserCircle className='mx-2 text-xl' /> My account</button>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center" onClick={handleLogout}> <IoIosExit className='mx-2 text-xl' /> Logout</button>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center"><IoIosHelpCircle className='mx-2 text-xl' /> Help</button>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center"><MdFeedback className='mx-2 text-xl' /> Feedback</button>
            </div>
        </aside>
    );
};

export default Sidebar;
>>>>>>> main
