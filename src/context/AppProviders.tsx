"use client";

import React, { ReactNode, useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import { DateTimeProvider } from "./DateTimeContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  // Clean up URL params if _rsc is present
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("_rsc=")
    ) {
      const cleanUrl = window.location.href.split("?")[0];
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);
  return (
    <AuthProvider>
      <DateTimeProvider>{children}</DateTimeProvider>
    </AuthProvider>
  );
};
