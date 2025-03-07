import SignupContent from "@/components/auth/Signup";
import React from "react";

const Page = () => {
  return <SignupContent />;
};

export default Page;

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <div>{page}</div>;
};
