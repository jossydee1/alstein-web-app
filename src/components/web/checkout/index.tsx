"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/common";
import { formatError, webRoutes } from "@/utils";
import { useClientFetch, useScrollToID } from "@/hooks";
import { ListingInfoProps } from "@/types";
import { useSearchParams } from "next/navigation";
import ListingDetailsSkeleton from "./Skeleton";
import ShippingAddress from "./ShippingAddress";
import OrderDetails from "./OrderDetails";
import { useAuth } from "@/context";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";

const CONTAINER_STYLES = {
  bg: "relative mb-16",
  pt: "section-container !pb-9 !pt-0",
};

export interface FormData {
  fullname: string;
  phone: string;
  countryCode: string;
  email: string;
  address: string;
}
const CheckoutContent = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const [error] = useState("");
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    phone: "",
    countryCode: "",
    email: "",
    address: "",
  });
  const [date, setDate] = useState<DateRange | undefined>();
  const [numberOfDays, setNumberOfDays] = useState<number>(0);

  useScrollToID(error, "error");

  useEffect(() => {
    if (startDate && endDate) {
      setDate({
        from: new Date(startDate),
        to: new Date(endDate),
      });
    }
  }, [startDate, endDate]);

  // set form data from user
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: `${user.first_name} ${user.last_name}`,
        phone: user.phone_number,
        countryCode: "",
        email: user.email,
        address: "",
      });
    }
  }, [user]);

  // set number of days
  useEffect(() => {
    if (date?.from && date?.to) {
      setNumberOfDays(differenceInDays(date.to, date.from));
    }
  }, [date]);

  // Get listing info
  const {
    data: listingInfo,
    isLoading,
    error: listingError,
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
      link: `${webRoutes.listings}/${id}`,
    },
    {
      title: "Checkout",
      link: "#",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // alert form data
    alert(JSON.stringify(e.target));
  };

  if (isLoading) return <ListingDetailsSkeleton />;

  if (listingError)
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

      <main className={CONTAINER_STYLES.pt}>
        <form
          className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <ShippingAddress formData={formData} setFormData={setFormData} />
          <OrderDetails
            listingInfo={listingInfo}
            numberOfDays={numberOfDays}
            setDate={setDate}
            date={date}
          />
        </form>
      </main>
    </div>
  );
};

export default CheckoutContent;
