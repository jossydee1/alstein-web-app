"use client";

import React from "react";
import { Breadcrumbs } from "@/components/common";
import Header from "./Header";
import Details from "./Details";
import Summary from "./Summary";
import Location from "./Location";
import Reviews from "./Reviews";
import { formatError, webRoutes } from "@/utils";
import { useClientFetch } from "@/hooks";
import { ListingInfoProps } from "@/types";
import { useParams } from "next/navigation";

const ListingDetailsContent = () => {
  const { id } = useParams();

  const CONTAINER_STYLES = {
    bg: "relative mb-16",
    pt: "section-container !pb-9 !pt-0",
  };

  const {
    data: listingInfo,
    isLoading,
    error,
  } = useClientFetch<ListingInfoProps>(
    `client/public/api/v1/equipments/get-equipment?equipment_id=${id}`,
  );

  const links = [
    {
      title: "Listings",
      link: webRoutes.listings,
    },
    {
      title: listingInfo?.category?.title || "...",
      link:
        `${webRoutes.listings}?category=${listingInfo?.category?.title_slug}` ||
        "",
    },
    {
      title: listingInfo?.name || "...",
      link: "#",
    },
  ];

  if (isLoading)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <Breadcrumbs links={links} />
        <main className={CONTAINER_STYLES.pt}>
          <p>Loading...</p>
        </main>
      </div>
    );

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
            <Details listingInfo={listingInfo} />
          </div>

          <div className="min-w-[340px] max-w-[340px]">
            <Summary listingInfo={listingInfo} />
          </div>
        </div>

        <Location listingInfo={listingInfo} />

        <Reviews partnerId={listingInfo.partner_id} />
      </main>
    </div>
  );
};

export default ListingDetailsContent;
