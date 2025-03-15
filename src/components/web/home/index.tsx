"use client";

import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Categories from "./Categories";
import Listings from "./Listings";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import { useClientFetch } from "@/hooks";
import { CategoryProps, ListingsProps } from "@/types";

const HomeContent = ({ categories }: { categories: CategoryProps[] }) => {
  const {
    data: listings,
    isLoading: listingsLoading,
    error: listingsError,
  } = useClientFetch<ListingsProps[]>(
    "/client/public/api/v1/equipments/get-equipments?skip=0&take=8",
  );

  if (listingsLoading) return <p>Loading...</p>;
  if (listingsError) return <p>Error: {listingsError?.message}</p>;

  return (
    <main>
      <Hero />
      <WhyUs />
      <Categories categories={categories} />
      <Listings listings={listings || []} />
      <Testimonials />
      <Partners />
    </main>
  );
};

export default HomeContent;
