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
      className={`inline-flex items-center gap-2.5 rounded-3xl border px-6 py-1.5 lowercase ${style}`}
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
      className={`inline-flex items-center gap-2.5 rounded-3xl border px-6 py-1.5 lowercase ${style}`}
    >
      <span className={`!size-2 rounded-full ${style.replace("50", "600")}`} />
      <span>
        {status === "awaiting_payment_confirmation"
          ? "awaiting confirmation"
          : status}
      </span>
    </div>
  );
};
