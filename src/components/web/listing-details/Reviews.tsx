"use client";

import React, { useEffect, useState } from "react";
import reviewImg from "@/public/images/review-image.svg";
import Image from "next/image";
import photo from "@/public/images/business.png";
import { Button } from "@/components/ui/button";
import { Check, Loader, Star } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { api, authRoutes, formatError } from "@/utils";
import { redirect } from "next/navigation";
import { useAuth } from "@/context";
import { toast } from "react-toastify";

const PAGINATION_STYLES = {
  content: "flex justify-center gap-3",
  button: "rounded-sm  border-[0.5px] border-[#7B7485]",
  isActive: "bg-[#2C2C2C] border-[#303030] text-white",
};

const Reviews = ({
  partnerId,
  averageRating,
  listingId,
}: {
  partnerId: string;
  averageRating: number;
  listingId: string;
}) => {
  const { userId, token } = useAuth();

  const reviews = [1, 1, 1, 1, 1];

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [filteredReviews, setFilteredReviews] = useState(reviews.slice(0, 2));
  const [isRatingSubmitting, setIsRatingSubmitting] = useState(false);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  useEffect(() => {
    const storedComment = localStorage.getItem("comment");
    const parsedComment = storedComment ? JSON.parse(storedComment) : null;

    return () => {
      setComment(parsedComment || "");
      localStorage.removeItem("comment");
    };
  }, []);

  const handleShowAllReviews = () => {
    if (filteredReviews.length === reviews.length) {
      setFilteredReviews(reviews.slice(0, 2));
    } else {
      setFilteredReviews(reviews);
    }
  };

  const handleRatingSubmit = async (score: number) => {
    if (!userId) {
      redirect(authRoutes.login);
    }

    try {
      setIsRatingSubmitting(true);
      setRating(score);

      const response = await api.post(
        "/partner/public/api/v1/ratings/submit-rating-score",
        {
          score: score,
          partner_id: partnerId,
          equipment_id: listingId,
          profile_id: userId,
        },
      );

      if (response.status === 200) {
        toast.success("Rating submitted successfully");
        setIsRatingSubmitted(true);
      } else {
        toast.error(
          formatError(response.data.message) || "Failed to submit rating",
        );
        setIsRatingSubmitted(false);
      }
    } catch (error) {
      toast.error(formatError(error));
      setIsRatingSubmitted(false);
    } finally {
      setIsRatingSubmitting(false);
    }
  };

  const handleWriteReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment) {
      toast.error("Please write a comment");
      return;
    }

    if (!userId) {
      localStorage.setItem("comment", JSON.stringify(comment));
      redirect(authRoutes.login);
    }

    try {
      setIsCommentSubmitting(true);
      const response = await api.post(
        `/partner/api/v1/comments/create-comment`,
        {
          comments: comment,
          partner_id: partnerId,
          equipment_id: listingId,
          profile_id: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        toast.success("Comment submitted successfully");
        setComment("");
        setIsCommentSubmitting(false);
        localStorage.removeItem("review");
        return;
      }
    } catch (error) {
      toast.error(formatError(error));
      setIsCommentSubmitting(false);
    } finally {
      setIsCommentSubmitting(false);
    }
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
          <div className="grid w-full max-w-[580px] gap-8 lg:gap-16">
            {filteredReviews.map((_, i) => (
              <div key={i}>
                <div className="flex items-center gap-3">
                  <Image
                    src={photo}
                    alt="Business"
                    className="h-[58px] w-[58px] rounded-md bg-[#ddd] object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-[#404040]">
                      Ikechukwu Jude
                    </h3>
                    <p className="font-medium text-[#404040]">1 month ago</p>
                  </div>
                </div>
                <p className="mt-3 text-[#4E4E4E]">
                  I recently booked an equipment through Alstein and was
                  incredibly impressed with the experience. The process was
                  seamless and efficient, saving me a lot of time.
                </p>{" "}
              </div>
            ))}
          </div>

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

          <Button
            type="button"
            variant="outline"
            onClick={handleShowAllReviews}
            className="mt-8 w-fit px-6 py-2.5 font-medium text-[#031330]"
          >
            {filteredReviews.length === reviews.length
              ? "Show less reviews"
              : "Show all reviews"}
          </Button>
        </div>

        <div
          id="rating"
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
        </div>
      </div>
    </section>
  );
};

export default Reviews;
