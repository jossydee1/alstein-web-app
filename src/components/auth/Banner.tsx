import React from "react";
import style from "./style.module.scss";
import Link from "next/link";
import { webRoutes } from "@/utils";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import badge from "@/public/images/checkmark-badge.svg";
import dots from "@/public/images/dots-grid.svg";

const Banner = () => {
  return (
    <div className={style.banner}>
      <Link className="absolute" href={webRoutes.home} aria-label="Brand">
        <Image alt="Alstein Logo" src={logoLight} width={130} height={48} />
      </Link>

      <Image
        alt="dots"
        src={dots}
        width={82}
        height={76}
        className="absolute right-[113px] top-[113px]"
      />

      <div className="flex h-full flex-col items-center justify-center gap-6 text-white">
        <h2 className="text-5xl font-bold">
          Simplifying Equipment Rentals & Listings.
        </h2>

        <div className="grid w-full gap-x-6 gap-y-3 lg:grid-cols-2">
          <p className="flex items-center gap-2">
            <Image alt="checkmark badge" src={badge} width={24} height={24} />
            Hassle-Free Management
          </p>
          <p className="flex items-center gap-2">
            <Image alt="checkmark badge" src={badge} width={24} height={24} />
            Secure Transactions
          </p>
          <p className="flex items-center gap-2">
            <Image alt="checkmark badge" src={badge} width={24} height={24} />
            Quick & Easy Bookings{" "}
          </p>
          <p className="flex items-center gap-2">
            <Image alt="checkmark badge" src={badge} width={24} height={24} />
            Verified Listings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
