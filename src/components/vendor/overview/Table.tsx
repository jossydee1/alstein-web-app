"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClientFetch } from "@/hooks";
import {
  GetOrderStatusPill,
  GetPaymentStatusPill,
  LoadingState,
} from "@/components/common";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { OrderProps } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { dashboardRoutes, formatIOSToDate, formatPrice } from "@/utils";
import { Eye } from "lucide-react";

const tableHeads = [
  {
    label: "LISTED DATE",
  },
  {
    label: "SERVICE/EQUIPMENT",
  },
  {
    label: "PRICE",
    className: "text-right",
  },
  {
    label: "Booking STATUS",
  },
  {
    label: "Payment STATUS",
  },
  {
    label: "ACTIONS",
  },
];

const BookingHistory = () => {
  const { token, businessProfile } = useAuth();

  const url = `/partner/api/v1/booking/recently-initiated-booking?partner_id=${businessProfile?.id}`;

  const {
    data: orderHistory,
    isLoading,
    error: listingError,
  } = useClientFetch<OrderProps[]>({
    endpoint: url,
    token,
    enabled: !!token && !!businessProfile?.id,
  });

  useEffect(() => {
    if (listingError) {
      toast.error(listingError.message);
    }
  }, [listingError, orderHistory]);

  return (
    <main className="dashboard-section-card">
      {isLoading && <LoadingState />}

      <header className="mb-6 flex items-center justify-between pb-2.5">
        <h1 className="text-2xl font-bold">Recent Bookings</h1>

        <Button asChild className="bg-brandColor">
          <Link href={dashboardRoutes?.vendor_bookings}>View all</Link>
        </Button>
      </header>
      <section className="rounded-[25px] bg-[#F8FAFC] p-3 md:p-6">
        <div className="rounded-[6px] border border-[#E5E7EB] bg-white">
          <Table>
            <TableHeader className="border-y border-y-[#E5E7EB] bg-[#F8FAFC] text-xs font-medium uppercase text-[#6B7280]">
              <TableRow>
                {tableHeads.map(head => (
                  <TableHead
                    key={head?.label}
                    className={`whitespace-nowrap rounded-[6px] px-5 ${head?.className}`}
                  >
                    {head?.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderHistory && orderHistory?.length > 0 ? (
                orderHistory?.map(order => (
                  <TableRow key={order?.id} className="py-10">
                    <TableCell className="whitespace-nowrap px-5 py-3 text-[#6B7280]">
                      {formatIOSToDate(order?.updated_at)}
                    </TableCell>
                    <TableCell className="min-w-[200px] px-5 py-3 font-medium text-[#1F2937]">
                      {order?.equipment?.name}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-right">
                      {formatPrice(order?.booking_amount, "NGN")}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      {GetOrderStatusPill(order?.status)}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      {GetPaymentStatusPill(
                        order?.payment_status as
                          | "awaiting_payment_confirmation"
                          | "confirmed"
                          | "default",
                      )}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Button asChild variant="outline">
                          <Link
                            href={`${dashboardRoutes?.vendor_bookings}/process?booking=${order?.id}`}
                          >
                            <Eye className="size-4 text-[#6B7280]" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="px-5 text-left">
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default BookingHistory;
