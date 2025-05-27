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
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paystackTrigger, setPaystackTrigger] = useState(false);

  const {
    date,
    numberOfDays,
    resetDateTime,
    fromTime,
    toTime,
    isPerSample,
    numberOfSamples,
  } = useDateTime();

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
        fullname: `${user?.first_name} ${user?.last_name}`,
        phone: user?.phone_number,
        email: user?.email,
        address: user?.address || "",
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
    enabled: !!id,
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
      link: `${webRoutes?.listings}/${id}`,
    },
    {
      title: "Checkout",
      link: "#",
    },
  ];

  const costPerDay = listingInfo?.price || 0;
  const serviceFee = 0;
  // Calculate total cost based on mode
  const totalCost = isPerSample
    ? costPerDay * numberOfSamples + serviceFee
    : costPerDay * numberOfDays + serviceFee;

  // Initiate booking before payment
  const handleInitiateBooking = async () => {
    setIsBooking(true);
    try {
      const response = await api.post<ApiResponseProps<{ booking_id: string }>>(
        "/client/api/v1/booking/initiate-booking",
        {
          equipment_id: id,
          partner_id: listingInfo?.partner?.id,
          start_date: formatIOSToDate(
            date?.from ? date?.from.toISOString() : "",
          ),
          end_date: formatIOSToDate(date?.to ? date?.to.toISOString() : ""),
          start_time: `${fromTime?.hours}:${fromTime?.minutes}`,
          end_time: `${toTime?.hours}:${toTime?.minutes}`,
          client_id: userId,
          number_of_samples: numberOfSamples,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data?.data?.booking_id) {
        toast.error(response?.data?.message || "Failed to initiate booking");
        setIsBooking(false);
        return;
      }
      setBookingId(response.data.data.booking_id);
      setPaystackTrigger(true); // this will trigger PaystackButton click in OrderDetails
    } catch (error) {
      toast.error(formatError(error, "Failed to initiate booking"));
      setIsBooking(false);
    }
  };

  // On Paystack payment success
  const handlePaymentSuccess = () => {
    resetDateTime();
    setShowSuccessModal(true);
    setIsBooking(false);
    setBookingId(null);
    setPaystackTrigger(false);
  };

  // paystack
  const publicKey = PAYSTACK_PUBLIC_TEST_KEY;

  // Add booking_id to metadata if available
  const paystackProps = {
    email: formData?.email,
    amount: totalCost,
    channels: ["card"],
    metadata: {
      custom_fields: [
        {
          display_name: "Client Id",
          variable_name: "client_id",
          value: userId,
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
          value: formData?.fullname,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: formData?.phone,
        },
        {
          display_name: "Address",
          variable_name: "address",
          value: formData?.address,
        },
        {
          display_name: "Billing Method",
          variable_name: "billing_method",
          value: isPerSample ? "per_Sample" : "per_day",
        },
        {
          display_name: "Start Date",
          variable_name: "start_date",
          value: date?.from?.toLocaleDateString(),
        },
        {
          display_name: "Start Time",
          variable_name: "start_time",
          value: isPerSample ? "" : `${fromTime?.hours}:${fromTime?.minutes}`,
        },
        {
          display_name: "End Date",
          variable_name: "end_date",
          value: isPerSample
            ? date?.from?.toLocaleDateString()
            : date?.to?.toLocaleDateString(),
        },
        {
          display_name: "End Time",
          variable_name: "end_time",
          value: isPerSample ? "" : `${toTime?.hours}:${toTime?.minutes}`,
        },
        {
          display_name: isPerSample ? "Cost per Sample" : "Cost per Day",
          variable_name: isPerSample ? "cost_per_sample" : "cost_per_day",
          value: isPerSample ? costPerDay : costPerDay,
        },
        {
          display_name: isPerSample ? "Number of Samples" : "Number of Days",
          variable_name: isPerSample ? "number_of_samples" : "number_of_days",
          value: isPerSample ? numberOfSamples : numberOfDays,
        },
        ...(bookingId
          ? [
              {
                display_name: "Booking Id",
                variable_name: "booking_id",
                value: bookingId,
              },
            ]
          : []),
      ],
    },
    publicKey,
    text: "Complete Booking",
    type: "button",
    onSuccess: handlePaymentSuccess,
    trigger: paystackTrigger, // custom prop to trigger payment
    onClose: () => {
      setIsBooking(false);
      setPaystackTrigger(false);
    },
  };

  // disable paystack button if required fields are missing
  const isPaystackDisabled = isPerSample
    ? !date?.from ||
      Object.values(formData).some(value => value === "") ||
      !userId ||
      !listingInfo?.id ||
      !listingInfo?.partner?.id ||
      totalCost <= 0 ||
      !numberOfSamples
    : !date?.from ||
      !date?.to ||
      Object.values(formData).some(value => value === "") ||
      !userId ||
      !listingInfo?.id ||
      !listingInfo?.partner?.id ||
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
              paystackProps={paystackProps}
              isPaystackDisabled={isPaystackDisabled || isBooking}
              user={user === null ? false : true}
              onInitiateBooking={handleInitiateBooking}
              paystackTrigger={paystackTrigger}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default CheckoutContent;
