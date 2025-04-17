"use client";

import { UserDetailsProps } from "@/types/user";
import { PartnerProps } from "@/types";
import { useRouter } from "next/navigation";
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
  businessProfile: PartnerProps | null;
  login: (user: UserContextProps) => void;
  logout: () => void;
  setBusinessProfile: (profile: PartnerProps) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserContextProps["user"] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [businessProfile, setBusinessProfile] = useState<PartnerProps | null>(
    null,
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("user");
    const storedBusinessProfile = localStorage.getItem("businessProfile");

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedBusinessProfile) {
        setBusinessProfile(JSON.parse(storedBusinessProfile));
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
    setBusinessProfile(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.removeItem("businessProfile");
    router.push("/login");
  };

  const setBusinessProfileHandler = (profile: PartnerProps) => {
    setBusinessProfile(profile);
    localStorage.setItem("businessProfile", JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        token,
        businessProfile,
        login,
        logout,
        setBusinessProfile: setBusinessProfileHandler,
      }}
    >
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
