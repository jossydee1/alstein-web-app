import CheckoutContent from "@/components/web/checkout";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alstein | Book Scientific and Diagnostic Laboratory Services",
  description:
    "Simplifying access to medical diagnostics and research tools. Find Laboratories, and Research Equipment Near You.",
  alternates: {
    canonical: "/",
  },
};

const Page = () => {
  return <CheckoutContent />;
};

export default Page;
