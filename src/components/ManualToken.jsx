import React, { useState } from "react";
import API from "../api"; // import Axios instance
import { useAuth } from "../context/AuthContext";
import "./ManualToken.css";

const ManualToken = ({ isOpen, onClose, onRefresh }) => {
  const { user } = useAuth(); // get logged-in user
  const [patientName, setPatientName] = useState("");
  const [department, setDepartment] = useState("");
  const [tokenNumber, setTokenNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Only admin can create manual token
      if (user.role !== "admin") {
        setError("Access denied. Admins only.");
        return;
      }

      const res = await API.post("/token/manual", {
        patientName,
        department,
        tokenNumber,
      });

      // Clear fields
      setPatientName("");
      setDepartment("");
      setTokenNumber("");
      onClose();

      // Refresh parent Queue list
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating token");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Manual Token Entry</h2>
        <form onSubmit={handleSubmit}>
          <label>Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />

          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />

          <label>Token Number</label>
          <input
            type="number"
            value={tokenNumber}
            onChange={(e) => setTokenNumber(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <div className="modal-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Create Token"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualToken;
