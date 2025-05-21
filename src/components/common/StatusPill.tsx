import React from "react";

export const GetOrderStatusPill = (status: string) => {
  const styles: Record<
    "initiated" | "approved" | "canceled" | "declined" | "default",
    string
  > = {
    initiated: "bg-orange-50",
    approved: "bg-green-50",
    canceled: "bg-red-50",
    declined: "bg-gray-50",
    default: "bg-gray-100",
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style}`}
    >
      <span className={`size-2 rounded-full ${style.replace("50", "600")}`} />
      <span>{status}</span>
    </div>
  );
};

export const GetPaymentStatusPill = (
  status: "awaiting_payment_confirmation" | "confirmed" | "default",
) => {
  const styles: Record<
    "awaiting_payment_confirmation" | "confirmed" | "default",
    string
  > = {
    awaiting_payment_confirmation: "bg-orange-50",
    confirmed: "bg-green-50",
    default: "bg-red-50",
  };

  const style = styles[status] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style}`}
    >
      <span className={`!size-2 rounded-full ${style.replace("50", "600")}`} />
      <span>
        {status === "awaiting_payment_confirmation" ? "pending" : status}
      </span>
    </div>
  );
};

export const GetListingStatusPill = (status: string) => {
  const styles: Record<
    | "listing_in_process"
    | "listing_completed"
    | "listing_closed"
    | "listing_approved"
    | "listing_denied",
    string
  > = {
    listing_in_process: "bg-orange-100",
    listing_approved: "bg-green-100",
    listing_completed: "bg-blue-100",
    listing_closed: "bg-neutral-100",
    listing_denied: "bg-red-100",
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] ||
    styles.listing_approved;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style}`}
    >
      <span className={`size-2 rounded-full ${style.replace("100", "600")}`} />
      <span>{status.replace("listing_", "").replace(/_/g, " ")}</span>
    </div>
  );
};
