"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { dashboardRoutes, formatPrice } from "@/utils";
import { X } from "lucide-react";
import Link from "next/link";
import ConfirmationModal from "./ConfirmationModal";

const BookingDetails = () => {
  const STYLES = {
    section: "dashboard-section-card relative grid gap-6 !p-6 max-w-screen-sm",
    sectionTitle: "text-lg font-semibold text-[#172554]",
    item: "flex sm:items-center sm:justify-between leading-none flex-col sm:flex-row gap-2",
    itemLabel: "font-medium text-[#6B7280]",
    itemValue: "font-medium text-[#172554]",
  };

  const [status, setStatus] = useState("accept");
  const [open, setOpen] = useState(false);

  const handleAccept = () => {
    setStatus("accept");
    setOpen(true);
  };

  const handleDecline = () => {
    setStatus("decline");
    setOpen(true);
  };

  return (
    <>
      <ConfirmationModal status={status} open={open} />
      <main className="dashboard-section-card relative grid gap-7">
        <h1 className="text-2xl font-semibold text-[#172554]">
          Booking Detail Page
        </h1>
        {/* close button */}
        <Link
          href={dashboardRoutes.vendor_bookings}
          className="absolute right-4 top-4"
        >
          <X className="size-5 text-[#757575]" />
        </Link>

        <section className={STYLES.section}>
          <h2 className={STYLES.sectionTitle}>Requester Information</h2>

          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Full Name</span>
            <span className={STYLES.itemValue}>John Doe</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Address</span>
            <span className={STYLES.itemValue}>No 19, Ikorodu Street</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>City</span>
            <span className={STYLES.itemValue}>Ikeja</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>State</span>
            <span className={STYLES.itemValue}>Lagos</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Distance</span>
            <span className={STYLES.itemValue}>46km away</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Email</span>
            <span className={STYLES.itemValue}>Johndoe@.com</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Phone Number</span>
            <span className={STYLES.itemValue}>234-70-450-690</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}></span>
            <span className={STYLES.itemValue}></span>
          </p>
        </section>

        <section className={STYLES.section}>
          <h2 className={STYLES.sectionTitle}>Booking Information</h2>

          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Equipment Name</span>
            <span className={STYLES.itemValue}>Portable X-Ray Machine</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Rental Type</span>
            <span className={STYLES.itemValue}>Daily Rental</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Booking Start Date</span>
            <span className={STYLES.itemValue}>March 20, 2025</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Due Date</span>
            <span className={STYLES.itemValue}>March 22, 2025</span>
          </p>
        </section>

        <section className={STYLES.section}>
          <h2 className={STYLES.sectionTitle}>Price Review</h2>

          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Sub Total</span>
            <span className={STYLES.itemValue}>
              {formatPrice(400000, "NGN")}
            </span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Discount</span>
            <span className={STYLES.itemValue}>{formatPrice(0, "NGN")}</span>
          </p>
          <p className={STYLES.item}>
            <span className={STYLES.itemLabel}>Grand Total</span>
            <span className={STYLES.itemValue}>
              {formatPrice(400000, "NGN")}
            </span>
          </p>
        </section>

        <footer className="flex max-w-screen-sm flex-col items-center justify-between gap-x-7 gap-y-4 sm:flex-row">
          <Button className="w-full bg-brandColor" onClick={handleAccept}>
            Accept Booking
          </Button>
          <Button variant="outline" className="w-full" onClick={handleDecline}>
            Decline Booking
          </Button>
        </footer>
      </main>
    </>
  );
};

export default BookingDetails;
