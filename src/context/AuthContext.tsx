"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

interface UserProps {
  id: string;
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    profile_picture: string | null;
  };
}

interface AuthContextType {
  user: UserProps["user"] | null;
  userId: string | null;
  token: string | null;
  login: (user: UserProps) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps["user"] | null>(null);
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

  const login = (user: UserProps) => {
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
