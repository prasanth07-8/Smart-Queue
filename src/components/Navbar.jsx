// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const navigate = useNavigate();

  const { user } = useAuth(); // logged-in user info

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        Smart Queue
      </div>

      <div ref={menuRef} className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/register" onClick={toggleMenu}>Register</Link>

        {/* Queue / Dashboard Link */}
        {user ? (
          user.role === "admin" ? (
            <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
          ) : (
            <Link to="/queue" onClick={toggleMenu}>Queue</Link>
          )
        ) : null}

        <Link to="/contact" onClick={toggleMenu}>Contact</Link>

        {/* Login Button */}
        {!user && <Link to="/login" onClick={toggleMenu} className="nav-btn">Login</Link>}

        {/* Profile Icon for normal user */}
        {user && user.role === "user" && (
          <div
            className="nav-profile-icon"
            onClick={() => navigate("/profile")}
            title="Profile"
          >
            {/* Inline SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="32px"
              height="32px"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
        )}
      </div>

      <div ref={hamburgerRef} className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "rotate1" : ""}`}></div>
        <div className={`bar ${isOpen ? "fade" : ""}`}></div>
        <div className={`bar ${isOpen ? "rotate2" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
