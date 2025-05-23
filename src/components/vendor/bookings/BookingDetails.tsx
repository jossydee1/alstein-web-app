"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  api,
  dashboardRoutes,
  formatError,
  formatIOSToDate,
  formatPrice,
  formatTimeTo12Hour,
} from "@/utils";
import { X } from "lucide-react";
import Link from "next/link";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "@/context";
import { useClientFetch } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { OrderProps } from "@/types";
import { LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { differenceInDays } from "date-fns";

const STYLES = {
  section: "dashboard-section-card relative grid gap-6 !p-6 max-w-screen-sm",
  sectionTitle: "text-lg font-semibold text-[#172554]",
  item: "flex sm:items-center sm:justify-between leading-none flex-col sm:flex-row gap-2",
  itemLabel: "font-medium text-[#6B7280]",
  itemValue: "font-medium text-[#172554]",
};

const BookingDetails = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking");

  const { token } = useAuth();
  const [status, setStatus] = useState("accept");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);

    try {
      const res = await api.post(
        "/partner/api/v1/booking/booking-process",
        {
          booking_id: bookingId,
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setStatus("accept");
        setOpen(true);
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to accept booking"));
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);

    try {
      const res = await api.post(
        "/partner/api/v1/booking/booking-process",
        {
          booking_id: bookingId,
          status: "declined",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setStatus("decline");
        setOpen(true);
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to decline booking"));
    } finally {
      setLoading(false);
    }
  };

  const { data, isLoading } = useClientFetch<OrderProps>({
    endpoint: `/partner/api/v1/booking/booking-details?booking_id=${bookingId}`,
    token,
    enabled: !!bookingId && !!token,
  });

  const showButtons = data?.status === "initiated";

  return (
    <>
      {(loading || isLoading) && <LoadingState />}{" "}
      {/* Show loading state when loading */}
      {data && <ConfirmationModal status={status} open={open} data={data} />}
      <main className="dashboard-section-card relative grid gap-7">
        <h1 className="text-2xl font-semibold text-[#172554]">
          Booking Detail Page
        </h1>
        {/* close button */}
        <Link
          href={dashboardRoutes?.vendor_bookings}
          className="absolute right-4 top-4"
        >
          <X className="size-5 text-[#757575]" />
        </Link>

        <section className={STYLES.section}>
          <h2 className={STYLES.sectionTitle}>Requester Information</h2>

          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Full Name</span>
            <span className={STYLES.itemValue}>
              {data?.client?.first_name || "-"} {data?.client?.last_name || "-"}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Email</span>
            <span className={STYLES.itemValue}>
              {data?.client?.email || "-"}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Address</span>
            <span className={STYLES.itemValue}>
              {data?.client?.address || "-"}
            </span>
          </p>
        </section>

        <section className={STYLES.section}>
          <h2 className={STYLES.sectionTitle}>Booking Information</h2>

          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Equipment Name</span>
            <span className={STYLES.itemValue}>
              {data?.equipment?.name || "-"}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Rental Type</span>
            <span className={`${STYLES.itemValue} capitalize`}>
              {data?.equipment?.service_type.replace(/_/g, " ") || "-"}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Billing Method</span>
            <span className={`${STYLES.itemValue} capitalize`}>
              {data?.equipment?.bill_type.replace(/_/g, " ") || "-"}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Start Date</span>
            <span className={STYLES.itemValue}>
              {formatIOSToDate(data?.start_date || "")}
              {data?.equipment?.bill_type === "per_day" && (
                <> , {formatTimeTo12Hour(data?.start_time || "")}</>
              )}
            </span>
          </p>
          {data?.equipment?.bill_type === "per_day" && (
            <p className={STYLES.item}>
              <span className={STYLES.itemLabel}>End Date</span>
              <span className={STYLES.itemValue}>
                {formatIOSToDate(data?.end_date || "")}{" "}
                {data?.end_time && formatTimeTo12Hour(data?.end_time || "")}
              </span>
            </p>
          )}

          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>No. of Days/Samples</span>
            <span className={STYLES.itemValue}>
              {data?.number_of_samples ||
                differenceInDays(data?.end_date || "", data?.start_date || "")}
            </span>
          </p>
        </section>

        <section className={STYLES.section}>
          <h2 className={STYLES.sectionTitle}>Price Review</h2>

          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Sub Total</span>
            <span className={STYLES.itemValue}>
              {formatPrice(data?.booking_amount ?? 0, "NGN")}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Discount</span>
            <span className={STYLES.itemValue}>{formatPrice(0, "NGN")}</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Grand Total</span>
            <span className={STYLES.itemValue}>
              {formatPrice(data?.booking_amount ?? 0, "NGN")}
            </span>
          </p>
        </section>

        {showButtons && (
          <footer className="flex max-w-screen-sm flex-col items-center justify-between gap-x-7 gap-y-4 sm:flex-row">
            <Button className="w-full bg-brandColor" onClick={handleAccept}>
              Accept Booking
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleDecline}
            >
              Decline Booking
            </Button>
          </footer>
        )}
      </main>
    </>
  );
};

export default BookingDetails;
