"use client";

import LaboratoryPageContent from "@/components/auth/partner-setup/vendor/Laboratory";
import ProfessionalPageContent from "@/components/auth/partner-setup/vendor/Professional";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("sub_type");

  return !type || type === "laboratory" ? (
    <LaboratoryPageContent />
  ) : (
    <ProfessionalPageContent />
  );
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
