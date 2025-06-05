"use client";

import React, { useEffect, useState } from "react";
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
import { GetOrderStatusPill, LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { OrderHistoryProps, OrderProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import BookedOrderDetails from "@/components/client/order-history/BookedOrderDetails";

const tableHeads = [
  {
    label: " DATE Ordered",
  },
  {
    label: "EQUIPMENT name",
  },
  {
    label: "TOTAL AMOUNT",
    className: "text-right",
  },
  {
    label: "Booking STATUS",
  },
  {
    label: "Actions",
  },
];

const RequestHistory = () => {
  const { token, businessProfile } = useAuth();
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<OrderProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  const url = `/partner/api/v1/booking/filter-partner-bookings-by-status?partner_id=${businessProfile?.id}&skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}&status=initiated`;

  const {
    data: orderHistory,
    isLoading,
    error: listingError,
    refetch,
  } = useClientFetch<OrderHistoryProps>({
    endpoint: url,
    token,
    enabled: !!token && !!businessProfile?.id,
  });

  useEffect(() => {
    if (listingError) {
      toast.error(listingError?.message);
    }
    if (orderHistory?.total_count) {
      setTotalPages(Math.ceil(orderHistory?.total_count / itemsPerPage));
    }
  }, [listingError, orderHistory]);

  const handleViewDetails = (order: OrderProps) => {
    setSelectedOrder(order);
    const params = new URLSearchParams(window.location.search);
    params.set("orderId", order.id);
    router.push(`?${params.toString()}&tab=bookings`);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    const params = new URLSearchParams(window.location.search);
    params.delete("orderId");
    router.push(`?${params.toString()}`);
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

      {/* Overlay */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={handleCloseDetails}
        />
      )}

      {/* Slide Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-[800px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out",
          selectedOrder ? "translate-x-0" : "translate-x-full",
        )}
        onClick={e => e.stopPropagation()}
      >
        {selectedOrder && (
          <BookedOrderDetails
            role="partner"
            order={selectedOrder}
            onClose={handleCloseDetails}
          />
        )}
      </div>

      <header className="mb-6 flex items-center justify-between pb-2.5">
        <h1 className="text-2xl font-bold">Pending Requests</h1>
      </header>
      <section className="rounded-[25px] bg-[#F8FAFC] p-3 md:p-6">
        <div className="rounded-[6px] border border-[#E5E7EB] bg-white">
          {/* <div className="border-grey-400 overflow-hidden border-b-[0.2px]">
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
          </div> */}

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
              {orderHistory && orderHistory?.data?.length > 0 ? (
                orderHistory?.data?.map(order => (
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
                      <div className="flex items-center gap-2.5">
                        <Button
                          variant="outline"
                          onClick={() => handleViewDetails(order)}
                        >
                          <Eye className="size-4 text-[#6B7280]" />
                          View Details
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

        <Pagination className="mx-auto mt-9 justify-end">
          <PaginationContent>
            <PaginationItem
              className="flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-2.5 hover:cursor-pointer disabled:text-[#6B7280] disabled:opacity-50"
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
            >
              <ChevronLeft size={20} />
              Previous
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem
              className="flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-2.5 hover:cursor-pointer disabled:text-[#6B7280] disabled:opacity-50"
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

export default RequestHistory;
