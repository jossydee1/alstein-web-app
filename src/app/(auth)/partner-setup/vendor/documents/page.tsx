import Documents from "@/components/auth/partner-setup/vendor/Documents";
import React from "react";

const Page = () => {
  return <Documents />;
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
