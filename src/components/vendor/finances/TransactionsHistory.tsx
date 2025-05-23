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
import { GetTransactionStatusPill, LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { TransactionHistoryProps } from "@/types";

const tableHeads = [
  {
    label: "Date",
  },
  {
    label: "Total Paid",
    className: "text-right",
  },
  {
    label: "Commission",
    className: "text-right",
  },
  {
    label: "Amount Earned",
    className: "text-right",
  },
  {
    label: "Type",
  },
  {
    label: "Status",
  },
];

const TransactionsHistory = () => {
  const { token, businessProfile } = useAuth();
  // const navRef = useRef(null);

  // const filterOptions = ["all", "recieved", "pending", "withdraw", "refunded"];
  // const [activeFilter, setActiveFilter] = useState(filterOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  // const url =
  //   activeFilter === "all"
  //     ? `/client/api/v1/booking/get-bookings?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`
  //     : `/client/api/v1/booking/get-bookings-by-status?status=${activeFilter}&skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`;
  const url = `/partner/api/v1/payment/get-partner-transactions?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}&partner_id=${businessProfile?.id}`;

  const {
    data: transactionHistory,
    isLoading,
    error: listingError,
    refetch,
  } = useClientFetch<TransactionHistoryProps>({
    endpoint: url,
    token,
    // enabled: !!token && activeFilter !== "",
    enabled: !!token,
  });

  useEffect(() => {
    if (listingError) {
      toast.error(listingError?.message);
    }
    if (transactionHistory?.total_count) {
      setTotalPages(Math.ceil(transactionHistory?.total_count / itemsPerPage));
    }
  }, [listingError, transactionHistory]);

  // const handleFilterChange = (filter: string) => {
  //   setActiveFilter(filter);
  //   setCurrentPage(1);
  //   refetch();
  // };

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

      <header className="mb-6 flex items-center justify-between pb-2.5">
        <h1 className="text-2xl font-bold">Transactions History</h1>
      </header>
      <section className="rounded-[25px] bg-[#F8FAFC] p-6">
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
              {transactionHistory && transactionHistory?.data?.length > 0 ? (
                transactionHistory?.data?.map(t => (
                  <TableRow key={t?.id} className="py-10">
                    <TableCell className="min-w-[200px] px-5 py-3 text-[#6B7280]">
                      {formatIOSToDate(t?.updated_at)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-3 text-[#6B7280]">
                      {formatPrice(t?.amount, "NGN")}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-3 text-[#6B7280]">
                      {formatPrice(t?.commission, "NGN")}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-3 text-[#6B7280]">
                      {formatPrice(t?.available_amount, "NGN")}
                    </TableCell>
                    <TableCell
                      className={`whitespace-nowrap px-5 py-3 text-[#6B7280] ${t?.type === "debit" ? "text-red-500" : "text-green-700"}`}
                    >
                      {t?.type}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      {GetTransactionStatusPill(t?.status)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="px-5 text-left">
                    No transaction found.
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

export default TransactionsHistory;
