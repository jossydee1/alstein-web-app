"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/common";
import {
  formatError,
  getBaseURL,
  PAYSTACK_PUBLIC_TEST_KEY,
  webRoutes,
} from "@/utils";
import { useClientFetch } from "@/hooks";
import { ListingInfoProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import ListingDetailsSkeleton from "./Skeleton";
import ShippingAddress from "./ShippingAddress";
import { useAuth } from "@/context";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import dynamic from "next/dynamic";

const OrderDetails = dynamic(
  () => import("./OrderDetails"),
  { ssr: false }, // Prevents SSR
);

const CONTAINER_STYLES = {
  bg: "relative mb-16",
  pt: "section-container !pb-9 !pt-0",
};

export interface FormData {
  fullname: string;
  phone: string;
  email: string;
  address: string;
}
const CheckoutContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const baseUrl = getBaseURL();
  const redirectUrl = `${baseUrl}${webRoutes.confirmation}`;

  const { user } = useAuth();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const [error] = useState("");
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    phone: "",
    email: "",
    address: "",
  });
  const [date, setDate] = useState<DateRange | undefined>();
  const [numberOfDays, setNumberOfDays] = useState<number>(0);

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

  const costPerDay = listingInfo?.price || 0;
  const serviceFee = 0;
  const totalCost = costPerDay * numberOfDays + serviceFee;

  // paystack
  const publicKey = PAYSTACK_PUBLIC_TEST_KEY;

  const paystackProps = {
    email: formData.email,
    amount: 5000,
    channels: ["card"],
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: formData.fullname,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: formData.phone,
        },
        {
          display_name: "Address",
          variable_name: "address",
          value: formData.address,
        },
        {
          display_name: "Start Date",
          variable_name: "start_date",
          value: date?.from?.toLocaleDateString(),
        },
        {
          display_name: "End Date",
          variable_name: "end_date",
          value: date?.to?.toLocaleDateString(),
        },
        {
          display_name: "Listing ID",
          variable_name: "listing_id",
          value: listingInfo?.id,
        },
        {
          display_name: "Cost per day",
          variable_name: "cost_per_day",
          value: costPerDay,
        },
        {
          display_name: "Total Cost",
          variable_name: "total_cost",
          value: totalCost,
        },
        {
          display_name: "Number of Days",
          variable_name: "number_of_days",
          value: numberOfDays,
        },
      ],
    },
    publicKey,
    text: "Complete Booking",
    type: "button",
    onSuccess: (reference: { redirecturl: unknown }) => {
      router.push(
        `${redirectUrl}${reference.redirecturl}&listing_id=${listingInfo?.id}&cost_per_day=${costPerDay}&total_cost=${totalCost}&number_of_days=${numberOfDays}&start_date=${date?.from?.toLocaleDateString()}&end_date=${date?.to?.toLocaleDateString()}&fullname=${formData.fullname}&phone=${formData.phone}&email=${formData.email}&address=${formData.address}`,
      );
    },
  };

  // disable paystack button if no start and end date is selected, any formdata value is empty or total cost is 0
  const isPaystackDisabled =
    !date?.from ||
    !date?.to ||
    Object.values(formData).some(value => value === "") ||
    totalCost <= 0;

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
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
          <ShippingAddress formData={formData} setFormData={setFormData} />
          <OrderDetails
            listingInfo={listingInfo}
            numberOfDays={numberOfDays}
            setDate={setDate}
            date={date}
            costPerDay={costPerDay}
            serviceFee={serviceFee}
            totalCost={totalCost}
            paystackProps={paystackProps}
            isPaystackDisabled={isPaystackDisabled}
          />
        </div>
      </main>
    </div>
  );
};

export default CheckoutContent;
