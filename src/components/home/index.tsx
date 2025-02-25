import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Categories from "./Categories";
import Listings from "./Listings";
import Testimonials from "./Testimonials";
import Partners from "./Partners";

const HomeContent = () => {
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
