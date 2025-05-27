"use client";

import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Categories from "./Categories";
import Listings from "./Listings";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import { useClientFetch } from "@/hooks";
import {
  CategoryProps,
  CountProps,
  ListingHistoryProps,
  ReviewProps,
} from "@/types";

const HomeContent = () => {
  const {
    data: listings,
    isLoading,
    refetch,
  } = useClientFetch<ListingHistoryProps>({
    endpoint: "/client/public/api/v1/equipments/get-equipments?skip=0&take=8",
  });

  const { data: partnersCount } = useClientFetch<CountProps>({
    endpoint: "/client/public/api/v1/meta/get-total-partner",
  });

  const { data: bookingsCount } = useClientFetch<CountProps>({
    endpoint: "/client/public/api/v1/booking/get-bookings-count",
  });

  const { data: categories } = useClientFetch<CategoryProps[]>({
    endpoint:
      "/client/public/api/v1/equipments/get-equipment-category?skip=0&take=4",
  });

  const { data: reviews } = useClientFetch<ReviewProps[]>({
    endpoint: "/client/public/api/v1/reviews/get-reviews?skip=0&take=6",
  });

  return (
    <main>
      <Hero
        partnersCount={partnersCount?.count ?? 0}
        bookingsCount={bookingsCount?.count ?? 0}
      />
      <WhyUs />
      <Categories categories={categories || []} />
      <Listings
        listings={listings?.data || []}
        isLoading={isLoading}
        refetch={refetch}
      />
      <Testimonials reviews={reviews || []} />
      <Partners />
    </main>
  );
};

export default HomeContent;
