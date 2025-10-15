import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ get logged-in user from context
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    department: "",
    symptoms: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Get email from context or localStorage fallback
    const userEmail = user?.email || JSON.parse(localStorage.getItem("user"))?.email;

    if (!userEmail) {
      setError("You must be logged in to register a token.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Attach logged-in user's email to token data
      const data = { ...formData, email: userEmail };

      const res = await API.post("/tokens/generate", data);
      console.log("Token created:", res.data);

      // Reset form
      setFormData({
        patientName: "",
        age: "",
        gender: "",
        department: "",
        symptoms: "",
      });

      // Navigate to queue
      navigate("/queue");
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Patient Registration</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="General">General</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="ENT">ENT</option>
          <option value="Dermatology">Dermatology</option>
        </select>
        <textarea
          name="symptoms"
          placeholder="Symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          required
        ></textarea>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register & Get Token"}
        </button>
      </form>
    </div>
  );
};

export default Register;
