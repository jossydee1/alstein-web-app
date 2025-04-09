"use client";

import LaboratoryPageContent from "@/components/auth/partner-setup/vendor/Laboratory";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return type === "laboratory" ? (
    <LaboratoryPageContent />
  ) : (
    "Professional Page Content"
  );
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
