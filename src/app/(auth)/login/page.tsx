import LoginContent from "@/components/auth/Login";
import React from "react";

const Page = () => {
  return <LoginContent />;
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
