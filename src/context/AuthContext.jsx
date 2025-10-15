import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // contains {name, email, token, role}
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Restore user from localStorage on page load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.token && storedUser?.role) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async ({ email, password, secretCode }) => {
    try {
      const res = await API.post("/auth/login", { email, password, secretCode });
      const { user: userData, role, token } = res.data;

      // Merge token and role into user object
      const userWithToken = { ...userData, token, role };

      localStorage.setItem("user", JSON.stringify(userWithToken));
      setUser(userWithToken);
      setIsAuthenticated(true);

      return { user: userWithToken, role };
    } catch (err) {
      throw new Error(err.response?.data?.message || "Invalid credentials");
    }
  };

  // SIGNUP
  const signup = async ({ name, email, password }) => {
    try {
      const res = await API.post("/auth/signup", { name, email, password });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
