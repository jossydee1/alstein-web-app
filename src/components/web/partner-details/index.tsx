"use client";

import React from "react";
import { Breadcrumbs } from "@/components/common";
import { formatError } from "@/utils";
import Profile from "./Profile";
import PartnerListings from "./Listings";
import Certifications from "./Certifications";
import { ListingsProps, PartnerProps } from "@/types";
import { useClientFetch } from "@/hooks";
import { useParams } from "next/navigation";
import ListingDetailsSkeleton from "../listing-details/Skeleton";

const PartnerDetailsContent = () => {
  const { id } = useParams();

  const {
    data: partnerData,
    isLoading: loadingPartner,
    error: errorPartner,
  } = useClientFetch<PartnerProps>({
    endpoint: `/partner/public/api/v1/get-partner?id=${id}`,
  });

  const {
    data: listingsData,
    isLoading: loadingListings,
    error: errorListings,
  } = useClientFetch<ListingsProps[]>({
    endpoint: `/client/public/api/v1/equipments/get-equipments?skip=0&take=50?partner_id=${id}`,
  });

  const { data: rating } = useClientFetch<{
    _avg: {
      score: number;
    };
  }>({
    endpoint: `partner/public/api/v1/ratings/get-average-rating?partner_id=${partnerData?.id}`,
  });

  const { data: reviews } = useClientFetch<{
    count: number;
  }>({
    endpoint: `/client/public/api/v1/meta/get-comments-count?partner_id=${partnerData?.id}`,
  });

  const links = [
    {
      title: "Partners",
      link: "#",
    },
    {
      title: partnerData?.type.toLocaleLowerCase() || "...",
      link: "#",
    },
    {
      title: partnerData?.name || "...",
      link: "#",
    },
  ];

  const CONTAINER_STYLES = {
    bg: "relative mb-16",
    pt: "section-container !pb-9 !pt-0",
  };

  if (loadingPartner || loadingListings) return <ListingDetailsSkeleton />;

  if (errorListings || errorPartner) {
    const error = errorListings || errorPartner;

    return (
      <div className={CONTAINER_STYLES.bg}>
        <Breadcrumbs links={links} />
        <main className={CONTAINER_STYLES.pt}>
          <p>{formatError(error)}</p>
        </main>
      </div>
    );
  }

  if (!partnerData || !partnerData?.id)
    return (
      <div className={CONTAINER_STYLES.bg}>
        <Breadcrumbs links={links} />
        <main className={CONTAINER_STYLES.pt}>
          <p>This partner does not exist</p>
        </main>
      </div>
    );

  return (
    <div className={CONTAINER_STYLES.bg}>
      <Breadcrumbs links={links} />

      <main className={CONTAINER_STYLES.pt}>
        <Profile
          partnerData={partnerData}
          rating={rating?._avg?.score || 0}
          reviews={reviews?.count || 0}
        />

        <hr className="my-[57px] border border-[#EBEBEB]" />

        <Certifications certs={partnerData?.partner_doc} />

        <hr className="my-[57px] border border-[#EBEBEB]" />

        <PartnerListings listings={listingsData || []} />
      </main>
    </div>
  );
};

export default PartnerDetailsContent;
