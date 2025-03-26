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
  const { data: listings, isLoading } = useClientFetch<ListingsProps[]>(
    "/client/public/api/v1/equipments/get-equipments?skip=0&take=8",
  );

  const { data: partnersCount } = useClientFetch<{ count: number }>(
    "/client/public/api/v1/meta/get-total-partner",
  );
  const { data: bookingsCount } = useClientFetch<{ count: number }>(
    "/client/public/api/v1/booking/get-bookings-count",
  );

  return (
    <main>
      <Hero
        partnersCount={partnersCount?.count ?? 0}
        bookingsCount={bookingsCount?.count ?? 0}
      />
      <WhyUs />
      <Categories categories={categories} />
      <Listings listings={listings || []} isLoading={isLoading} />
      <Testimonials reviews={reviews} />
      <Partners />
    </main>
  );
};

export default HomeContent;
