import TermsPageContent from "@/components/web/legalities/terms";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alstein | Terms of Service",
  description:
    "Simplifying access to medical diagnostics and research tools. Find Laboratories, and Research Equipment Near You.",
};

const Page = () => {
  return <TermsPageContent />;
};

export default Page;
