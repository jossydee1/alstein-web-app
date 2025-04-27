"use client";
import React from "react";
import { ListingInfoProps } from "@/types";

const Details = ({ listingInfo }: { listingInfo: ListingInfoProps }) => {
  return (
    <article>
      <section className="description">
        <h2 className="font-500 mb-4 text-2xl">Equipment Specifications:</h2>
        <div className="text-[#343434]">
          <p>{listingInfo?.description}</p>
          <ul className="mt-4 list-inside list-disc">
            {listingInfo?.specifications.map(spec => (
              <li key={spec?.id}>{spec?.specification}</li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="my-[57px] border border-[#EBEBEB]" />

      <section>
        <h2 className="font-500 mb-4 text-2xl">Service Type</h2>
        <p className="w-fit rounded-md border border-[#676767] px-6 py-1.5 capitalize text-[#7A7A7A]">
          <span>{listingInfo?.service_type}</span>
        </p>
      </section>
    </article>
  );
};

export default Details;
