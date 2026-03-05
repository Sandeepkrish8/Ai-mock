import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">

      <h2 className="logo">AI Interview Coach</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/practice">Practice</Link></li>
        <li><Link to="/roadmap">Roadmap</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      {user ? (
        <button className="login-btn" onClick={logout}>
          Logout
        </button>
      ) : (
        <Link to="/login" className="login-btn">
          Login
        </Link>
      )}

      {/* Hamburger Menu for Mobile */}
      <button className="hamburger" onClick={toggleDropdown} aria-label="Toggle menu">
        <span className={`hamburger-line line1 ${isDropdownOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line line2 ${isDropdownOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line line3 ${isDropdownOpen ? 'open' : ''}`}></span>
      </button>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-dropdown ${isDropdownOpen ? 'active' : ''}`}>
        <ul className="dropdown-links">
          <li><Link to="/" onClick={closeDropdown}>Home</Link></li>
          <li><Link to="/practice" onClick={closeDropdown}>Practice</Link></li>
          <li><Link to="/roadmap" onClick={closeDropdown}>Roadmap</Link></li>
          <li><Link to="/dashboard" onClick={closeDropdown}>Dashboard</Link></li>
          <li><Link to="/leaderboard" onClick={closeDropdown}>Leaderboard</Link></li>
          <li><Link to="/profile" onClick={closeDropdown}>Profile</Link></li>
        </ul>
        <div className="dropdown-divider"></div>
        {user ? (
          <button className="dropdown-logout" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="dropdown-login" onClick={closeDropdown}>
            Login
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;