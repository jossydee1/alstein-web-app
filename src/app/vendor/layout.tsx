"use client";

import React, { ReactElement, JSXElementConstructor } from "react";
import { BreadcrumbItem } from "@/types";
import { withAuth } from "@/utils";
import {
  MobileNavigation,
  Navbar,
  Sidebar,
} from "@/components/navigation/dashboard/partner";

interface DashboardLayoutProps {
  title: string;
  children: ReactElement<
    unknown,
    string | JSXElementConstructor<React.ReactNode>
  >;

  breadcrumbs: BreadcrumbItem[];
}

const DashboardLayout = ({ children, breadcrumbs }: DashboardLayoutProps) => {
  return (
    <>
      <div className="min-h-svh bg-[#F8F9FC] dark:bg-neutral-900/80">
        <Navbar />
        <MobileNavigation breadcrumbs={breadcrumbs} />
        <Sidebar />

        {/* This is the main content area */}
        <div className="w-full lg:ps-64">
          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default withAuth(DashboardLayout);
