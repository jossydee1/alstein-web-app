"use client";

import React from "react";
import { Breadcrumbs, Reviews } from "@/components/common";
import Header from "./Header";
import Details from "./Details";
import Summary from "./Summary";
import Location from "./Location";
import { formatError, webRoutes } from "@/utils";
import { useClientFetch } from "@/hooks";
import { AverageRatingProps, ListingInfoProps } from "@/types";
import { useParams } from "next/navigation";
import ListingDetailsSkeleton from "./Skeleton";

const ListingDetailsContent = () => {
  const { id } = useParams();

  const CONTAINER_STYLES = {
    bg: "relative mb-16",
    pt: "section-container !pb-9 !pt-0",
  };

  // Get listing info
  const {
    data: listingInfo,
    isLoading,
    error,
  } = useClientFetch<ListingInfoProps>({
    endpoint: `/client/public/api/v1/equipments/get-equipment?equipment_id=${id}`,
    enabled: !!id,
  });

  // Get rating info
  const { data: rating, refetch: refetchRating } =
    useClientFetch<AverageRatingProps>({
      endpoint: `/partner/public/api/v1/ratings/get-average-rating?partner_id=${listingInfo?.partner?.id}`,
      enabled: !!listingInfo?.partner?.id,
    });

  // Get partner approved listing count
  const { data: listingCount } = useClientFetch<{
    total_approved_listing: number;
  }>({
    endpoint: `/client/public/api/v1/equipments/get-partner-approved-listing?partner_id=${listingInfo?.partner?.id}`,
    enabled: !!listingInfo?.partner?.id,
  });

  const links = [
    {
      title: "Listings",
      link: webRoutes?.listings,
    },
    {
      title: listingInfo?.category?.title || "...",
      link:
        `${webRoutes?.listings}?category=${listingInfo?.category?.title_slug}` ||
        "",
    },
    {
      title: listingInfo?.name || "...",
      link: "#",
    },
  ];

  if (isLoading) return <ListingDetailsSkeleton />;

  if (error)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <Breadcrumbs links={links} />
        <main className={CONTAINER_STYLES.pt}>
          <p>{formatError(error)}</p>
        </main>
      </div>
    );

  if (!listingInfo || !listingInfo?.id)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <Breadcrumbs links={links} />
        <main className={CONTAINER_STYLES.pt}>
          <p>This listing does not exist</p>
        </main>
      </div>
    );

  return (
    <div className={CONTAINER_STYLES.bg}>
      <Breadcrumbs links={links} />

      <Header listingInfo={listingInfo} />
      <main className={CONTAINER_STYLES.pt}>
        <div className="flex flex-col justify-between gap-7 lg:flex-row">
          <div className="w-full flex-1 lg:max-w-[540px]">
            <Details
              listingInfo={listingInfo}
              listingCount={listingCount?.total_approved_listing || 0}
            />
          </div>

          <div className="max-w-[340px] sm:min-w-[340px]">
            <Summary listingInfo={listingInfo} />
          </div>
        </div>

        <Location listingInfo={listingInfo} />

        <Reviews
          partnerId={listingInfo?.partner_id}
          listingId={listingInfo?.id}
          averageRating={rating?._avg?.score || 0}
          refetchRating={refetchRating}
        />
      </main>
    </div>
  );
};

export default ListingDetailsContent;
