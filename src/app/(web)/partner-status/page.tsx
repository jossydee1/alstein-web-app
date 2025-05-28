"use client";

import { LoadingState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { dashboardRoutes, webRoutes } from "@/utils";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { canAccessVendor, isProfileVerified, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingState />;
  }

  if (isProfileVerified && canAccessVendor) {
    return (
      <div className="mx-auto mt-20 h-screen max-w-[480px] space-y-4 text-center">
        <p className="text-lg font-medium">
          Your business profile is verified. You can now{" "}
          <Link
            href={dashboardRoutes?.vendor_new_equipment}
            className="text-brandColor underline"
          >
            create your first listing
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 h-screen max-w-[480px] space-y-4 text-center">
      <p className="text-lg font-medium">
        Your business profile is being verified. Please check back in 48hrs.
      </p>
      <Button asChild>
        <Link href={webRoutes?.listings}>Explore Listings</Link>
      </Button>
    </div>
  );
};

export default Page;
