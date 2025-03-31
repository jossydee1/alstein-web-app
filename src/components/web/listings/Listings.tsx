import React from "react";
import { ListingsList, ListingSkeleton } from "@/components/common";
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

const Listings = ({
  listings,
  isLoading,
}: {
  listings: ListingsProps[];
  isLoading: boolean;
}) => {
  const PAGINATION_STYLES = {
    content: "flex justify-center gap-3",
    button: "rounded-sm  border-[0.5px] border-[#7B7485]",
    isActive: "bg-[#2C2C2C] border-[#303030] text-white",
  };

  const CONTAINER_STYLES = {
    bg: "bg-white",
    pt: "section-container md:pt-[40px] xl:py-[64px]",
  };

  if (isLoading)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <main className={CONTAINER_STYLES.pt}>
          <ListingSkeleton />
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
