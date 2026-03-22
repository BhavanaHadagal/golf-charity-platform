import { createContext, useContext, useEffect, useMemo, useState } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

  const fetchCurrentUser = async () => {
    try {
      const res = await API.get("/user/me");
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.log("Fetch current user error:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }
    fetchCurrentUser();
  }, [token]);

  const login = (newToken, userData = null) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    if (userData) {
      setUser(userData);
      setLoading(false);
    }
  };

  const register = (newToken, userData = null) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    if (userData) {
      setUser(userData);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      setUser,
      refreshUser: fetchCurrentUser,
    }),
    [user, token, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}