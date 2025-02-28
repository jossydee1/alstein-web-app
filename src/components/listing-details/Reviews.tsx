import React from "react";
import reviewImg from "@/public/images/review-image.svg";
import Image from "next/image";
import photo from "@/public/images/business.png";
import { Button } from "../ui/button";

const Reviews = () => {
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
            3.82
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="grid max-w-[580px] gap-16">
          {[1, 1].map((_, i) => (
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

          <Button
            variant="outline"
            className="w-fit px-6 py-2.5 font-medium text-[#031330]"
          >
            Show all reviews
          </Button>
        </div>

        <div className="gap-4 border border-[#E6E7EA] p-4">
          <h3 className="text-xl font-semibold text-[#010814]">
            Share your feedback
          </h3>

          <form>
            <label className="mb-16 text-sm text-[#354259]">
              How was you experience?
            </label>
            <textarea
              className="mt-1 block h-[120px] w-full rounded-md border border-[#E6E7EA] p-3"
              placeholder="Write your review here..."
            ></textarea>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
