"use client";

import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Categories from "./Categories";
import Listings from "./Listings";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import { useClientFetch } from "@/hooks";
import { ListingsProps } from "@/types";

const HomeContent = () => {
  const {
    data: equipments,
    isLoading: equipmentsLoading,
    error: equipmentsError,
  } = useClientFetch<ListingsProps[]>(
    "client/public/api/v1/equipments/get-equipments?skip=0&take=8",
  );

  console.log("equipments: ", equipments);

  if (equipmentsLoading) return <p>Loading...</p>;
  if (equipmentsError) return <p>Error: {equipmentsError?.message}</p>;

  return (
    <main>
      <Hero />
      <WhyUs />
      <Categories />
      <Listings />
      <Testimonials />
      <Partners />
    </main>
  );
};

export default HomeContent;
