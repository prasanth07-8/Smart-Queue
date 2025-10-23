import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // 🔐 Add this import
import RoleBasedRoute from './components/RoleBasedRoute';

import Home from './pages/Home';
import Register from './pages/Register';
import Queue from './pages/Queue';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import SignUp from './pages/signup';
import Profile from './pages/Profile';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* 🔐 Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
