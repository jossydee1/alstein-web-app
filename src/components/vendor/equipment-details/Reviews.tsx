"use client";

import React, { useEffect, useState } from "react";
import reviewImg from "@/public/images/review-image.svg";
import Image from "next/image";
import avatar from "@/public/icons/avatar.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { DOCUMENT_URL, formatDateToRelativeTime } from "@/utils";
import { CommentProps } from "@/types";
import { useClientFetch } from "@/hooks";

const PAGINATION_STYLES = {
  content: "flex justify-center gap-3",
  button: "rounded-sm p-1.5 border-[0.5px] border-[#7B7485]",
  isActive: "bg-[#2C2C2C] border-[#303030] text-white",
};

export const Reviews = ({
  partnerId,
  averageRating,
  listingId,
}: {
  partnerId: string;
  averageRating: number;
  listingId?: string;
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [commentsData, setCommentsData] = useState<CommentProps[]>([]);

  const url = listingId
    ? `/partner/public/api/v1/comments/get-comments?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}&equipment_id=${listingId}&partner_id=${partnerId}`
    : `/partner/public/api/v1/comments/get-comments?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}&partner_id=${partnerId}`;

  const { data: comments } = useClientFetch<{
    data: CommentProps[];
    item_count: number;
  }>({
    endpoint: url,
    enabled: !!partnerId && listingId !== "",
  });

  useEffect(() => {
    if (comments) {
      setCommentsData(comments?.data);
      setTotalPages(Math.ceil(comments?.item_count / itemsPerPage));
    }
  }, [comments, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
              className={`${PAGINATION_STYLES.button} ${currentPage === i ? PAGINATION_STYLES.isActive : ""}`}
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
    <section>
      <hr className="my-6 border border-[#EBEBEB]" />

      <div>
        <h2 className="font-500 mb-3 text-center text-2xl">Likes & Reviews</h2>

        <div className="mb-[62px] flex items-center justify-center gap-2">
          <Image
            src={reviewImg}
            alt="Average Rating"
            className="object-fit h-[54px] w-[54px] bg-neutral-50"
          />
          <p className="text-5xl font-[500] text-[#5D5D5D]">
            {averageRating?.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
        <div>
          {commentsData?.length === 0 ? (
            <p className="text-center text-gray-500">
              No reviews yet, be the first one!
            </p>
          ) : (
            <div className="grid w-full max-w-[580px] gap-8 lg:gap-16">
              {commentsData.map(r => (
                <div key={r?.id}>
                  <div className="flex items-center gap-3">
                    <Image
                      src={DOCUMENT_URL + r?.profiles?.user_avatar || avatar}
                      alt={r?.profiles?.user_avatar || "User Avatar"}
                      width={58}
                      height={58}
                      className="h-[58px] w-[58px] rounded-md bg-[#ddd] object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-[#404040]">
                        {r?.profiles?.first_name} {r?.profiles?.last_name}
                      </h3>
                      <p className="font-medium text-[#404040]">
                        {formatDateToRelativeTime(r?.updated_at)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[#4E4E4E]">{r?.comments}</p>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-12 justify-start">
              <PaginationContent className={PAGINATION_STYLES.content}>
                <PaginationItem
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`${PAGINATION_STYLES.button} ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <ChevronLeft />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`${PAGINATION_STYLES.button} ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <ChevronRight />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </section>
  );
};
