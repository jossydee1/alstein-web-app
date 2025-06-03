import { Button } from "@/components/ui/button";
import { authRoutes } from "@/utils";
import Link from "next/link";
import React from "react";
import triangles from "@/public/images/about/triangles.svg";
import Image from "next/image";

const CTA = () => {
  return (
    <div className="section-container">
      <section
        style={{
          backgroundImage: "url('/images/about/purpose.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative overflow-hidden rounded-[25px] text-white"
      >
        <div className="section-container bg-black/65">
          <div className="absolute -right-[60px] top-0">
            <Image src={triangles} alt="" width="140" height="84" />
          </div>

          <div className="mx-auto w-full max-w-[800px] text-center">
            <h2 className="text-5xl font-bold">Powered by Purpose</h2>
            <p className="my-9 text-2xl leading-8">
              At Alstein, we believe access to scientific and diagnostic tools
              should never be a privilege—it should be a right. We are Powered
              by Purpose to make science, innovation, and healthcare more
              inclusive, accessible, and transformative.
            </p>

            <Button asChild className="w-full max-w-[270px] rounded-full p-4">
              <Link
                href={authRoutes.register}
                className="!text-2xl font-semibold"
              >
                Join us
              </Link>
            </Button>
          </div>

          <div className="bottom-[26px] left-[34px] mt-4 md:absolute">
            <Image src={triangles} alt="" width="140" height="84" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;
