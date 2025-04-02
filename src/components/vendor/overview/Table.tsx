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
import { LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { OrderHistoryProps } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { dashboardRoutes } from "@/utils";

const tableHeads = [
  {
    label: "SERVICE/EQUIPMENT",
  },
  {
    label: "ORDER ID",
  },
  {
    label: "ORDER DATE",
  },
  {
    label: "TOTAL AMOUNT",
    className: "text-right",
  },
  {
    label: "STATUS",
  },
  {
    label: "ACTIONS",
  },
];

const BookingHistory = () => {
  const { token } = useAuth();

  const url = `/client/api/v1/booking/get-bookings?skip=0&take=10`;

  const {
    data: orderHistory,
    isLoading,
    error: listingError,
  } = useClientFetch<OrderHistoryProps>({
    endpoint: url,
    token,
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
          <Link href={dashboardRoutes.vendor_bookings}>View all</Link>
        </Button>
      </header>

      <section className="rounded-[25px] bg-[#F8FAFC] p-6">
        <div className="rounded-[6px] border-[0.2px] border-gray-300 bg-white">
          <Table>
            <TableHeader className="overflow-hidden border-y border-y-[#E5E7EB] bg-[#F8FAFC] text-xs font-medium uppercase text-[#6B7280]">
              <TableRow className="rounded-[6px]">
                {tableHeads.map(head => (
                  <TableHead
                    key={head.label}
                    className={`rounded-[6px] px-5 ${head.className}`}
                  >
                    {head.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="py-10">
                <TableCell className="px-5 py-3 font-medium text-[#1F2937]">
                  No orders found
                </TableCell>
              </TableRow>
            </TableBody>

            {/* <TableBody>
              {orderHistory?.data.map(order => (
                <TableRow key={order.id} className="py-10">
                  <TableCell className="px-5 py-3 font-medium text-[#1F2937]">
                    {order.service}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-[#6B7280]">
                    {order.orderId}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-[#6B7280]">
                    {order.orderDate}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-right">
                    {order.totalAmount}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div
                      className={`inline-flex items-center gap-2.5 rounded-3xl border px-6 py-1.5 capitalize ${
                        order.status === "pending"
                          ? "bg-orange-50"
                          : order.status === "confirmed"
                            ? "bg-green-50"
                            : "bg-red-50"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${
                          order.status === "pending"
                            ? "bg-orange-600"
                            : order.status === "confirmed"
                              ? "bg-green-600"
                              : "bg-red-600"
                        }`}
                      />
                      <span>{order.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </div>
      </section>
    </main>
  );
};

export default BookingHistory;
