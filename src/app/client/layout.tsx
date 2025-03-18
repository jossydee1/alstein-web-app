"use client";

import Greetings from "@/components/common/Greetings";
import NavBar from "@/components/navigation/dashboard/NavBar";
import { withAuth } from "@/utils/auth/withAuth";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="bg-white">
        <div className="section-container-dashboard">
          <Greetings />
          {children}
        </div>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
