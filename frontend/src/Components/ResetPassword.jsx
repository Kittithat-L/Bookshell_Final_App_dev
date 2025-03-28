import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:5001/api/reset-password/${token}`,
        { password }
      );
      setMessage(data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fdf6e3]">
      <div className="bg-transparent p-10 rounded-lg w-[1000px]">
        <h1 className="text-4xl font-extrabold text-black mb-5 text-center">
          BookShell
        </h1>
        <h2 className="text-2xl font-bold text-black">Reset Password</h2>
        <p className="text-black mb-4">
          Enter a new password for your account.
        </p>
        <form onSubmit={handleSubmit} className="mt-5">
          <label className="block text-left text-black font-semibold mb-1">
            New Password
          </label>
          <div className="relative">
            <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            <input
              type="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-black pl-10 pr-3 py-2 w-80 bg-[#FFD3C2] rounded-md focus:outline-none text-black mt-1 placeholder-gray-700"
            />
          </div>

          <label className="block text-left text-black font-semibold mb-1 mt-4">
            Confirm Password
          </label>
          <div className="relative">
            <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            <input
              type="password"
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-black pl-10 pr-3 py-2 w-80 bg-[#FFD3C2] rounded-md focus:outline-none text-black mt-1 placeholder-gray-700"
            />
          </div>

          <button
            type="submit"
            className="bg-[#BCD3F9] text-2xl rounded-md h-10 w-32 mt-3 hover:bg-[#97acf0] block mx-25"
          >
            Submit
          </button>
        </form>

        <p className="mt-3 text-black">{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
