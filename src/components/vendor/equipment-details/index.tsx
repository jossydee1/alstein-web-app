"use client";

import React from "react";
import { Reviews } from "./Reviews";
import Header from "./Header";
import Details from "./Details";
import Location from "./Location";
import { formatError } from "@/utils";
import { useClientFetch } from "@/hooks";
import { AverageRatingProps, ListingInfoProps } from "@/types";
import { useParams } from "next/navigation";
import ListingDetailsSkeleton from "./Skeleton";

const ViewEquipmentContent = () => {
  const { id } = useParams();

  // Get listing info
  const {
    data: listingInfo,
    isLoading,
    error,
  } = useClientFetch<ListingInfoProps>({
    endpoint: `/partner/api/v1/equipments/get-equipment?equipment_id=${id}`,
    enabled: !!id,
  });

  // Get rating info
  const { data: rating } = useClientFetch<AverageRatingProps>({
    endpoint: `/partner/public/api/v1/ratings/get-average-rating?partner_id=${listingInfo?.partner?.id}`,
    enabled: !!listingInfo?.partner?.id,
  });

  if (isLoading) return <ListingDetailsSkeleton />;

  if (error)
    return (
      <main>
        <p>{formatError(error)}</p>
      </main>
    );

  if (!listingInfo || !listingInfo?.id)
    return (
      <main>
        <p>This listing does not exist</p>
      </main>
    );

  return (
    <main className="space-y-9">
      <Header listingInfo={listingInfo} />
      <Details listingInfo={listingInfo} />

      <Location listingInfo={listingInfo} />

      <Reviews
        partnerId={listingInfo?.partner_id}
        listingId={listingInfo?.id || ""}
        averageRating={rating?._avg?.score || 0}
      />
    </main>
  );
};

export default ViewEquipmentContent;
