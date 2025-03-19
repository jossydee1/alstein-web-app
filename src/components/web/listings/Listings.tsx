"use client";

import React from "react";
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
import { ListingsProps } from "@/types";
import { formatError } from "@/utils";
import { useClientFetch } from "@/hooks";

const Listings = () => {
  const PAGINATION_STYLES = {
    content: "flex justify-center gap-3",
    button: "rounded-sm  border-[0.5px] border-[#7B7485]",
    isActive: "bg-[#2C2C2C] border-[#303030] text-white",
  };

  const CONTAINER_STYLES = {
    bg: "bg-white",
    pt: "section-container md:pt-[40px] xl:py-[64px]",
  };

  const {
    data: listings,
    isLoading,
    error,
  } = useClientFetch<ListingsProps[]>(
    "/client/public/api/v1/equipments/get-equipments?skip=0&take=50",
  );

  if (isLoading)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <main className={CONTAINER_STYLES.pt}>
          <p>Loading...</p>
        </main>
      </div>
    );

  if (error)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <main className={CONTAINER_STYLES.pt}>
          <p>{formatError(error)}</p>
        </main>
      </div>
    );

  if (!listings || listings?.length === 0)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <main className={CONTAINER_STYLES.pt}>
          <p>No listings found</p>
        </main>
      </div>
    );

  return (
    <div className={CONTAINER_STYLES.bg}>
      <section className={CONTAINER_STYLES.pt}>
        <ListingsList listings={listings} />

        {listings?.length > 50 && (
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
        )}
      </section>
    </div>
  );
};

export default Listings;
