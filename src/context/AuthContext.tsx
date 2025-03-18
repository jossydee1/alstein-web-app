"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: UserProps | null;
  userId: string | null;
  token: string | null;
  login: (id: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
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
    setUser(user);
    setToken(token);
    localStorage.setItem("userId", id);
    localStorage.setItem("userToken", token);
  };

  const logout = () => {
    setUserId(null);
    setUser(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, userId, token, login, logout }}>
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
