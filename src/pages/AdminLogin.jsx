import React, { useState, useEffect } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secretCode: "",
  });

  const [error, setError] = useState("");
  const [showSecretField, setShowSecretField] = useState(false);

  // 👇 check if this user might be admin (to show secretCode field)
  useEffect(() => {
    const checkAdmin = async () => {
      if (formData.name && formData.email && formData.password) {
        try {
          const res = await API.post("/auth/check-admin", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          setShowSecretField(res.data.isAdmin);
        } catch {
          setShowSecretField(false);
        }
      } else {
        setShowSecretField(false);
      }
    };

    checkAdmin();
  }, [formData.name, formData.email, formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ call the context login only once
      const { role } = await login(formData);

      if (role === "admin") navigate("/dashboard");
      else navigate("/register");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {showSecretField && (
          <input
            type="password"
            name="secretCode"
            placeholder="Secret Code"
            value={formData.secretCode}
            onChange={handleChange}
            required
          />
        )}

        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <div className="signup">
        <p className="msg">Don't have an account?</p>
        <a href="/signup" className="signup-link">
          Signup
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
