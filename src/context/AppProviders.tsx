import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { DateTimeProvider } from "./DateTimeContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <DateTimeProvider>{children}</DateTimeProvider>
    </AuthProvider>
  );
};
