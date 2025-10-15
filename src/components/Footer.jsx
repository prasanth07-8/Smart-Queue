import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Smart Queue System. All rights reserved.</p>
      <div className="footer-links">
        <p onClick={()=> navigate('/contact')}>Contact</p>
        <p onClick={()=> navigate('/about')}>About</p>
        <p onClick={()=> navigate('/admin')}>Admin</p>
      </div>
    </footer>
  );
};

export default Footer;
