"use client";

import React from "react";
import Banner from "./Banner";
import style from "./style.module.scss";
import Link from "next/link";
import { authRoutes, webRoutes } from "@/utils";
import Image from "next/image";
import logoLight from "@/public/logo-rectangle-light.svg";
import { ArrowRight, Handshake } from "lucide-react";

const RegisterContent = () => {
  return (
    <div className={style.wrapper}>
      <Banner />

      <div className={style.container}>
        <div className={style.topBar}>
          <Link
            className={style.logoLink}
            href={webRoutes.home}
            aria-label="Brand"
          >
            <Image alt="Company Logo" src={logoLight} width={130} height={48} />
          </Link>

          <p className="w-full text-right">
            Already have an account?{" "}
            <Link
              className="text-brandColor"
              href={webRoutes.home}
              aria-label="Brand"
            >
              Sign In
            </Link>
          </p>
        </div>

        <main className={`${style.formWrapper} h-[80%]`}>
          <header className={style.header}>
            <h1 className="text-[30px] font-bold text-[#2D2D2D]">Join Us!</h1>
            <p className={style.subtitle}>
              To begin this journey, tell us what type of account you will be
              opening.
            </p>
          </header>

          <div className="grid w-full gap-y-3">
            <Link
              href={authRoutes.signup}
              className="group flex w-full items-center justify-between rounded-lg border border-[#8692A6] p-6 transition-all hover:border-brandColor hover:ring-1 hover:ring-brandColor"
            >
              <div className="flex items-center gap-x-4">
                <div className="rounded-full bg-[#8692A6] p-3 text-white transition-all group-hover:bg-brandColor">
                  <Handshake size={16} />
                </div>

                <div>
                  <h2 className="mb-2 font-semibold">Individual</h2>
                  <p className="text-sm text-[#8692A6]">
                    Book and manage services easily.
                  </p>
                </div>
              </div>

              <ArrowRight
                size={20}
                className="text-[#8692A6] transition-all group-hover:text-brandColor"
              />
            </Link>

            <Link
              href={authRoutes.partner_signup}
              className="group flex w-full items-center justify-between rounded-lg border border-[#8692A6] p-6 transition-all hover:border-brandColor hover:ring-1 hover:ring-brandColor"
            >
              <div className="flex items-center gap-x-4">
                <div className="rounded-full bg-[#8692A6] p-3 text-white transition-all group-hover:bg-brandColor">
                  <Handshake size={16} />
                </div>

                <div>
                  <h2 className="mb-2 font-semibold">Partner</h2>
                  <p className="text-sm text-[#8692A6]">
                    List your services and get booked.
                  </p>
                </div>
              </div>

              <ArrowRight
                size={20}
                className="text-[#8692A6] transition-all group-hover:text-brandColor"
              />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterContent;
