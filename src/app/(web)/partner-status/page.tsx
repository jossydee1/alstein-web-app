import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/utils";
import Link from "next/link";
import React from "react";

const Page = () => {
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
