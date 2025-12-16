import { createContext, useContext, useState, useEffect } from "react";
import { fetchClient, setAuthToken, removeAuthToken } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const res = await fetchClient('/users/profile'); //
      if (res && (res.username || res.data?.username)) {
          setUser(res.data || res);
          setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      removeAuthToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        await fetchUserProfile();
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetchClient('/users/login', {
        method: 'POST',
        data: { username, password }
      });
      
      const token = res.token || res.accessToken;
      if (token) {
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        await fetchUserProfile();
        return { success: true };
      }
      return { success: false, message: "No token received" };
    } catch (error) {
      return { success: false, message: error.message || "Login failed" };
    }
  };

  const register = async (userData) => {
    try {
      await fetchClient('/users/register', {
        method: 'POST',
        data: userData
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || "Registration failed" };
    }
  };

  const logout = async () => {
    try {
        await fetchClient('/users/logout', { method: 'POST' });
    } catch (error) { console.warn("Logout failed", error); } 
    finally {
        removeAuthToken();
        localStorage.removeItem('authToken');
        setUser(null);
        setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);