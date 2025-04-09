"use client";

import { CertsProps } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CertsModal = ({
  cert,
  onClose,
}: {
  cert: CertsProps;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 p-4 py-10" onClick={onClose}>
      <section
        className="relative m-auto overflow-auto rounded-2xl bg-white"
        style={{
          width: "calc(100vw - 32px)",
          maxWidth: "1400px",
          height: "calc(100vh - 80px)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <header className="sticky left-0 top-0 flex w-full items-center justify-between gap-4 border-b border-b-[#ECECEC] bg-white px-6 py-3 lg:py-6">
          <h2 className="text-2xl font-semibold text-[#161616]">Media</h2>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-[#F5F5F5]"
          >
            <X size={24} />
          </button>
        </header>

        <div className="mx-8 my-6 flex flex-col-reverse gap-6 lg:flex-row">
          <Image
            src={cert.image || ""}
            alt={cert.title || ""}
            className="h-full w-auto flex-1"
          />

          <div className="w-full lg:mt-8 lg:max-w-[288px]">
            <h3 className="font-semibold text-[#343434]">{cert.title}</h3>
            <p>{cert.description}</p>
            <Link href={cert.download_url || ""} className="text-[#3784FF]">
              [ download Link ]
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
