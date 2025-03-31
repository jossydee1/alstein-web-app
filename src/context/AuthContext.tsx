"use client";

import { UserDetailsProps } from "@/types/user";
import React, { createContext, useState, useEffect, useContext } from "react";

interface UserContextProps {
  id: string;
  token: string;
  user: UserDetailsProps;
}

interface AuthContextType {
  user: UserDetailsProps | null;
  userId: string | null;
  token: string | null;
  login: (user: UserContextProps) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextProps["user"] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("user");

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = (user: UserContextProps) => {
    setUserId(user.id);
    setUser(user.user);
    setToken(user.token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userToken", user.token);
    localStorage.setItem("user", JSON.stringify(user.user));
  };

  const logout = () => {
    setUserId(null);
    setUser(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
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
