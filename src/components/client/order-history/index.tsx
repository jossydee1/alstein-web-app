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
import { cn } from "@/utils";
import { useClientFetch } from "@/hooks";
import { LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { useAuth } from "@/context";

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
    label: "ITEMS",
  },
  {
    label: "TOTAL AMOUNT",
    className: "text-right",
  },
  {
    label: "STATUS",
  },
];

const OrderHistoryContent = () => {
  const { token } = useAuth();

  const filterOptions = [
    "all",
    "initiated",
    "approved",
    "canceled",
    "declined",
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
  } = useClientFetch<[length: number, data: unknown[]]>({
    endpoint: url,
    token,
  });

  useEffect(() => {
    if (listingError) {
      toast.error(listingError.message);
    }
    if (orderHistory?.length) {
      setTotalPages(Math.ceil(orderHistory.length / itemsPerPage));
    }
  }, [listingError, orderHistory]);

  if (isLoading) return <LoadingState />;

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
      <h1 className="hidden">Order History</h1>

      <section className="rounded-[25px] bg-[#F8FAFC] p-6">
        <div className="rounded-[6px] border border-[#E5E7EB] bg-white">
          <nav className="gray-400 border-grey-400 flex flex-wrap items-center justify-start gap-6 border-b-[0.2px] px-4 py-4 text-sm">
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
          </nav>

          <Table>
            <TableHeader className="border-y border-y-[#E5E7EB] bg-[#F8FAFC] text-xs font-medium uppercase text-[#6B7280]">
              <TableRow>
                {tableHeads.map(head => (
                  <TableHead
                    key={head.label}
                    className={`px-5 ${head.className}`}
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
              {orderHistory?.map(order => (
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
                  <TableCell className="px-5 py-3 text-[#172554]">
                    <span className="inline-flex aspect-square w-9 items-center justify-center rounded-full bg-[#F6F6F8]">
                      1
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-3 text-right">
                    {order.totalAmount}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div
                      className={`inline-flex items-center gap-2.5 rounded-3xl border border-[#E5E7EB] px-6 py-1.5 capitalize ${
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
