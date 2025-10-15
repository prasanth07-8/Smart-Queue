// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import "./Dashboard.css";

const socket = io("http://localhost:5000"); // ✅ match backend server

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch tokens (admin only)
  const fetchTokens = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/tokens");
      setTokens(res.data);
    } catch (err) {
      console.error("Error fetching tokens:", err);
      setError("Failed to fetch tokens");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update token status
  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/tokens/${id}`, { status });
      socket.emit("tokenUpdated"); // notify others
      fetchTokens();
    } catch (err) {
      console.error("Failed to update token:", err);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login"); // prevent normal user access
    } else {
      fetchTokens();
      socket.on("tokenUpdated", fetchTokens);
      return () => socket.off("tokenUpdated", fetchTokens);
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <p className="greeting">
        Welcome, <strong>{user?.name}</strong> 👨‍⚕️
      </p>

      {loading ? (
        <p>Loading tokens...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : tokens.length === 0 ? (
        <p className="info-msg">No tokens registered yet.</p>
      ) : (
        <div className="token-box">
          <table>
            <thead>
              <tr>
                <th>Token No</th>
                <th>Patient Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t) => (
                <tr key={t._id}>
                  <td>{t.tokenNumber}</td>
                  <td>{t.patientName}</td>
                  <td>{t.department}</td>
                  <td>{t.status || "Pending"}</td>
                  <td>
                    <button
                      className="btn serve"
                      onClick={() => updateStatus(t._id, "Served")}
                    >
                      Serve
                    </button>
                    <button
                      className="btn skip"
                      onClick={() => updateStatus(t._id, "Missed")}
                    >
                      Skip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bottom-nav">
        <button className="btn" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
