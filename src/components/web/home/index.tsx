"use client";

import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Categories from "./Categories";
import Listings from "./Listings";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import { useClientFetch } from "@/hooks";
import { CategoryProps, ListingsProps, ReviewProps } from "@/types";

const HomeContent = ({
  categories,
  reviews,
}: {
  categories: CategoryProps[];
  reviews: ReviewProps[];
}) => {
  const { data: listings } = useClientFetch<ListingsProps[]>(
    "/client/public/api/v1/equipments/get-equipments?skip=0&take=8",
  );

  return (
    <main>
      <Hero />
      <WhyUs />
      <Categories categories={categories} />
      <Listings listings={listings || []} />
      <Testimonials reviews={reviews} />
      <Partners />
    </main>
  );
};

export default HomeContent;
