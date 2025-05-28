import React from "react";

// Helper for color mapping
type PillColor = { bg: string; dot: string; text?: string };

export const GetOrderStatusPill = (status: string) => {
  if (!status) return null;

  const styles: Record<
    "initiated" | "approved" | "canceled" | "declined" | "default",
    PillColor
  > = {
    initiated: { bg: "bg-orange-100", dot: "bg-orange-600" },
    approved: { bg: "bg-green-100", dot: "bg-green-600" },
    canceled: { bg: "bg-red-100", dot: "bg-red-600" },
    declined: { bg: "bg-gray-100", dot: "bg-gray-600" },
    default: { bg: "bg-gray-100", dot: "bg-gray-600" },
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style.bg}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} />
      <span>{status}</span>
    </div>
  );
};

export const GetPaymentStatusPill = (status: string) => {
  if (!status) return null;

  const styles: Record<
    "awaiting_payment_confirmation" | "payment_approved" | "default",
    PillColor
  > = {
    awaiting_payment_confirmation: {
      bg: "bg-orange-100",
      dot: "bg-orange-600",
    },
    payment_approved: { bg: "bg-green-100", dot: "bg-green-600" },
    default: { bg: "bg-gray-100", dot: "bg-gray-600" },
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style.bg}`}
    >
      <span className={`!size-2 rounded-full ${style.dot}`} />
      <span>
        {status === "awaiting_payment_confirmation"
          ? "pending"
          : status === "payment_approved"
            ? "approved"
            : status}
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
    PillColor
  > = {
    listing_in_process: { bg: "bg-orange-100", dot: "bg-orange-600" },
    listing_approved: { bg: "bg-green-100", dot: "bg-green-600" },
    listing_completed: { bg: "bg-blue-100", dot: "bg-blue-600" },
    listing_closed: { bg: "bg-neutral-100", dot: "bg-neutral-600" },
    listing_denied: { bg: "bg-red-100", dot: "bg-red-600" },
    default: { bg: "bg-gray-100", dot: "bg-gray-600" },
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style.bg}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} />
      <span>{status.replace("listing_", "").replace(/_/g, " ")}</span>
    </div>
  );
};

export const GetPartnerStatusPill = (status: string) => {
  if (!status) return null;

  const styles: Record<
    "pending" | "approved" | "declined" | "default",
    PillColor
  > = {
    pending: { bg: "bg-orange-100", dot: "bg-orange-600" },
    approved: { bg: "bg-green-100", dot: "bg-green-600" },
    declined: { bg: "bg-red-100", dot: "bg-red-600" },
    default: { bg: "bg-gray-100", dot: "bg-gray-600" },
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style.bg}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} />
      <span>{status.replace(/_/g, " ")}</span>
    </div>
  );
};

export const GetFinanceMetricsPill = (metric: string) => {
  if (!metric) return null;

  const styles: Record<
    "paid" | "pending" | "balance",
    { bg: string; text: string }
  > = {
    paid: { bg: "bg-green-100", text: "text-green-600" },
    pending: { bg: "bg-orange-100", text: "text-orange-600" },
    balance: { bg: "bg-blue-100", text: "text-blue-600" },
  };

  const style = styles[metric.toLowerCase() as keyof typeof styles];

  return (
    <div
      className={`inline-flex items-center whitespace-nowrap rounded-3xl px-2 py-1 text-sm font-medium capitalize ${style?.bg || ""} ${style?.text || ""}`}
    >
      {metric.replace(/_/g, " ")}
    </div>
  );
};

export const GetRolePill = (role: string) => {
  if (!role) return null;

  const styles: Record<"admin" | "editor" | "viewer", PillColor> = {
    admin: { bg: "bg-orange-100", dot: "bg-orange-600" },
    editor: { bg: "bg-green-100", dot: "bg-green-600" },
    viewer: { bg: "bg-red-100", dot: "bg-red-600" },
  };

  const style =
    styles[role.toLowerCase() as keyof typeof styles] || styles.viewer;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style.bg}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} />
      <span>{role.replace(/_/g, " ")}</span>
    </div>
  );
};

export const GetTransactionStatusPill = (status: string) => {
  const styles: Record<
    "pending" | "withheld" | "onhold" | "failed" | "default",
    PillColor
  > = {
    pending: { bg: "bg-orange-100", dot: "bg-orange-600" },
    withheld: { bg: "bg-gray-100", dot: "bg-gray-600" },
    onhold: { bg: "bg-blue-100", dot: "bg-blue-600" },
    failed: { bg: "bg-red-100", dot: "bg-red-600" },
    default: { bg: "bg-gray-100", dot: "bg-gray-600" },
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style.bg}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} />
      <span>{status.replace(/_/g, " ")}</span>
    </div>
  );
};

export const GetPayoutRequestStatusPill = (status: string) => {
  const styles: Record<
    "pending" | "approved" | "declined" | "default",
    PillColor
  > = {
    pending: { bg: "bg-orange-100", dot: "bg-orange-600" },
    approved: { bg: "bg-green-100", dot: "bg-green-600" },
    declined: { bg: "bg-red-100", dot: "bg-red-600" },
    default: { bg: "bg-gray-100", dot: "bg-gray-600" },
  };

  const style =
    styles[status.toLowerCase() as keyof typeof styles] || styles.default;

  return (
    <div
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-3xl border px-6 py-1.5 lowercase ${style.bg}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} />
      <span>{status.replace(/_/g, " ")}</span>
    </div>
  );
};
