import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosExit } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


const Sidebar = ({ handleLogout }) => {
    const navigate = useNavigate();
    const homePage = () =>{
        navigate('/');
    }

    const myfavorites =()=>{
        navigate('/myfavorites');
    }
    const search =()=>{
        navigate('/search');
    }

    return (
        <aside className=" text-black min-w-[250px] px-[20px] py-[20px] flex flex-col justify-between">
            <h1 className=" text-center font-bold text-[1.8em]">BOOKSHELL</h1>
            <nav>
                <button className=" w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center" onClick={homePage}><FaHouseUser className='mx-2 text-xl' /> HOME</button>
                <button className=" w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center" onClick={search}><FaSearch className='mx-2 text-xl' /> Search</button>
            </nav>
            <div className="mt-[30%] text-center">
                <h2>#MY SHELVES</h2>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center" onClick={myfavorites}>MY FAVORITES</button>
            </div>
            <div className="mt-auto pt-20">
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center"><FaUserCircle className='mx-2 text-xl' /> My account</button>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center" onClick={handleLogout}> <IoIosExit className='mx-2 text-xl' /> Logout</button>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center"><IoIosHelpCircle className='mx-2 text-xl' /> Help</button>
                <button className="w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center"><MdFeedback className='mx-2 text-xl' /> Feedback</button>
            </div>
        </aside>
    );
};

export default Sidebar;