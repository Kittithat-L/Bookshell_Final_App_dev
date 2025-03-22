import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const Bookshelf = () => {
  return (
    <div className="container">
    <aside className="sidebar">
      <h2 className="logo">BOOKSHELL</h2>
      <button className="menu-button">🏠 HOME</button>
      <button className="menu-button">🔍 SEARCH</button>
      <h3>#MY SHELVES</h3>
      <button className="menu-button">MY LIBRARY</button>
      <button className="menu-button">FAVORITES</button>
      <div className="bottom-links">
        <button>👤 My account</button>
        <button>❓ Help</button>
        <button>📖 Feedback</button>
      </div>
    </aside>
    <main className="content">
      <h2>FAVORITES</h2>
      <p>No favorite books added yet.</p>
    </main>
  </div>
  )
};
}

export default HomePage