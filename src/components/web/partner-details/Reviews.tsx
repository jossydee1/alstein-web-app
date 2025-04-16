"use client";

import React, { useState, useMemo } from "react";
import reviewImg from "@/public/images/review-image.svg";
import Image from "next/image";
import avatar from "@/public/icons/avatar.svg";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatDateToRelativeTime } from "@/utils";
import { CommentProps } from "@/types";

const PAGINATION_STYLES = {
  content: "flex justify-center gap-3",
  button: "rounded-sm  border-[0.5px] border-[#7B7485]",
  isActive: "bg-[#2C2C2C] border-[#303030] text-white",
};

const Reviews = ({
  averageRating,
  comments,
}: {
  averageRating: number;
  comments: CommentProps[];
}) => {
  const sortedComments = useMemo(
    () =>
      [...comments].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [comments],
  );

  const [showAllReviews, setShowAllReviews] = useState(false);

  const filteredReviews = showAllReviews
    ? sortedComments
    : sortedComments.slice(0, 2);

  const handleShowAllReviews = () => {
    setShowAllReviews(prev => !prev);
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
            className="object-fit h-[54px] w-[54px]"
          />
          <p
            className="text-5xl font-[500] text-[#5D5D5D]"
            aria-label="Average Rating"
          >
            {averageRating.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
        <div>
          {sortedComments.length === 0 ? (
            <p className="text-center text-gray-500">
              No reviews yet, be the first one!
            </p>
          ) : (
            <div className="grid w-full max-w-[580px] gap-8 lg:gap-16">
              {filteredReviews.map(r => (
                <div key={r.id}>
                  <div className="flex items-center gap-3">
                    <Image
                      src={r.profiles.user_avatar || avatar}
                      alt={r.profiles.user_avatar || "User Avatar"}
                      width={58}
                      height={58}
                      className="h-[58px] w-[58px] rounded-md bg-[#ddd] object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-[#404040]">
                        {r.profiles.first_name} {r.profiles.last_name}
                      </h3>
                      <p className="font-medium text-[#404040]">
                        {formatDateToRelativeTime(r.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[#4E4E4E]">{r.comments}</p>
                </div>
              ))}
            </div>
          )}

          {filteredReviews.length > 20 && (
            <Pagination className="mt-4 justify-start">
              <PaginationContent className={PAGINATION_STYLES.content}>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className={PAGINATION_STYLES.button}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className={`${PAGINATION_STYLES.button} ${PAGINATION_STYLES.isActive}`}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className={PAGINATION_STYLES.button}>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className={PAGINATION_STYLES.button}>
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className={PAGINATION_STYLES.button} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className={PAGINATION_STYLES.button}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          {sortedComments.length > 2 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleShowAllReviews}
              className="mt-8 w-fit px-6 py-2.5 font-medium text-[#031330]"
            >
              {showAllReviews ? "Show less reviews" : "Show all reviews"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
