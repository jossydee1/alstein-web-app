import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ListingDetailsSkeleton = () => {
  return (
    <main className="space-y-9">
      {/* Header Skeleton */}
      <div className="bg-white">
        <div className="container mx-auto pb-9">
          <div className="mb-[22px] flex flex-wrap items-center justify-between">
            <Skeleton className="h-8 w-64" />
          </div>

          {/* Image Gallery Skeleton */}
          <div className="hidden gap-3 md:grid md:grid-cols-4">
            <Skeleton className="h-[400px] w-full md:col-span-2 md:row-span-2" />
            <Skeleton className="h-[195px] w-full" />
            <Skeleton className="h-[195px] w-full" />
            <Skeleton className="h-[195px] w-full" />
            <Skeleton className="h-[195px] w-full" />
          </div>

          <div className="md:hidden">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>

      {/* Details Section Skeleton */}
      <div className="w-full flex-1 lg:max-w-[540px]">
        <article>
          {/* Description Skeleton */}
          <section className="description">
            <Skeleton className="mb-4 h-7 w-64" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-3/4" />

            <div className="mt-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="mt-2 flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ))}
            </div>
          </section>

          {/* Service Type Skeleton */}
          <section>
            <Skeleton className="my-4 h-7 w-32" />
          </section>

          <Skeleton className="my-[57px] h-[1px] w-full" />
        </article>
      </div>

      {/* Location Section Skeleton */}
      <div className="my-16">
        <Skeleton className="mb-4 h-7 w-32" />
        <Skeleton className="h-[300px] w-full rounded-md" />
      </div>

      {/* Reviews Section Skeleton */}
      <div>
        <Skeleton className="my-6 h-[1px] w-full" />

        <div className="text-center">
          <Skeleton className="mx-auto mb-3 h-7 w-40" />
          <div className="mb-[62px] flex items-center justify-center gap-2">
            <Skeleton className="h-[54px] w-[54px]" />
            <Skeleton className="h-12 w-8" />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
          <div>
            <div className="grid w-full max-w-[580px] gap-8 lg:gap-16">
              {[1, 2].map((_, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-[58px] w-[58px] rounded-md" />
                    <div>
                      <Skeleton className="mb-1 h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-4/5" />
                </div>
              ))}
            </div>

            <Skeleton className="mt-8 h-10 w-40" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ListingDetailsSkeleton;
