import { authRoutes } from "@/utils";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      Go to <Link href={authRoutes.signup}>Signup</Link>
    </div>
  );
};

export default Page;
