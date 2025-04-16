import React from "react";
import Image from "next/image";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BadgeCheck, Building2, Globe, Mail, Phone, Star } from "lucide-react";
import Link from "next/link";
import { PartnerProps } from "@/types";
import { formatDateToRelativeTimeYearWithTime } from "@/utils";

const Profile = ({
  partnerData,
  rating,
  reviews,
}: {
  partnerData: PartnerProps;
  rating: number;
  reviews: number;
}) => {
  return (
    <article className="mt-2 flex flex-col items-start justify-between gap-7 lg:flex-row">
      <section className="h-full w-full lg:min-w-[400px] lg:max-w-[445px]">
        <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-md border p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-7">
            {partnerData?.logo ? (
              <Image
                src={partnerData?.logo}
                alt={partnerData?.name || "Partner Logo"}
                width={120}
                height={120}
              />
            ) : (
              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#ddd]">
                <Building2 size={70} color="#676767" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-[#161616]">
                {partnerData?.name}
              </h3>
              <p className="font-medium capitalize text-[#8B8B8B]">
                {partnerData?.type.toLocaleLowerCase()}
              </p>
              {partnerData?.is_verified && (
                <p className="flex items-center gap-1 text-sm font-medium text-[#8B8B8B]">
                  Verified Partner
                  <BadgeCheck className="fill-brandColor text-white" />
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-2 space-x-2 text-left md:flex-col md:items-end">
            <p className="grid gap-1 md:w-full">
              <span className="flex items-center gap-1 text-2xl font-black text-[#161616]">
                {rating.toFixed(1)} <Star size={24} fill="#161616" />
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-[#8B8B8B]">
                Rating
              </span>
            </p>

            <hr className="border border-[#F2F2F2] md:w-full" />

            <p className="grid gap-1 md:w-full">
              <span className="flex items-center gap-1 text-2xl font-black text-[#161616]">
                {formatDateToRelativeTimeYearWithTime(
                  partnerData.created_at || "",
                )}
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-[#8B8B8B]">
                Years of service
              </span>
            </p>

            <hr className="border border-[#F2F2F2] md:w-full" />

            <p className="grid gap-1 md:w-full">
              <span className="flex items-center gap-1 text-2xl font-black text-[#161616]">
                {reviews}
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-[#8B8B8B]">
                Reviews
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {partnerData?.support_email && (
            <Link
              href={`mailto:${partnerData?.support_email}`}
              className="flex items-center gap-2 text-[#343434] hover:underline"
            >
              <Mail size={24} />
              {partnerData?.support_email}
            </Link>
          )}
          {/* {partnerData?.support_number && (
            <Link
              href="tel:1234567890"
              className="flex items-center gap-2 text-[#343434] hover:underline"
            >
              <Phone size={24} />
              {partnerData?.support_number}
            </Link>
          )}
          {partnerData?.website && (
            <Link
              href={partnerData?.website}
              className="flex items-center gap-2 text-[#343434] hover:underline"
            >
              <Globe size={24} />
              {partnerData?.website}
            </Link>
          )} */}
        </div>
      </section>

      <section className="w-full space-y-3 lg:max-w-[541px]">
        <h2 className="text-2xl font-black text-[#161616]">
          About {partnerData?.name}
        </h2>

        <p className="">{partnerData?.bio}</p>

        <ul className="space-y-2">
          <li>
            <span className="font-semibold text-[#343434]">Location:</span>{" "}
            <span>
              {partnerData?.address}, {partnerData?.city}, {partnerData?.state},{" "}
              {partnerData?.country}
            </span>
          </li>
          <li>
            <span className="font-semibold text-[#343434]">
              Specialization:
            </span>{" "}
            <span>{partnerData?.specializations}</span>
          </li>
          <li>
            <span className="font-semibold text-[#343434]">Mission:</span>{" "}
            <span>{partnerData?.mission}</span>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default Profile;
