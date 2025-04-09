import PartnerSetupContent from "@/components/auth/partner-setup";
import React from "react";

const Page = () => {
  return <PartnerSetupContent />;
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
