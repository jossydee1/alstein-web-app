"use client";

import { withAuth } from "@/utils/auth/withAuth";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>This is the dashboard layout</h1>
      {children}
    </div>
  );
}

export default withAuth(DashboardLayout);
