import React from "react";
import { Breadcrumbs } from "@/components/common";
import Header from "./Header";
import Details from "./Details";
import Summary from "./Summary";
import Location from "./Location";
import Reviews from "./Reviews";
import { webRoutes } from "@/utils";

const ListingDetailsContent = () => {
  const links = [
    {
      title: "Listings",
      link: webRoutes.listings,
    },
    {
      title: "Testing Equipment",
      link: `${webRoutes.listings}?category=testing-equipment`,
    },
    {
      title: "Blood Sugar Analyzer",
      link: "#",
    },
  ];

  return (
    <div className="relative mb-16">
      <Breadcrumbs links={links} />

      <Header />
      <main className="section-container !pb-9 !pt-0">
        <div className="flex flex-col justify-between gap-7 lg:flex-row">
          <div className="w-full flex-1 lg:max-w-[540px]">
            <Details />
          </div>

          <div className="min-w-[340px] max-w-[340px]">
            <Summary />
          </div>
        </div>

        <Location />

        <Reviews />
      </main>
    </div>
  );
};

export default ListingDetailsContent;
