import React from "react";
import { ListingsList, ListingSkeleton } from "@/components/common";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ListingProps } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Listings = ({
  listings,
  isLoading,
  currentPage,
  totalPages,
  handlePageChange,
}: {
  itemsPerPage: number;
  listings: ListingProps[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) => {
  const PAGINATION_STYLES = {
    content: "flex justify-center gap-3",
    button: "rounded-sm p-1.5 border-[0.5px] border-[#7B7485]",
    isActive: "bg-[#2C2C2C] border-[#303030] text-white",
  };

  const CONTAINER_STYLES = {
    bg: "bg-white",
    pt: "section-container md:pt-[40px] xl:py-[64px]",
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              className={`${PAGINATION_STYLES.button} ${currentPage === i ? PAGINATION_STYLES.isActive : ""}`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }
    return items;
  };

  if (isLoading)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <main className={CONTAINER_STYLES.pt}>
          <ListingSkeleton />
        </main>
      </div>
    );

  if (!listings || listings?.length === 0)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <main className={CONTAINER_STYLES.pt}>
          <div className="rounded-md bg-red-50 p-4 text-red-500">
            <p>
              No listings found. Please check back later or try a different
              search.
            </p>
          </div>
        </main>
      </div>
    );

  return (
    <div className={CONTAINER_STYLES.bg}>
      <section className={CONTAINER_STYLES.pt}>
        <ListingsList listings={listings} />

        {totalPages > 1 && (
          <Pagination className="mt-[70px]">
            <PaginationContent className={PAGINATION_STYLES.content}>
              <PaginationItem
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                className={`${PAGINATION_STYLES.button} ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <ChevronLeft />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem
                className={`${PAGINATION_STYLES.button} ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
              >
                <ChevronRight />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </div>
  );
};

export default Listings;
