import PartnerSignupContent from "@/components/auth/PartnerSignup";
import React from "react";

const Page = () => {
  return <PartnerSignupContent />;
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
