import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ListingDetailsSkeleton = () => {
  return (
    <div className="section-container !pb-9 !pt-0">
      {/* Breadcrumbs Skeleton */}
      <div className="container mx-auto mb-4 flex items-center gap-2 py-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Header Skeleton */}
      <div className="bg-white">
        <div className="container mx-auto pb-9">
          <div className="mb-[22px] flex flex-wrap items-center justify-between">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-8 w-32" />
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

      {/* Main Content Skeleton */}
      <main className="container mx-auto pb-9">
        <div className="flex flex-col justify-between gap-7 lg:flex-row">
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

              {/* Business Section Skeleton */}
              <section className="mt-16 flex items-center justify-between gap-4 rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-[65px] w-[65px] rounded-full" />
                  <div>
                    <Skeleton className="mb-2 h-6 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </section>

              <Skeleton className="my-[57px] h-[1px] w-full" />

              {/* Service Type Skeleton */}
              <section>
                <Skeleton className="mb-4 h-7 w-32" />
                <Skeleton className="h-8 w-32 rounded-md" />
              </section>

              <Skeleton className="my-[57px] h-[1px] w-full" />

              {/* Calendar Skeleton */}
              <section className="mb-[57px]">
                <Skeleton className="mb-4 h-7 w-48" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="mb-4 h-4 w-48" />
                  <Skeleton className="h-[300px] w-full max-w-[480px] rounded-md" />
                </div>
              </section>
            </article>
          </div>

          {/* Summary Section Skeleton */}
          <div className="min-w-[340px] max-w-[340px]">
            <section className="sticky top-40 grid gap-6 rounded-md border border-[#DEDEDE] bg-[#F9F9F9] p-6">
              <Skeleton className="h-6 w-32" />

              <div className="flex w-full">
                <Skeleton className="h-16 w-full rounded-l-md" />
                <Skeleton className="h-16 w-full rounded-r-md" />
              </div>

              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="mx-auto h-4 w-40" />

              <div className="mt-10 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>

                <Skeleton className="my-6 h-[1px] w-full" />

                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </section>
          </div>
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

            <div className="mt-16 w-full max-w-[480px] gap-4 rounded-md border border-[#E6E7EA] p-4 lg:mt-0">
              <Skeleton className="mb-4 h-6 w-40" />

              <div className="mb-4">
                <Skeleton className="mb-2 h-4 w-48" />
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-6" />
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="mb-2 h-4 w-36" />
                <Skeleton className="h-[160px] w-full rounded-md" />
              </div>

              <div className="mt-4 flex gap-4">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetailsSkeleton;
