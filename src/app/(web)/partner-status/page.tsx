"use client";

import { LoadingState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { dashboardRoutes } from "@/utils";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { canAccessVendor, isProfileVerified, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingState />;
  }

  if (isProfileVerified && canAccessVendor) {
    return (
      <div className="m-8 h-screen space-y-4 text-center">
        <p>
          Your business profile is verified. You can now access the dashboard.
        </p>
        <Button asChild>
          <Link href={dashboardRoutes?.vendor_overview}>Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="m-8 h-screen space-y-4 text-center">
      <p>Your business profile is being verified. Please check back later.</p>
      <Button asChild>
        <Link href={dashboardRoutes?.client_order_history}>
          Go to Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default Page;
