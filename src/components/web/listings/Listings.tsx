"use client";

import React from "react";
import { listingsData } from "@/database/listingsData";
import { ListingsList } from "@/components/common";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Listings = () => {
  const PAGINATION_STYLES = {
    content: "flex justify-center gap-3",
    button: "rounded-sm  border-[0.5px] border-[#7B7485]",
    isActive: "bg-[#2C2C2C] border-[#303030] text-white",
  };

  if (!listingsData) return null;

  return (
    <div className="bg-white">
      <section className="section-container md:pt-[40px] xl:py-[64px]">
        <ListingsList listings={listingsData} />

        <Pagination className="mt-[70px]">
          <PaginationContent className={PAGINATION_STYLES.content}>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={PAGINATION_STYLES.button}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className={`${PAGINATION_STYLES.button} ${PAGINATION_STYLES.isActive}`}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className={PAGINATION_STYLES.button}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className={PAGINATION_STYLES.button}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className={PAGINATION_STYLES.button} />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className={PAGINATION_STYLES.button} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default Listings;
