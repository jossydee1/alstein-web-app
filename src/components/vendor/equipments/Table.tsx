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
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { cn, dashboardRoutes, formatIOSToDate, formatPrice } from "@/utils";
import { useClientFetch } from "@/hooks";
import { GetListingStatusPill, LoadingState } from "@/components/common";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { ListingsProps } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tableHeads = [
  {
    label: "SERVICE/EQUIPMENT",
  },
  {
    label: "ID",
  },
  {
    label: "LISTED DATE",
  },
  {
    label: "PRICE",
    className: "text-right",
  },
  {
    label: "STATUS",
  },
  {
    label: "ACTIONS",
  },
];

const EquipmentListings = () => {
  const { token, businessProfile } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  const url = `/partner/api/v1/equipments/get-equipments?partner_id=${businessProfile?.id}&skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`;

  const {
    data: equipments,
    isLoading,
    error: listingError,
    refetch,
  } = useClientFetch<ListingsProps>({
    endpoint: url,
    token,
    enabled: !!token && !!businessProfile?.id,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (listingError) {
      toast.error(listingError?.message);
    }
    if (equipments?.total_count) {
      setTotalPages(Math.ceil(equipments?.total_count / itemsPerPage));
    }
  }, [listingError, equipments]);

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
        <h1 className="text-2xl font-bold">Listed Equipments</h1>

        <Button className="buttonBlue2" asChild>
          <Link href={dashboardRoutes?.vendor_new_equipment}>
            List an equipment
          </Link>
        </Button>
      </header>
      <section className="rounded-[25px] bg-[#F8FAFC] p-6">
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
              {equipments && equipments?.data?.length > 0 ? (
                equipments?.data.map(e => (
                  <TableRow key={e?.id} className="py-10">
                    <TableCell className="min-w-[200px] px-5 py-3 font-medium text-[#1F2937]">
                      {e?.name}
                    </TableCell>
                    <TableCell className="min-w-[200px] px-5 py-3 text-[#6B7280]">
                      {e?.id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-3 text-[#6B7280]">
                      {formatIOSToDate(e?.created_at)}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-right">
                      {formatPrice(e?.price, "NGN")}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      {GetListingStatusPill(e?.listing_status)}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" className="!p-0">
                          <Link
                            href={`${dashboardRoutes?.vendor_equipments}/${e?.id}`}
                          >
                            <Eye className="size-4 text-[#6B7280]" />
                            View
                          </Link>
                        </Button>
                        {/* <Button asChild variant="ghost" className="!p-0">
                          <Link
                            // href={`${dashboardRoutes?.vendor_equipments}/edit?equipment=0112455`}
                            href="#"
                          >
                            <Edit className="size-4 text-[#6B7280]" />
                            Edit
                          </Link>
                        </Button> */}
                        {/* <Button asChild variant="ghost" className="!p-0">
                          <Link
                            href={`${dashboardRoutes?.vendor_equipments}/edit?equipment=0112455`}
                          >
                            <Trash className="size-4 text-[#6B7280]" />
                            Delete
                          </Link>
                        </Button> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="px-5 text-left">
                    No equipments found.
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

export default EquipmentListings;
