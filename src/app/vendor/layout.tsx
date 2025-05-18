"use client";

import React, { ReactElement, JSXElementConstructor } from "react";
import {
  MobileNavigation,
  Navbar,
  Sidebar,
} from "@/components/navigation/dashboard/partner";
import { useAuthGuard } from "@/hooks";

interface DashboardLayoutProps {
  children: ReactElement<
    unknown,
    string | JSXElementConstructor<React.ReactNode>
  >;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Require vendor access for this layout
  const { isAuthorized, LoadingComponent } = useAuthGuard(true);

  if (LoadingComponent) {
    return LoadingComponent;
  }

  if (!isAuthorized) {
    return null; // The guard will handle redirection
  }

  return (
    <>
      <div className="min-h-svh bg-[#fff] font-visbymedium antialiased">
        <Navbar />
        <MobileNavigation />
        <Sidebar />

        {/* This is the main content area */}
        <div className="w-full lg:ps-64">
          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
