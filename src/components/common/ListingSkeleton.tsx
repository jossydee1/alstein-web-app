import React from "react";

export const ListingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(8)
        .fill(null)
        .map((_, index) => (
          <article
            key={index}
            className="group grid gap-2 overflow-hidden rounded-md bg-[#F5F5F5] p-3"
          >
            {/* Image skeleton */}
            <div className="relative aspect-square w-full animate-pulse rounded-md bg-gray-200" />

            {/* Content skeleton */}
            <div>
              {/* Title skeleton */}
              <div className="mb-1 h-5 w-3/4 animate-pulse rounded-md bg-gray-200" />

              {/* Description skeleton */}
              <div className="mb-1 h-3 w-full animate-pulse rounded-md bg-gray-200" />
              <div className="mb-1 h-3 w-full animate-pulse rounded-md bg-gray-200" />

              {/* Location skeleton */}
              <div className="mb-2 h-3 w-1/2 animate-pulse rounded-md bg-gray-200" />

              {/* Price skeleton */}
              <div className="mb-4 h-4 w-1/3 animate-pulse rounded-md bg-gray-200" />

              {/* Button skeleton */}
              <div className="h-8 w-28 animate-pulse rounded-md bg-gray-200" />
            </div>
          </article>
        ))}
    </div>
  );
};
