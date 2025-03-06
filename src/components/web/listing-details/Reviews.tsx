import React from "react";
import reviewImg from "@/public/images/review-image.svg";
import Image from "next/image";
import photo from "@/public/images/business.png";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

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

      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
        <div className="grid w-full max-w-[580px] gap-8 lg:gap-16">
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

        <div className="mt-16 w-full max-w-[480px] gap-4 rounded-md border border-[#E6E7EA] p-4 lg:mt-0">
          <h3 className="text-xl font-semibold text-[#010814]">
            Share your feedback
          </h3>

          <form>
            <div className="mb-4">
              <label className="mb-16 text-sm text-[#354259]">
                How was you experience?
              </label>
              <div className="mt-2 flex gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full bg-[#FEF2E1] p-3"
                >
                  <ThumbsUp className="fill-[#FB9506] text-white" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full bg-[#EBEDEF] p-3"
                >
                  <ThumbsDown className="fill-[#FFFFFF] text-[#354259]" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#354259]">
                Can you tell us more?
              </label>

              <textarea className="block h-[160px] w-full rounded-md border border-[#E6E7EA] p-3"></textarea>
            </div>

            <div className="mt-4 flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 px-6 py-2.5 font-medium text-[#031330]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-[#2D84F1] px-6 py-2.5 font-medium text-white"
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
