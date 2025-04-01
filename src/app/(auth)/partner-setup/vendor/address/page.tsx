import BusinessAddress from "@/components/auth/partner-setup/vendor/BusinessAddress";
import React from "react";

const Page = () => {
  return <BusinessAddress />;
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
