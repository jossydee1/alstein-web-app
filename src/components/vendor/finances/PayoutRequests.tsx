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
import {
  api,
  cn,
  formatError,
  formatIOSToDate,
  formatPrice,
  sanitizeLeadingZero,
} from "@/utils";
import { useClientFetch } from "@/hooks";
import { LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { ApiResponseProps, PayoutRequestHistoryProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const tableHeads = [
  {
    label: "Date requested",
  },
  {
    label: "Withdrawal Method",
  },

  {
    label: "AMOUNT",
    className: "text-right",
  },
  {
    label: "STATUS",
  },
];

const PayoutRequests = () => {
  const { token, businessProfile } = useAuth();
  // const navRef = useRef(null);

  const [amount, setAmount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // const filterOptions = ["all", "recieved", "pending", "withdraw", "refunded"];
  // const [activeFilter, setActiveFilter] = useState(filterOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  // const url =
  //   activeFilter === "all"
  //     ? `partner/api/v1/payment/get-payout-requests?partner_id=${businessProfile?.id}&skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`
  //     : `partner/api/v1/payment/get-payout-requests?partner_id=${businessProfile?.id}&status=${activeFilter}&skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`;
  const url = `partner/api/v1/payment/get-payout-requests?partner_id=${businessProfile?.id}&skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`;
  const {
    data: payoutList,
    isFetching: isPayoutLoading,
    error: payoutError,
    refetch: payoutRefetch,
  } = useClientFetch<PayoutRequestHistoryProps>({
    endpoint: url,
    token,
    // enabled: !!token && activeFilter !== "",
    enabled: !!token,
  });

  useEffect(() => {
    if (payoutError) {
      toast.error(payoutError?.message);
    }
    if (payoutList?.total_count) {
      setTotalPages(Math.ceil(payoutList?.total_count / itemsPerPage));
    }
  }, [payoutError, payoutList]);

  // const handleFilterChange = (filter: string) => {
  //   setActiveFilter(filter);
  //   setCurrentPage(1);
  //   payoutRefetch();
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    payoutRefetch();
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

  const handleRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    setIsProcessing(true);

    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/partner/api/v1/payment/initiate-debit-request",
        {
          amount: amount * 100,
          partner_id: businessProfile?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        toast.error(
          response?.data?.message || "Failed to initiate withdrawal request",
        );
        setIsError(true);
        return;
      }

      toast.success("Withdrawal request submitted successfully");
      setAmount(0);
      setIsSuccess(true);
      payoutRefetch();
      return response?.data?.data;
    } catch (error) {
      toast.error(formatError(error, "Failed to initiate withdrawal request"));
      setIsError(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="dashboard-section-card space-y-9">
      {isPayoutLoading && <LoadingState />}

      {isSuccess && (
        <div className="relative flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-green-50 p-4">
          <div className="rounded-full bg-[#CCFBF1] p-1 text-[#115E59]">
            <Check className="size-5" />
          </div>
          <p className="text-[#052E16]">
            Your withdrawal request has been processed successfully. Funds will
            be deposited into your account shortly
          </p>
        </div>
      )}

      {isError && (
        <div className="relative flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-red-50 p-4">
          <div className="rounded-full bg-[#fbcccc] p-1 text-[#5e1111]">
            <X className="size-5" />
          </div>
          <p className="text-[#052E16]">
            Your withdrawal request has failed. Please check your account
            details and try again. If the issue persists, contact support for
            assistance.
          </p>
        </div>
      )}

      <section className="flex flex-col gap-x-7 gap-y-3 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-7 md:flex-row">
        <div className="space-y-2.5">
          <h2 className="dashboard-section-card-title">Withdraw Funds</h2>
          <p className="text-[#6B7280]">
            Withdrawal will be made directly to your preferred account
          </p>
          <p className="text-orange-600">
            NB. Withdrawal takes 5 working days to reflect in your account
          </p>
        </div>

        <form
          onSubmit={handleRequest}
          className="flex min-w-[300px] max-w-[430px] flex-1 flex-col items-start justify-start gap-4"
        >
          <div className="w-full">
            <Label htmlFor="amount" className="mb-2">
              <Input
                className="w-full rounded-md border border-[#E5E7EB] bg-white p-5"
                type="number"
                id="amount"
                name="amount"
                value={sanitizeLeadingZero(String(amount))}
                onChange={e =>
                  setAmount(Number(sanitizeLeadingZero(e.target.value)))
                }
                placeholder="Enter amount to withdraw"
                min={0}
                required
              />
            </Label>
          </div>
          <Button
            variant="outline"
            type="submit"
            disabled={isProcessing}
            className="buttonBlue2"
          >
            Withdraw
          </Button>
        </form>
      </section>

      <div className="dashboard-section-card">
        <header className="mb-6 flex items-center justify-between pb-2.5">
          <div>
            <h1 className="text-2xl font-bold">Payout Requests</h1>
            <p className="text-sm text-gray-500">
              View and manage your payout requests
            </p>
          </div>
        </header>
        <section className="rounded-[25px] bg-[#F8FAFC] p-6">
          <div className="rounded-[6px] border border-[#E5E7EB] bg-white">
            <div className="border-grey-400 overflow-hidden border-b-[0.2px]">
              {/* <nav
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
              </nav> */}
            </div>
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
                {payoutList && payoutList?.data?.length > 0 ? (
                  payoutList?.data?.map(p => (
                    <TableRow key={p?.id} className="py-10">
                      <TableCell className="whitespace-nowrap px-5 py-3 text-[#6B7280]">
                        {formatIOSToDate(p?.updated_at)}
                      </TableCell>
                      <TableCell className="grid gap-1 whitespace-nowrap px-5 py-3 text-[#6B7280]">
                        <span className="font-semibold">{p?.bank_name}</span>
                        <span>{p?.account_number}</span>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-right">
                        {formatPrice(p?.amount, "NGN")}
                      </TableCell>
                      <TableCell className="px-5 py-3">
                        <div
                          className={`inline-flex items-center gap-2.5 rounded-3xl border border-[#E5E7EB] px-6 py-1.5 capitalize ${
                            p?.status === "pending"
                              ? "bg-orange-50"
                              : p?.status === "confirmed"
                                ? "bg-green-50"
                                : "bg-red-50"
                          }`}
                        >
                          <span
                            className={`size-2 rounded-full ${
                              p?.status === "pending"
                                ? "bg-orange-600"
                                : p?.status === "confirmed"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                            }`}
                          />
                          <span>{p?.status}</span>
                        </div>
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
      </div>
    </main>
  );
};

export default PayoutRequests;
