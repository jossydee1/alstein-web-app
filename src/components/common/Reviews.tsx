"use client";

import React, { useEffect, useState } from "react";
import reviewImg from "@/public/images/review-image.svg";
import Image from "next/image";
import avatar from "@/public/icons/avatar.svg";
import { Button } from "@/components/ui/button";
import {
  // Check,
  ChevronLeft,
  ChevronRight,
  // Loader, Star
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  // api,
  // authRoutes,
  DOCUMENT_URL,
  formatDateToRelativeTime,
  // formatError,
  // webRoutes,
} from "@/utils";
// import { redirect, useSearchParams } from "next/navigation";
// import { useAuth } from "@/context";
// import { toast } from "react-toastify";
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
  // refetchRating,
}: {
  partnerId: string;
  averageRating: number;
  listingId?: string;
  refetchRating: () => void;
}) => {
  // const { userId, token } = useAuth();
  // const searchParams = useSearchParams();
  // const savedComment = searchParams.get("comment");

  // useEffect(() => {
  //   if (savedComment) {
  //     setComment(savedComment);
  //   }
  // }, [savedComment]);

  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");
  // const [isRatingSubmitting, setIsRatingSubmitting] = useState(false);
  // const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  // const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const itemsPerPage = showAllReviews ? 50 : 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [commentsData, setCommentsData] = useState<CommentProps[]>([]);

  const url = listingId
    ? `/partner/public/api/v1/comments/get-comments?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}&equipment_id=${listingId}&partner_id=${partnerId}`
    : `/partner/public/api/v1/comments/get-comments?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}&partner_id=${partnerId}`;

  const {
    data: comments,
    // refetch: refetchComments
  } = useClientFetch<{
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

  const handleShowAllReviews = () => {
    setCurrentPage(1); // reset to page 1
    setShowAllReviews(prev => !prev);
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

  // const redirectUrl = `${authRoutes?.login}?redirect=${encodeURIComponent(`${webRoutes?.listings}/${listingId}`)}&id=review-form&comment=${encodeURIComponent(comment)}`;

  // const handleRatingSubmit = async (score: number) => {
  //   if (!userId) {
  //     redirect(redirectUrl);
  //   }

  //   try {
  //     setIsRatingSubmitting(true);
  //     setRating(score);

  //     const response = await api.post(
  //       "/partner/public/api/v1/ratings/submit-rating-score",
  //       {
  //         score,
  //         partner_id: partnerId,
  //         equipment_id: listingId,
  //         profile_id: userId,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     );

  //     if (response?.status === 200) {
  //       toast.success("Rating submitted successfully");
  //       setIsRatingSubmitted(true);
  //       refetchRating();
  //     } else {
  //       toast.error(
  //         formatError(response?.data?.message) || "Failed to submit rating",
  //       );
  //       setIsRatingSubmitted(false);
  //     }
  //   } catch (error) {
  //     toast.error(formatError(error));
  //     setIsRatingSubmitted(false);
  //   } finally {
  //     setIsRatingSubmitting(false);
  //   }
  // };

  // const handleWriteReview = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!comment) {
  //     toast.error("Please write a comment");
  //     return;
  //   }

  //   if (!userId) {
  //     redirect(redirectUrl);
  //   }

  //   try {
  //     setIsCommentSubmitting(true);
  //     const response = await api.post(
  //       `/partner/api/v1/comments/create-comment`,
  //       {
  //         comments: comment,
  //         partner_id: partnerId,
  //         equipment_id: listingId,
  //         profile_id: userId,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     );

  //     if (response?.status === 200) {
  //       toast.success("Comment submitted successfully");
  //       setComment("");
  //       refetchComments();
  //     }
  //   } catch (error) {
  //     toast.error(formatError(error));
  //   } finally {
  //     setIsCommentSubmitting(false);
  //   }
  // };

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
            <div className="grid w-full gap-8 lg:gap-16">
              {commentsData.map(r => (
                <div key={r?.id}>
                  <div className="flex items-center gap-3">
                    <Image
                      src={DOCUMENT_URL + r?.profiles?.user_avatar || avatar}
                      alt={r?.profiles?.user_avatar || "User Avatar"}
                      width={58}
                      height={58}
                      className="bg-[#ddd]object-cover h-[58px] w-[58px] rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-[#404040]">
                        {r?.profiles?.first_name} {r?.profiles?.last_name}
                      </h3>
                      <p className="font-medium text-[#404040]">
                        {formatDateToRelativeTime(r?.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[#4E4E4E]">{r?.comments}</p>
                </div>
              ))}
            </div>
          )}

          {showAllReviews && totalPages > 1 && (
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

          {comments && comments?.item_count > 2 && (
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

        {/* <div
          id="review-form"
          className="mt-16 w-full max-w-[480px] gap-4 rounded-md border border-[#E6E7EA] p-4 lg:mt-0"
        >
          <h3 className="text-xl font-semibold text-[#010814]">
            Share your feedback
          </h3>

          <form onSubmit={handleWriteReview}>
            <div className="mb-4">
              <label className="mb-16 text-sm text-[#354259]">
                How was your experience?
              </label>
              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      !isRatingSubmitted &&
                      !isRatingSubmitting &&
                      handleRatingSubmit(star)
                    }
                    className="p-1"
                    disabled={isRatingSubmitting || isRatingSubmitted}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`${
                        star <= rating
                          ? "fill-[#FB9506] text-[#FB9506]"
                          : "fill-[#EBEDEF] text-[#354259]"
                      } ${isRatingSubmitting || isRatingSubmitted ? "opacity-70" : ""} transition-colors`}
                      size={24}
                    />
                  </button>
                ))}
                {isRatingSubmitting && (
                  <span className="ml-2 text-sm text-gray-500">
                    <Loader className="animate-spin" />
                  </span>
                )}
                {isRatingSubmitted && (
                  <span className="ml-2 text-sm text-green-600">
                    <Check />
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="text-sm text-[#354259]">
                Can you tell us more?
              </label>

              <textarea
                id="comment"
                name="comment"
                className="block h-[160px] w-full rounded-md border border-[#E6E7EA] p-3"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Write your review here..."
                minLength={10}
                required
              ></textarea>
            </div>

            <div className="mt-4 flex gap-4">
              <Button
                type="submit"
                variant="outline"
                className="flex-1 bg-[#2D84F1] px-6 py-2.5 font-medium text-white disabled:opacity-50"
                disabled={isCommentSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </div> */}
      </div>
    </section>
  );
};
