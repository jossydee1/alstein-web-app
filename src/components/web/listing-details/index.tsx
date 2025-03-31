"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/common";
import Header from "./Header";
import Details from "./Details";
import Summary from "./Summary";
import Location from "./Location";
import Reviews from "./Reviews";
import { formatError, webRoutes } from "@/utils";
import { useClientFetch } from "@/hooks";
import { ListingInfoProps, CommentProps, AverageRatingProps } from "@/types";
import { useParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import ListingDetailsSkeleton from "./Skeleton";

const ListingDetailsContent = () => {
  const { id } = useParams();
  const [date, setDate] = useState<DateRange | undefined>();
  const [numberOfDays, setNumberOfDays] = useState<number>(0);

  useEffect(() => {
    if (date?.from && date?.to) {
      setNumberOfDays(differenceInDays(date.to, date.from));
    }
  }, [date]);

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
    endpoint: `client/public/api/v1/equipments/get-equipment?equipment_id=${id}`,
  });

  // Get rating info
  const { data: rating, refetch: refetchRating } =
    useClientFetch<AverageRatingProps>({
      endpoint: `partner/public/api/v1/ratings/get-average-rating?partner_id=${listingInfo?.partner?.id}`,
    });

  const { data: comments, refetch: refetchComments } = useClientFetch<
    CommentProps[]
  >({
    endpoint: `partner/public/api/v1/comments/get-comments?skip=0&take=20&equipment_id=${listingInfo?.id}&partner_id=${listingInfo?.partner?.id}`,
  });

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
            <Details listingInfo={listingInfo} date={date} setDate={setDate} />
          </div>

          <div className="min-w-[340px] max-w-[340px]">
            <Summary
              listingInfo={listingInfo}
              date={date}
              setDate={setDate}
              numberOfDays={numberOfDays}
            />
          </div>
        </div>

        <Location listingInfo={listingInfo} />

        <Reviews
          partnerId={listingInfo.partner_id}
          listingId={listingInfo.id}
          averageRating={rating?._avg?.score || 0}
          comments={comments || []}
          refetchRating={refetchRating}
          refetchComments={refetchComments}
        />
      </main>
    </div>
  );
};

export default ListingDetailsContent;
