import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import "./Queue.css";

const socket = io("http://localhost:5000");

const Queue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTokens = async () => {
    try {
      setLoading(true);
      setError("");

      let userTokens = [];

      if (user?.role === "admin") {
        const res = await API.get("/tokens");
        userTokens = res.data;
      } else if (user?.role === "user") {
        const res = await API.get("/tokens/my");
        userTokens = res.data;
      }

      setTokens(userTokens);
    } catch (err) {
      console.error("Error fetching tokens:", err);
      setError("Failed to fetch tokens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTokens();

      // ✅ Socket listeners
      socket.on("new-token", (token) => {
        if (user.role === "admin" || token.email === user.email) {
          setTokens((prev) => [...prev, token]);
        }
      });

      socket.on("update-token", (updatedToken) => {
        if (user.role === "admin" || updatedToken.email === user.email) {
          setTokens((prev) =>
            prev.map((t) => (t._id === updatedToken._id ? updatedToken : t))
          );
        }
      });

      socket.on("delete-token", (id) => {
        if (user.role === "admin") {
          setTokens((prev) => prev.filter((t) => t._id !== id));
        }
      });

      return () => {
        socket.off("new-token");
        socket.off("update-token");
        socket.off("delete-token");
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="queue-container">
      <h2>Token Status</h2>

      {user ? (
        <p className="greeting">
          Hello <strong>{user.name}</strong>! 👋
        </p>
      ) : (
        <p className="greeting">Welcome Guest! Please log in to view your token.</p>
      )}

      {loading ? (
        <p>Loading tokens...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : !user ? (
        <p className="info-msg">You need to log in to view your token.</p>
      ) : tokens.length === 0 ? (
        user.role === "user" ? (
          <p className="info-msg">
            You don’t have any tokens yet.{" "}
            <button onClick={() => navigate("/register")}>Register Now</button>
          </p>
        ) : (
          <p className="info-msg">No tokens in the queue yet.</p>
        )
      ) : (
        <div className="token-box">
          <table>
            <thead>
              <tr>
                <th>Token No</th>
                <th>Patient Name</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t) => (
                <tr key={t._id}>
                  <td>{t.tokenNumber}</td>
                  <td>{t.patientName}</td>
                  <td>{t.department}</td>
                  <td>{t.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Register New Token Button */}
          <div>
            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              ➕ Register a New Token
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queue;
