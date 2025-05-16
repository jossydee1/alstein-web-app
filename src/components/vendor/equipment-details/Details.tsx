"use client";
import React from "react";
import { ListingInfoProps } from "@/types";

const Details = ({ listingInfo }: { listingInfo: ListingInfoProps }) => {
  return (
    <article>
      <section className="description">
        <div className="mb-4 space-y-2">
          <h2 className="font-500 text-2xl">Description:</h2>
          <p>{listingInfo?.description}</p>
        </div>

        <div className="mb-4 space-y-2">
          <h2 className="font-500 text-2xl">Category:</h2>
          <p className="mb-4 space-y-2"></p>
        </div>

        <div className="mb-4 space-y-2">
          <h2 className="font-500 text-2xl">Specifications:</h2>
          <ul className="list-inside list-disc">
            <li>Brand: {listingInfo?.brand || "N/A"}</li>
            {listingInfo?.specifications.map(spec => (
              <li key={spec?.id}>{spec?.specification}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4 space-y-2">
          <h2 className="font-500 text-2xl">Service And Billing Type</h2>
          <div className="flex flex-wrap gap-4">
            <p className="w-fit rounded-md border border-[#676767] px-6 py-1.5 capitalize text-[#7A7A7A]">
              <span>{listingInfo?.service_type?.replace(/_/g, " ")}</span>
            </p>
            <p className="w-fit rounded-md border border-[#676767] px-6 py-1.5 capitalize text-[#7A7A7A]">
              <span>Billed {listingInfo?.bill_type?.replace(/_/g, " ")}</span>
            </p>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <h2 className="font-500 text-2xl">Location & Direction</h2>
          <div className="flex flex-wrap gap-4">
            <p className="text-[#7A7A7A]] mb-4 space-y-2">
              {listingInfo?.city}, {listingInfo?.country}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Details;
