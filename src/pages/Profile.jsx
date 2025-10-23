import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tokenHistory, setTokenHistory] = useState([]);
  const [medicineSheet, setMedicineSheet] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // ✅ Example data — you can later fetch from backend
    setTokenHistory([
      { date: "2025-10-21", status: "Served", token: "A102" },
      { date: "2025-10-20", status: "Missed", token: "B215" },
      { date: "2025-10-18", status: "Applied", token: "C305" },
    ]);

    setMedicineSheet([
      { name: "Paracetamol", dosage: "500mg", time: "Morning" },
      { name: "Amoxicillin", dosage: "250mg", time: "Evening" },
    ]);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-info">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <div className="section">
        <h3>Token History</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Token</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tokenHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.token}</td>
                <td
                  className={
                    item.status === "Served"
                      ? "served"
                      : item.status === "Missed"
                      ? "missed"
                      : "applied"
                  }
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Hospital Medicine Sheet</h3>
        <ul>
          {medicineSheet.map((med, i) => (
            <li key={i}>
              {med.name} – {med.dosage} ({med.time})
            </li>
          ))}
        </ul>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
