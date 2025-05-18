import PrivacyPageContent from "@/components/web/legalities/privacy";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alstein | Privacy Policy",
  description:
    "Simplifying access to medical diagnostics and research tools. Find Laboratories, and Research Equipment Near You.",
};

const Page = () => {
  return <PrivacyPageContent />;
};

export default Page;
