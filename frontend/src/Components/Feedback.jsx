import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const Feedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback Submitted:', { name, email, phone, message });
        alert('Feedback submitted successfully!');
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#fdf6e3]">
            <h1 className="text-4xl font-extrabold text-black mb-5">FEEDBACK FROM</h1>
            <div className="bg-black p-10 rounded-lg shadow-md w-[700px]">
                <form onSubmit={handleSubmit}>

                    <div className="flex items-center border-2 border-white rounded-md px-4 py-2 w-full mb-4 bg-black">
                        <FaUser className="text-white mr-2" />
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-black text-white w-full outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 border-white rounded-md px-4 py-2 w-full mb-4 bg-black">
                        <FaEnvelope className="text-white mr-2" />
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black text-white w-full outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 border-white rounded-md px-4 py-2 w-full mb-4 bg-black">
                        <FaPhone className="text-white mr-2" />
                        <input
                            type="tel"
                            placeholder="Enter phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-black text-white w-full outline-none"
                        />
                    </div>
                    <textarea
                        placeholder="Enter message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-2 border-white px-4 py-2 w-full mb-4 bg-black text-white rounded-md outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-[#FFD700] text-2xl font-bold rounded-md h-10 w-full hover:bg-[#FFC107]" >SUMMIT</button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
