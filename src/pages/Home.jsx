// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaMobileAlt, FaUserMd } from "react-icons/fa";
// import homebg from "../public/image.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smart Queue Management System</h1>
          <p>Save time, avoid long queues, and manage your hospital visits effortlessly.</p>
          <button onClick={() => navigate("/register")} className="hero-btn">
            Get Your Token
          </button>
        </div>
        {/* Optional Illustration */}
        <div className="hero-image">
          <img src="/public/image.png" alt="Queue Illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaClock size={40} color="#0077b6" />
            <h3>Save Time</h3>
            <p>Book your token online and skip waiting in long queues.</p>
          </div>
          <div className="feature-card">
            <FaMobileAlt size={40} color="#0077b6" />
            <h3>Anytime Access</h3>
            <p>Check your token status and live queue from your mobile.</p>
          </div>
          <div className="feature-card">
            <FaUserMd size={40} color="#0077b6" />
            <h3>Efficient Service</h3>
            <p>Our system helps hospitals manage patients quickly and efficiently.</p>
          </div>
        </div>
      </section>

      {/* Optional: Queue Illustration Section */}
      <section className="queue-preview">
        <img src="/Queue_preview.png" alt="Queue Preview" />
        <p>View live queue updates and track your token status in real-time.</p>
      </section>
    </div>
  );
};

export default Home;
