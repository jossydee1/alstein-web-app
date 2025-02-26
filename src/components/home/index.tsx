import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Categories from "./Categories";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Partners from "./Partners";

const HomeContent = () => {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Categories />
      <Services />
      <Testimonials />
      <Partners />
    </main>
  );
};

export default HomeContent;
