import React from "react";
import { ListingsList } from "@/components/common";
import { ListingProps } from "@/types";

const PartnerListings = ({
  listings,
  refetch,
}: {
  listings: ListingProps[];
  refetch: () => void;
}) => {
  return (
    <section>
      <h2 className="font-500 mb-4 text-2xl">Listings</h2>
      <ListingsList listings={listings} refetch={refetch} />
    </section>
  );
};

export default PartnerListings;
