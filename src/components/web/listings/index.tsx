import React from "react";
import Listings from "./Listings";
import SearchForm from "./SearchForm";
import { CategoryProps } from "@/types";

const ListingsContent = ({ categories }: { categories: CategoryProps[] }) => {
  return (
    <main>
      <SearchForm categories={categories} />
      <Listings />
    </main>
  );
};

export default ListingsContent;
