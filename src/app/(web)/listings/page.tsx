import ListingsContent from "@/components/web/listings";
import { serverFetch } from "@/utils";
import React from "react";

const categories = await serverFetch(
  "/client/public/api/v1/equipments/get-equipment-category",
);

const Page = () => {
  return <ListingsContent categories={categories} />;
};

export default Page;
