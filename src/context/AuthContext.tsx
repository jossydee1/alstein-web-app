"use client";

import { UserProfileProps } from "@/types/user";
import { PartnerProps } from "@/types";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { api, authRoutes, COOKIE_OPTIONS } from "@/utils";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";

interface UserContextProps {
  id: string;
  token: string;
  user: UserProfileProps;
}

interface AuthContextType {
  user: UserProfileProps | null;
  userId: string | null;
  token: string | null;
  businessProfile: PartnerProps | null;
  canAccessVendor: boolean;
  isProfileVerified: boolean;
  isAuthLoading: boolean;
  login: (user: UserContextProps) => Promise<void>;
  logout: () => void;
  setUser: (user: UserProfileProps) => void;
  setBusinessProfile: (profile: PartnerProps) => void;
  fetchBusinessProfiles: () => Promise<PartnerProps[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  // Auth state
  const [user, setUser] = useState<UserContextProps["user"] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [businessProfile, setBusinessProfile] = useState<PartnerProps | null>(
    null,
  );

  // Permission flags
  const [canAccessVendor, setCanAccessVendor] = useState<boolean>(false);
  const [isProfileVerified, setIsProfileVerified] = useState<boolean>(false);

  // Loading state
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      setIsAuthLoading(true);

      const storedUserId = Cookies.get("userId");
      const storedToken = Cookies.get("userToken");
      const storedUser = Cookies.get("user");
      const storedBusinessProfile = Cookies.get("businessProfile");

      if (storedUserId && storedToken) {
        setUserId(storedUserId);
        setToken(storedToken);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (storedBusinessProfile) {
          const profile = JSON.parse(storedBusinessProfile);
          setBusinessProfile(profile);
          setCanAccessVendor(!!profile);
          setIsProfileVerified(profile?.is_verified !== false);
        }
      }

      setIsAuthLoading(false);
    };

    initializeAuth();
  }, []);

  // Fetch business profiles
  const fetchBusinessProfiles = async (): Promise<PartnerProps[]> => {
    if (!token) {
      return [];
    }

    try {
      const response = await api.get(
        "/partner/api/v1/get-my-business-profiles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        return [];
      }

      const profiles = response?.data?.data || [];

      if (profiles.length > 0) {
        const firstProfile = profiles[0];
        setBusinessProfileHandler(firstProfile);
      }

      return profiles;
    } catch (error) {
      console.error("Error fetching business profiles:", error);
      return [];
    }
  };

  const login = async ({ id, token, user }: UserContextProps) => {
    setIsAuthLoading(true);

    setUserId(id);
    setUser(user);
    setToken(token);
    Cookies.set("userId", id, COOKIE_OPTIONS);
    Cookies.set("userToken", token, COOKIE_OPTIONS);
    Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);

    // Fetch business profiles immediately after login
    try {
      await fetchBusinessProfiles();
    } catch (error) {
      console.error("Error fetching business profiles after login:", error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUserId(null);
    setUser(null);
    setToken(null);
    setBusinessProfile(null);
    setCanAccessVendor(false);
    setIsProfileVerified(false);
    Cookies.remove("userId");
    Cookies.remove("userToken");
    Cookies.remove("user");
    Cookies.remove("businessProfile");
    signOut();
    router.push(authRoutes.login);
  }, [router]);

  // Check token expiration and log out user
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = Cookies.get("userToken");
      if (!token) {
        logout();
        return;
      }

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const tokenExpiry = tokenPayload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();

      if (currentTime >= tokenExpiry) {
        logout();
      }
    };

    const interval = setInterval(checkTokenExpiration, 60 * 1000); // Check every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [logout]);

  const setUserProfileHandler = (user: UserProfileProps) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
  };

  const setBusinessProfileHandler = (profile: PartnerProps) => {
    setBusinessProfile(profile);
    setCanAccessVendor(!!profile);
    setIsProfileVerified(profile?.is_verified !== false);
    Cookies.set("businessProfile", JSON.stringify(profile), COOKIE_OPTIONS);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        token,
        businessProfile,
        canAccessVendor,
        isProfileVerified,
        isAuthLoading,
        login,
        logout,
        setUser: setUserProfileHandler,
        setBusinessProfile: setBusinessProfileHandler,
        fetchBusinessProfiles,
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
