import { Button } from "@/components/ui/button";
import { OrderProps } from "@/types";
import {
  dashboardRoutes,
  formatIOSToDate,
  formatPrice,
  formatTimeTo12Hour,
} from "@/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const ConfirmationModal = ({
  status,
  open,
  data,
}: {
  status: string;
  open: boolean;
  data: OrderProps;
}) => {
  const STYLES = {
    section: "dashboard-section-card relative grid gap-6 !p-6 w-full",
    sectionTitle: "text-lg font-semibold text-[#172554]",
    item: "flex sm:items-center sm:justify-between leading-none flex-col sm:flex-row gap-2",
    itemLabel: "font-medium text-[#6B7280]",
    itemValue: "font-medium text-[#172554]",
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="relative flex w-full max-w-[500px] flex-col items-center justify-center space-y-4 rounded-2xl bg-white p-8 text-center">
        <h2 className="mb-2.5 text-2xl font-semibold text-[#172554]">
          {status === "accept"
            ? "Booking Successfully Created"
            : "Booking Declined"}
        </h2>
        <p className="mb-7 text-lg text-[#6B7280]">
          {status === "accept"
            ? "Your booking has been successfully processed. You'll receive a confirmation email with the details shortly"
            : "Your have declined the booking. You'll receive a confirmation email with the details shortly"}
        </p>

        <p
          className={`dashboard-section-card mb-4 flex w-full items-center ${status === "accept" ? "justify-between" : "justify-center"}`}
        >
          <span className="text-4xl font-semibold text-[#172554]">
            {formatPrice(data?.booking_amount ?? 0, "NGN")}
          </span>
          {status === "accept" && (
            <span className="ml-2 inline-block rounded-full bg-green-500 p-1 text-white">
              <Check size="20" />
            </span>
          )}
        </p>

        <section className={STYLES.section}>
          <h2 className={STYLES.sectionTitle}>Payment Details</h2>

          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Equipment Name</span>
            <span className={STYLES.itemValue}>{data?.equipment?.name}</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Rental Type</span>
            <span className={STYLES.itemValue}>
              {data?.equipment.service_type}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Booking Start Date</span>
            <span className={STYLES.itemValue}>
              {formatIOSToDate(data?.start_date || "")},{" "}
              {formatTimeTo12Hour(data?.start_time || "")}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Due Date</span>
            <span className={STYLES.itemValue}>
              {formatIOSToDate(data?.end_date || "")}{" "}
              {formatTimeTo12Hour(data?.end_time || "")}
            </span>
          </p>
        </section>

        <Button className="mr-auto bg-brandColor" asChild>
          <Link href={dashboardRoutes?.vendor_bookings}>Return Homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
