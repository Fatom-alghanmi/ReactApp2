import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/checkAuth.php`,
          { withCredentials: true }
        );
        if (res.data.success) setUser(res.data.user);
        else setUser(null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/logout.php`,
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
