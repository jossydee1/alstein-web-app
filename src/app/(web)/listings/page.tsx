import ListingsContent from "@/components/web/listings";
import { serverFetch } from "@/utils";
import React from "react";

const categories = await serverFetch(
  "/client/public/api/v1/equipments/get-equipment-category?skip=0&take=3",
);

const Page = () => {
  return <ListingsContent categories={categories} />;
};

export default Page;
