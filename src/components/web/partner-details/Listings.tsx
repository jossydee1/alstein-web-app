import React from "react";
import { ListingsList } from "@/components/common";
import { ListingsProps } from "@/types";

const PartnerListings = ({ listings }: { listings: unknown[] }) => {
  return (
    <section>
      <h2 className="font-500 mb-4 text-2xl">Listings</h2>
      <ListingsList listings={listings as ListingsProps[]} />
    </section>
  );
};

export default PartnerListings;
