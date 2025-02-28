import React from "react";
import Listings from "./Listings";
import SearchForm from "./SearchForm";

const ListingsContent = () => {
  return (
    <main>
      <SearchForm />
      <Listings />
    </main>
  );
};

export default ListingsContent;
