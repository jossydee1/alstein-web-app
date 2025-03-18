"use client";
import React, { useState } from "react";
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

const orderHistory = [
  {
    id: 1,
    service: "MRI Scan",
    orderId: "011245",
    orderDate: "05/08/2025, 10:30 AM",
    items: 1,
    totalAmount: "$250.00",
    status: "pending",
  },
  {
    id: 2,
    service: "MRI Scan",
    orderId: "011245",
    orderDate: "05/08/2025, 10:30 AM",
    items: 1,
    totalAmount: "$250.00",
    status: "confirmed",
  },
  {
    id: 3,
    service: "MRI Scan",
    orderId: "011245",
    orderDate: "05/08/2025, 10:30 AM",
    items: 1,
    totalAmount: "$250.00",
    status: "cancelled",
  },
];

const OrderHistoryContent = () => {
  const filterOptions = ["all", "pending", "confirmed", "cancelled"];
  const [activeFilter, setActiveFilter] = useState(filterOptions[0]);
  const [filteredOrders, setFilteredOrders] = useState(orderHistory);
  const [currentPage] = useState(1);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredOrders(orderHistory);
    } else {
      setFilteredOrders(orderHistory.filter(order => order.status === filter));
    }
  };

  return (
    <main className="rounded-[25px] border-[0.2px] border-[#9CA3AF] px-8 py-6">
      {/* <header className="mb-6 flex items-center justify-between border-b-[0.2px] border-[#9CA3AF] pb-2.5">
        <h1 className="text-2xl font-bold">Order History</h1>
        <button>View All</button>
      </header> */}

      <section className="rounded-[25px] bg-[#F8FAFC] p-6">
        <div className="rounded-[6px] border border-[#E5E7EB] bg-white">
          <nav className="gray-400 border-grey-400 flex items-center justify-start gap-6 border-b-[0.2px] px-4 py-4 text-sm">
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
              {filteredOrders.map(order => (
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
            </TableBody>
          </Table>
        </div>

        <Pagination className="mx-auto mt-9 justify-end">
          <PaginationContent>
            <PaginationItem className="flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[#6B7280] disabled:opacity-50">
              <ChevronLeft size={20} />
              Previous
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className={cn(
                  currentPage === 1 &&
                    "rounded-full bg-brandColor text-white hover:!bg-brandColor hover:!text-white",
                )}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem className="flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-[#6B7280] disabled:opacity-50">
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
