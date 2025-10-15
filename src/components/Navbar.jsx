import React, { useState, useRef, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('currentUser');
  //   alert("Logged out successfully.");
  //   navigate('/login');
  // };

  const user = JSON.parse(localStorage.getItem('currentUser'));

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={()=> navigate('/')}>
        Smart Queue
        </div>

      <div ref={menuRef} className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/register" onClick={toggleMenu}>Register</Link>
        <Link to="/queue" onClick={toggleMenu}>Queue</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        <Link to="/login" onClick={toggleMenu} className="nav-btn">Login</Link>
      </div>

      <div ref={hamburgerRef} className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'rotate1' : ''}`}></div>
        <div className={`bar ${isOpen ? 'fade' : ''}`}></div>
        <div className={`bar ${isOpen ? 'rotate2' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
