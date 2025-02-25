import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Categories from "./Categories";
import Partners from "./Partners";
import Testimonials from "./Testimonials";

const HomeContent = () => {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Categories />
      <Partners />
      <Testimonials />
    </main>
  );
};

export default HomeContent;
