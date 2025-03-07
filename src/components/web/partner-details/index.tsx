import React from "react";
import { Breadcrumbs } from "@/components/common";
import { webRoutes } from "@/utils";
import Profile from "./Profile";
import PartnerListings from "./Listings";
import { listingsData } from "@/database/listingsData";
import Certifications from "./Certifications";
import { certsData } from "@/database/certsData";

const PartnerDetailsContent = () => {
  const links = [
    {
      title: "Partners",
      link: webRoutes.partners,
    },
    {
      title: "Laboratory",
      link: `${webRoutes.partners}?category=laboratory`,
    },
    {
      title: "HealthPro Labs",
      link: "#",
    },
  ];

  return (
    <div className="relative mb-16">
      <Breadcrumbs links={links} />

      <main className="section-container !pb-9 !pt-0">
        <Profile />

        <hr className="my-[57px] border border-[#EBEBEB]" />

        <Certifications certs={certsData} />

        <hr className="my-[57px] border border-[#EBEBEB]" />

        <PartnerListings listings={listingsData.slice(0, 5)} />
      </main>
    </div>
  );
};

export default PartnerDetailsContent;
