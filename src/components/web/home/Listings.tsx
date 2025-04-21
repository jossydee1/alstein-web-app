"use client";

import React from "react";
import Link from "next/link";
import { webRoutes } from "@/utils";
import { ListingSkeleton, ListingsList } from "@/components/common";
import { ListingProps } from "@/types";

const Listings = ({
  listings,
  isLoading,
}: {
  listings: ListingProps[];
  isLoading: boolean;
}) => {
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

          {isLoading ? (
            <ListingSkeleton />
          ) : (
            <ListingsList listings={listings} />
          )}
        </div>

        {listings?.length > 0 && (
          <div className="mt-[64px] flex justify-center">
            <Link
              href={webRoutes?.listings || "#"}
              className="font-Groteskbold rounded-md bg-brandColor px-[74px] py-2.5 text-lg font-normal text-white hover:bg-brandColor/80"
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
