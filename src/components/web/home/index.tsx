import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Categories from "./Categories";
import Listings from "./Listings";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import { useQueryFetch } from "@/hooks";
import { ListingsProps } from "@/types";

const HomeContent = () => {
  const { data, isLoading, error } = useQueryFetch<ListingsProps[]>(
    "client/public/api/v1/equipments/get-equipments?skip=0&take=3",
  );

  console.log("data: ", data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
