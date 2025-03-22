import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className="container">
    <aside className="sidebar">
      <h1 className="logo">BOOKSHELL</h1>
      <nav>
        <button className="nav-btn home-btn">🏠 HOME</button>
        <button className="nav-btn search-btn">🔍 SEARCH</button>
      </nav>
      <div className="shelves">
        <h2>#MY SHELVES</h2>
        <button className="shelf-btn">MY LIBRARY</button>
        <button className="shelf-btn">FAVORITES</button>
      </div>
      <div className="account-section">
        <button className="account-btn">👤 My account</button>
        <button className="account-btn">❓ Help</button>
        <button className="account-btn">📖 Feedback</button>
      </div>
    </aside>
    <main className="content">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>
      <div className=" blo"></div>
    </main>
  </div>
);
}
export default HomePage