import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className='flex flex-row justify-between items-center w-screen'>
      <div className=" containter flex overflow-hidden rounded-[10px] bg-white w-[20%] min-h-screen border-r-[6px] mr-1">
        <aside className="sidebar text-black min-w-[250px] px-[20px] py-[20px] flex flex-col justify-between">
          <h1 className="logo text-center font-bold text-[1.8em]">BOOKSHELL</h1>
          <nav>
            <button className="nav-btn home-btn w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">🏠 HOME</button>
            <button className="nav-btn search-btn w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">🔍 SEARCH</button>
          </nav>
          <div className="shelves mt-[20px]">
            <h2>#MY SHELVES</h2>
            <button className="shelf-btn w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">MY LIBRARY</button>
            <button className="shelf-btn w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">FAVORITES</button>
          </div>
          <div className="account-section mt-auto">
            <button className="account-btn w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">👤 My account</button>
            <button className="account-btn w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">❓ Help</button>
            <button className="account-btn w-[100%] p-[12px] my-[10px] border-[2px] rounded-[20px] bg-[#ffcbbf] cursor-pointer font-[1em] flex items-center justify-center">📖 Feedback</button>
          </div>
        </aside>
      </div>


      <div className=' containter flex overflow-hidden rounded-[10px] bg-white w-[70%] min-w-[50vh] min-h-screen mx-auto border-r-[6px]'>
      <main className="content flex-1 p-[20px] bg-cover flex-col items-center content-start w-100%">
        <div className="search-bar flex columns-2 w-[100%] bg-[#ffcbbf] rounded-[30px] p-[5px] items-center border-2">
          <input type="text" placeholder="Search..." className=' flex border-0 bg-transparent p-[10px] text-[1.2em] outline-none w-[90%]' />
          <button className='border-0 bg-transparent cursor-pointer text-[1.2em] w-[10%]'>🔍</button>
        </div>
        <div className=" blo">
          content
        </div>
      </main>
      </div>
    </div>
);
}
export default HomePage