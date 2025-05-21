"use client";
import React from "react";
import Link from "next/link";
import NavBar from "@/components/navigation/web/NavBar";
import { Footer } from "@/components/navigation/web/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import image from "@/public/not-found.png";
import { webRoutes } from "@/utils";

export default function NotFound() {
  return (
    <div className="font-visbymedium antialiased">
      <NavBar />
      <main className="section-container space-y-6">
        <h1 className="inline-block rounded-[60px] border border-[#E5E7EB] p-3 text-[#696F79]">
          404 Error
        </h1>
        <h2 className="text-6xl font-semibold text-blue-950">Page not found</h2>
        <p>But don&apos;t worry, our team of experts is on it.</p>
        <div className="flex w-full max-w-[400px] flex-wrap gap-4">
          <Button asChild className="rounded-[60px]">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild className="rounded-[60px]" variant="outline">
            <Link href={webRoutes.listings}>Explore Listings</Link>
          </Button>
        </div>

        <Image
          src={image}
          alt="404 Not Found"
          width={500}
          height={500}
          layout="responsive"
        />
      </main>
      <Footer />
    </div>
  );
}
