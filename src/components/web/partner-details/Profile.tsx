import React from "react";
import photo from "@/public/images/business.png";
import Image from "next/image";
import { BadgeCheck, Mail, Phone, Star } from "lucide-react";
import Link from "next/link";

const Profile = () => {
  return (
    <article className="mt-2 flex flex-col items-start justify-between gap-7 lg:flex-row">
      <section className="h-full w-full lg:min-w-[400px] lg:max-w-[445px]">
        <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-md border p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-7">
            <Image
              src={photo}
              alt="Business"
              className="h-[120px] w-[120px] rounded-full bg-[#ddd] object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-[#161616]">
                HealthPro Labs
              </h3>
              <p className="font-medium text-[#8B8B8B]">Lab Partner</p>
              <p className="flex items-center gap-1 text-sm font-medium text-[#8B8B8B]">
                Verified Partner
                <BadgeCheck className="fill-brandColor text-white" />
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-2 space-x-2 text-left md:flex-col md:items-end">
            <p className="grid gap-1 md:w-full">
              <span className="flex items-center gap-1 text-2xl font-black text-[#161616]">
                3.8 <Star size={24} fill="#161616" />
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-[#8B8B8B]">
                Rating
              </span>
            </p>

            <hr className="border border-[#F2F2F2] md:w-full" />

            <p className="grid gap-1 md:w-full">
              <span className="flex items-center gap-1 text-2xl font-black text-[#161616]">
                10
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-[#8B8B8B]">
                Years of service
              </span>
            </p>

            <hr className="border border-[#F2F2F2] md:w-full" />

            <p className="grid gap-1 md:w-full">
              <span className="flex items-center gap-1 text-2xl font-black text-[#161616]">
                2
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-[#8B8B8B]">
                Reviews
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Link
            href="mailto:support@greenlab.com"
            className="flex items-center gap-2 text-[#343434] hover:underline"
          >
            <Mail size={24} />
            support@greenlab.com
          </Link>
          <Link
            href="tel:1234567890"
            className="flex items-center gap-2 text-[#343434] hover:underline"
          >
            <Phone size={24} />
            (123) 456-7890
          </Link>
        </div>
      </section>

      <section className="w-full space-y-3 lg:max-w-[541px]">
        <h2 className="text-2xl font-black text-[#161616]">
          About HealthPro Laboratory
        </h2>

        <p className="">
          Healthpro Labs is involved in the providing reliable diagnostic
          testing and research equipment rental. Trusted by medical
          professionals and researchers for over 10 years.
        </p>

        <ul className="space-y-2">
          <li>
            <span className="font-semibold text-[#343434]">Location:</span>{" "}
            <span>Yaba, Lagos</span>
          </li>
          <li>
            <span className="font-semibold text-[#343434]">
              Specialization:
            </span>{" "}
            <span>Diagnostic testing, equipment rental, lab space rental</span>
          </li>
          <li>
            <span className="font-semibold text-[#343434]">Mission:</span>{" "}
            <span>
              We aim to provide accurate and timely results to support the
              health and research industries.
            </span>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default Profile;
