import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Ensure it starts as an array
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5001/api/feedback/get"
        );
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setFeedbacks(response.data);
        } else {
          setFeedbacks([]); // In case the response is not an array
        }
      } catch (error) {
        setErrorMessage("Error fetching feedbacks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = { name, email, phone, message };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5001/api/feedback/post",
        newFeedback
      );
      setFeedbacks([response.data, ...feedbacks]);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrorMessage("");
      alert("Feedback submitted successfully!");
    } catch (error) {
      setErrorMessage("Error submitting feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fdf6e3] p-5">
      <h1 className="text-4xl font-extrabold text-black mb-5">FEEDBACK FORM</h1>

      <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-lg">
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
            required
          />
          <button
            type="submit"
            className="bg-[#FFD700] text-2xl font-bold rounded-md h-10 w-full hover:bg-[#FFC107]"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
      </div>

      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-3">Recent Feedback</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading feedbacks...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback submitted yet.</p>
        ) : (
          feedbacks.map((fb, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 border-yellow-500"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{fb.name}</h3>
                <span className="text-sm text-gray-500">
                  {formatDate(fb.date)}
                </span>
              </div>
              <p className="text-gray-700">{fb.message}</p>
              <div className="mt-2 text-gray-500 text-sm">
                <span>Email: {fb.email}</span>{" "}
                {fb.phone && ` | Phone: ${fb.phone}`}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
