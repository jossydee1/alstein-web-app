import React from "react";
import { Metadata } from "next";
import SampleForm from "@/components/web/checkout/SampleForm";

export const metadata: Metadata = {
  title: "Alstein | Terms of Service",
  description:
    "Simplifying access to medical diagnostics and research tools. Find Laboratories, and Research Equipment Near You.",
};

const Page = () => {
  return <SampleForm />;
};

export default Page;
