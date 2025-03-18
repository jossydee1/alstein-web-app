"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
interface AuthContextType {
  userId: string | null;
  token: string | null;
  login: (id: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load from local storage on initial render
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("userToken");

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  const login = (id: string, token: string) => {
    setUserId(id);
    setToken(token);
    localStorage.setItem("userId", id);
    localStorage.setItem("userToken", token);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
