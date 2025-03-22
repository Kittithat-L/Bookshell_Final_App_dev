import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Searchbar = ({ onSearch }) => {
    const [book, setBook] = useState("");
    const handleBookChange = (e) => {
        setBook(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(book);
    };

    return (
        <div className=" flex columns-2 w-[100%] bg-[#ffcbbf] rounded-[30px] p-[5px] items-center border-2">
            <input type="text" placeholder="Search..." className=' flex border-0 bg-transparent p-[10px] text-[1.2em] outline-none w-[95%]' autoComplete='off' onChange={handleBookChange} />
            <button className='border-0 bg-transparent cursor-pointer text-[1.2em] w-auto flex justify-end' onClick={handleSearch}><FaSearch /></button>
        </div>
    );
};

export default Searchbar;