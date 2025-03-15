"use client";

import React from "react";
import Link from "next/link";
import { webRoutes } from "@/utils";
import { ListingsList } from "@/components/common";
import { ListingsProps } from "@/types";

const Listings = ({ listings }: { listings: ListingsProps[] }) => {
  return (
    <div className="bg-white">
      <section className="section-container">
        <div>
          <div className="mb-8">
            <div className="mb-2.5 flex items-center justify-center gap-2.5 text-brandColor">
              <hr className="w-[22px] border-2 border-brandColor" />
              <span className="text-lg font-medium uppercase">
                Trusted Partners
              </span>
            </div>
            <h2 className="text-center text-[40px] font-normal leading-[48px]">
              Find the Right Equipment & Service for Your Needs
            </h2>
          </div>

          {listings.length > 0 ? (
            <ListingsList listings={listings} />
          ) : (
            <p>No listings found</p>
          )}
        </div>

        {listings.length > 0 && (
          <div className="mt-[64px] flex justify-center">
            <Link
              href={webRoutes.listings || "#"}
              className="h-auto rounded-md bg-brandColor px-[74px] py-4 font-Groteskbold text-lg font-normal text-white"
            >
              View All
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Listings;
