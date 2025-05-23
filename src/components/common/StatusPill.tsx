import React from "react";

export const GetOrderStatusPill = (status: string) => {
  if (!status) return null;

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
      <span
        className={`size-2 rounded-full bg-black ${style.replace("50", "600")}`}
      />
      <span>{status}</span>
    </div>
  );
};

export const GetPaymentStatusPill = (
  status: "awaiting_payment_confirmation" | "confirmed" | "default",
) => {
  if (!status) return null;

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
      <span
        className={`!size-2 rounded-full bg-black ${style.replace("50", "600")}`}
      />
      <span>
        {status === "awaiting_payment_confirmation" ? "pending" : status}
      </span>
    </div>
  );
};

export const GetListingStatusPill = (status: string) => {
  if (!status) return null;

  const styles: Record<
    | "listing_in_process"
    | "listing_completed"
    | "listing_closed"
    | "listing_approved"
    | "listing_denied"
    | "default",
    string
  > = {
    listing_in_process: "bg-orange-100",
    listing_approved: "bg-green-100",
    listing_completed: "bg-blue-100",
    listing_closed: "bg-neutral-100",
    listing_denied: "bg-red-100",
    default: "bg-gray-100",
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style}`}
    >
      <span
        className={`size-2 rounded-full bg-black ${style.replace("100", "600")}`}
      />
      <span>{status.replace("listing_", "").replace(/_/g, " ")}</span>
    </div>
  );
};

export const GetTransactionStatusPill = (status: string) => {
  const styles: Record<
    "pending" | "withheld" | "onhold" | "failed" | "default",
    string
  > = {
    pending: "bg-orange-100",
    withheld: "bg-gray-100",
    onhold: "bg-neutral-100",
    failed: "bg-red-100",
    default: "bg-green-100",
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style}`}
    >
      <span
        className={`size-2 rounded-full bg-black ${style.replace("100", "600")}`}
      />
      <span>{status.replace(/_/g, " ")}</span>
    </div>
  );
};

export const GetPayoutRequestStatusPill = (status: string) => {
  const styles: Record<"pending" | "approved" | "declined", string> = {
    pending: "bg-orange-100",
    approved: "bg-green-100",
    declined: "bg-red-100",
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.pending;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style}`}
    >
      <span
        className={`size-2 rounded-full bg-black ${style.replace("100", "600")}`}
      />
      <span>{status.replace(/_/g, " ")}</span>
    </div>
  );
};
