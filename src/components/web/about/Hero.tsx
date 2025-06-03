import Image from "next/image";
import React from "react";
import image1 from "@/public/images/about/about-image-1.png";
import image2 from "@/public/images/about/about-image-2.png";
import image3 from "@/public/images/about/about-image-3.png";
import image4 from "@/public/images/about/about-image-4.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { webRoutes } from "@/utils";

const Hero = () => {
  return (
    <div className="min-h-screen">
      <header className="section-container">
        <section className="space-y-7 text-center">
          <h1 className="text-[57px] font-bold leading-[72px] text-blue-950">
            Empowering Science, Innovation, and Healthcare Across Africa
          </h1>
          <p className="text-2xl leading-8 text-[#6B7280]">
            We&apos;re building the infrastructure for a science-powered future
            where ideas transform into real-world solutions and healthcare
            innovations reach those who need them most
          </p>
          <div className="grid grid-cols-2 items-center justify-center gap-7 md:grid-cols-4">
            <Image
              src={image1}
              alt=""
              width="276"
              height="276"
              className="h-auto w-[276px] md:order-1 md:w-full"
            />
            <Image
              src={image2}
              alt=""
              width="276"
              height="276"
              className="h-auto w-[276px] md:order-2 md:w-full"
            />
            <Image
              src={image4}
              alt=""
              width="276"
              height="276"
              className="h-auto w-[276px] md:order-4 md:w-full"
            />
            <Image
              src={image3}
              alt=""
              width="276"
              height="276"
              className="h-auto w-[276px] md:order-3 md:w-full"
            />
          </div>
          <Button asChild className="rounded-full">
            <Link href={webRoutes.listings}>Explore our Platform</Link>
          </Button>
        </section>
      </header>
    </div>
  );
};

export default Hero;
