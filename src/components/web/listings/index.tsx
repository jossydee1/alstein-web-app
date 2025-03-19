"use client";

import React, { useEffect, useState } from "react";
import Listings from "./Listings";
import SearchForm from "./SearchForm";
import { CategoryProps, ListingsProps } from "@/types";
import { useClientFetch } from "@/hooks";
import { formatError } from "@/utils";

const ListingsContent = ({ categories }: { categories: CategoryProps[] }) => {
  const [filteredListings, setFilteredListings] = useState<ListingsProps[]>([]);

  const {
    data: listings,
    isLoading,
    error,
  } = useClientFetch<ListingsProps[]>(
    "/client/public/api/v1/equipments/get-equipments?skip=0&take=50",
  );

  useEffect(() => {
    setFilteredListings(listings || []);
  }, [listings]);

  return (
    <main>
      <SearchForm
        categories={categories}
        listings={listings || []}
        setFilteredListings={setFilteredListings}
      />
      <Listings
        listings={filteredListings}
        isLoading={isLoading}
        error={error ? formatError(error) : null}
      />
    </main>
  );
};

export default ListingsContent;
