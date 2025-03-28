import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import { ImSpinner6 } from "react-icons/im";

const MyAccount = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    telephone: "",
    img: null,
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError("");
        if (userId) {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5001/api/auth/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
          setFormData({
            username: response.data.username,
            img: response.data.img || "profile-1743155837998-542484019",
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user information.");
        setUserData((prevData) => ({
          ...prevData,
          img: "profile-1743155837998-542484019",
        }));
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      img: file,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      if (formData.img) {
        formDataToSend.append("file", formData.img);
      }

      await axios.put(
        `http://localhost:5001/api/auth/users/${userId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving user data:", err);
      setError("Failed to update profile.");
    }
    window.location.reload();
  };

  return (
    <div className="flex flex-row justify-between items-center w-screen">
      <div className="containter flex overflow-hidden rounded-[10px] bg-white w-[20%] min-h-screen border-r-[6px] mr-1">
        <Sidebar handleLogout={handleLogout} />
      </div>
      <div className="flex rounded-[10px] bg-white w-[70%] min-w-[50vh] min-h-screen mx-auto border-r-[6px] items-center justify-center">
        <main className="flex flex-col items-center justify-center w-[100%] h-full text-center">
          <h1 className="text-2xl font-bold mb-5">My Account</h1>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl">
                <ImSpinner6 className="animate-spin text-4xl" />
              </p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : userData ? (
            <div className="w-full max-w-md flex flex-col items-center justify-center">
              <div className="mb-4 flex flex-col items-center w-full">
                <img
                  src={userData?.img}
                  alt="Profile"
                  className="rounded-full w-32 h-32 object-cover shadow-md"
                />
              </div>
              {isEditing ? (
                <div className="w-full">

                  {/* Editable form for user data */}
                  <div className="mb-4 w-full">
                    <label className="text-gray-700 text-sm font-bold mb-2 text-center">
                      Username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="border-green-500 shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="text-gray-700 text-sm font-bold mb-2 text-center">
                      Email:
                    </label>
                    <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center">
                      {userData.email}
                    </p>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="text-gray-700 text-sm font-bold mb-2 text-center">
                      Phone Number:
                    </label>
                    <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center">
                      {userData.telephone}
                    </p>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="text-gray-700 text-sm font-bold mb-2 text-center">
                      Profile Image:
                    </label>
                    <input
                      type="file"
                      name="Profile"
                      onChange={handleImageChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                // Display non-editable user data
                <div className="w-full">
                  <div className="mb-4 w-full">
                    <label className="text-gray-700 text-sm font-bold mb-2 text-center">
                      Username:
                    </label>
                    <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center">
                      {userData.username}
                    </p>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="text-gray-700 text-sm font-bold mb-2 text-center">
                      Email:
                    </label>
                    <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center">
                      {userData.email}
                    </p>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="text-gray-700 text-sm font-bold mb-2 text-center">
                      Phone Number:
                    </label>
                    <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center">
                      {userData.telephone}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>No user data found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyAccount;
