"use client";

import NavBar from "@/components/navigation/dashboard/NavBar";
import { withAuth } from "@/utils/auth/withAuth";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}

export default withAuth(DashboardLayout);
