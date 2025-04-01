import BusinessInfo from "@/components/auth/partner-setup/vendor/BusinessInfo";
import React from "react";

const Page = () => {
  return <BusinessInfo />;
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
