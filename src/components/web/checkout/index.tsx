"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs, LoadingState } from "@/components/common";
import {
  api,
  formatError,
  formatIOSToDate,
  PAYSTACK_PUBLIC_TEST_KEY,
  webRoutes,
} from "@/utils";
import { useClientFetch } from "@/hooks";
import { ApiResponseProps, ListingInfoProps } from "@/types";
import { useSearchParams } from "next/navigation";
import ListingDetailsSkeleton from "./Skeleton";
import ShippingAddress from "./ShippingAddress";
import { useAuth } from "@/context";
import dynamic from "next/dynamic";
import SuccessModal from "./SuccessModal";
import { useDateTime } from "@/context/DateTimeContext";
import { toast } from "react-toastify";

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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { date, numberOfDays, resetDateTime, fromTime, toTime } = useDateTime();

  const { user, token, userId } = useAuth();
  const [error] = useState("");
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    phone: "",
    email: "",
    address: "",
  });

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

  // Get listing info
  const {
    data: listingInfo,
    isLoading,
    error: listingError,
  } = useClientFetch<ListingInfoProps>({
    endpoint: `/client/public/api/v1/equipments/get-equipment?equipment_id=${id}`,
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

  const handlePaymentSuccess = async () => {
    setIsBooking(true);
    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/client/api/v1/booking/initiate-booking",
        {
          equipment_id: id,
          partner_id: listingInfo?.partner?.id,
          start_date: formatIOSToDate(
            date?.from ? date.from.toISOString() : "",
          ),
          end_date: formatIOSToDate(date?.to ? date.to.toISOString() : ""),
          start_time: `${fromTime.hours}:${fromTime.minutes}`,
          end_time: `${toTime.hours}:${toTime.minutes}`,
          client_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200 || !response.data) {
        toast.error(response.data.message || "Failed to initiate booking");
        return;
      }
      if (response.status === 200) {
        resetDateTime();
        setShowSuccessModal(true);
        return;
      }

      return response.data.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to initiate booking"));
    } finally {
      setIsBooking(false);
    }
  };

  const paystackProps = {
    email: formData.email,
    amount: 5000,
    channels: ["card"],
    metadata: {
      custom_fields: [
        {
          display_name: "Client Id",
          variable_name: "client_id",
          value: user?.id,
        },
        {
          display_name: "Listing Id",
          variable_name: "listing_id",
          value: listingInfo?.id,
        },
        {
          display_name: "Partner Id",
          variable_name: "partner_id",
          value: listingInfo?.partner?.id,
        },
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
          display_name: "Start Time",
          variable_name: "start_time",
          value: `${fromTime.hours}:${fromTime.minutes}`,
        },
        {
          display_name: "End Date",
          variable_name: "end_date",
          value: date?.to?.toLocaleDateString(),
        },
        {
          display_name: "End Time",
          variable_name: "end_time",
          value: `${toTime.hours}:${toTime.minutes}`,
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
    onSuccess: handlePaymentSuccess,
  };

  // disable paystack button if no start and end date is selected, any formdata value is empty or total cost is 0
  const isPaystackDisabled =
    !date?.from ||
    !fromTime?.hours ||
    !fromTime?.minutes ||
    !date?.to ||
    !toTime?.hours ||
    !toTime?.minutes ||
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
    <>
      <SuccessModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />

      {isBooking && <LoadingState />}

      <div className={CONTAINER_STYLES.bg}>
        <Breadcrumbs links={links} />

        <main className={CONTAINER_STYLES.pt}>
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <ShippingAddress formData={formData} setFormData={setFormData} />
            <OrderDetails
              listingInfo={listingInfo}
              costPerDay={costPerDay}
              serviceFee={serviceFee}
              totalCost={totalCost}
              paystackProps={paystackProps}
              isPaystackDisabled={isPaystackDisabled}
              user={user === null ? false : true}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default CheckoutContent;
