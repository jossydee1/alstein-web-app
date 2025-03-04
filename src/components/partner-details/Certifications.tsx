import React from "react";
import { ListingsList } from "../common";
import { ListingsProps } from "@/types";

const Certifications = ({ certs }: { certs: ListingsProps[] }) => {
  return (
    <section>
      <h2 className="font-500 mb-4 text-2xl">Certifications</h2>
      <ListingsList listings={certs} />
    </section>
  );
};

export default Certifications;
