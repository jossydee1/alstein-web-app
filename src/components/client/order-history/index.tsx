"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, formatIOSToDate, formatPrice } from "@/utils";
import { useClientFetch } from "@/hooks";
import {
  GetOrderStatusPill,
  GetPaymentStatusPill,
  LoadingState,
} from "@/components/common";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { OrderHistoryProps } from "@/types";

const tableHeads = [
  {
    label: "EQUIPMENT name",
  },
  {
    label: "SERVICE TYPE",
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
    label: "Booking STATUS",
  },
  {
    label: "Payment STATUS",
  },
];

const OrderHistoryContent = () => {
  const { token } = useAuth();
  const navRef = useRef(null);

  const filterOptions = [
    "all",
    "initiated",
    "approved",
    "declined",
    "canceled",
  ];
  const [activeFilter, setActiveFilter] = useState(filterOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  const url =
    activeFilter === "all"
      ? `/client/api/v1/booking/get-bookings?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`
      : `/client/api/v1/booking/get-bookings-by-status?status=${activeFilter}`;

  const {
    data: orderHistory,
    isLoading,
    error: listingError,
    refetch,
  } = useClientFetch<OrderHistoryProps>({
    endpoint: url,
    token,
  });

  useEffect(() => {
    if (listingError) {
      toast.error(listingError.message);
    }
    if (orderHistory?.total_count) {
      setTotalPages(Math.ceil(orderHistory.total_count / itemsPerPage));
    }
  }, [listingError, orderHistory]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              className={cn(
                currentPage === i &&
                  "rounded-full bg-brandColor text-white hover:!bg-brandColor hover:!text-white",
              )}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }
    return items;
  };

  return (
    <main className="dashboard-section-card">
      {isLoading && <LoadingState />}

      <h1 className="hidden">Order History</h1>
      <section className="rounded-[25px] bg-[#F8FAFC] p-6">
        <div className="rounded-[6px] border border-[#E5E7EB] bg-white">
          <div className="border-grey-400 overflow-hidden border-b-[0.2px]">
            <nav
              ref={navRef}
              className="gray-400 flex items-center overflow-x-auto px-4 py-4 text-sm"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              <div className="flex min-w-max space-x-6">
                {filterOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`px-6 py-2.5 font-medium capitalize ${activeFilter === option ? "rounded-md bg-brandColor text-white" : "text-gray-400"}`}
                    onClick={() => handleFilterChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          <Table>
            <TableHeader className="border-y border-y-[#E5E7EB] bg-[#F8FAFC] text-xs font-medium uppercase text-[#6B7280]">
              <TableRow>
                {tableHeads.map(head => (
                  <TableHead
                    key={head.label}
                    className={`whitespace-nowrap rounded-[6px] px-5 ${head.className}`}
                  >
                    {head.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderHistory && orderHistory?.data.length > 0 ? (
                orderHistory?.data?.map(order => (
                  <TableRow key={order.id} className="py-10">
                    <TableCell className="min-w-[200px] px-5 py-3 font-medium text-[#1F2937]">
                      {order.equipment.name}
                    </TableCell>
                    <TableCell className="px-5 py-3 font-medium text-[#1F2937]">
                      {order.equipment.service_type}
                    </TableCell>
                    <TableCell className="min-w-[200px] px-5 py-3 text-[#6B7280]">
                      {order.id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-3 text-[#6B7280]">
                      {formatIOSToDate(order.created_at)}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-right">
                      {formatPrice(order.booking_amount, "NGN")}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      {GetOrderStatusPill(order.status)}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      {GetPaymentStatusPill(
                        order.payment_status as
                          | "awaiting_payment_confirmation"
                          | "confirmed"
                          | "default",
                      )}
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

        <Pagination className="mx-auto mt-9 justify-end">
          <PaginationContent>
            <PaginationItem
              className="flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[#6B7280] disabled:opacity-50"
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
            >
              <ChevronLeft size={20} />
              Previous
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem
              className="flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[#6B7280] disabled:opacity-50"
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
            >
              Next
              <ChevronRight size={20} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
};

export default OrderHistoryContent;
