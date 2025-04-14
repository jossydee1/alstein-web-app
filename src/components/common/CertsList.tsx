"use client";

import { DocumentProps } from "@/types";
import React from "react";
import { Eye } from "lucide-react";
import { DOCUMENT_URL } from "@/utils";
import Link from "next/link";

export const CertsList = ({ certs }: { certs: DocumentProps[] }) => {
  return certs.length === 0 ? (
    <p className="text-[#8B8B8B]">No certifications available.</p>
  ) : (
    <div className="grid grid-cols-1 gap-3">
      {certs.map((cert, index) => (
        <div
          key={index}
          className="inline-flex items-start justify-start gap-4"
        >
          <div className="">
            <h3 className="font-semibold capitalize text-[#343434]">
              {cert?.name?.replace(/-/g, " ")}
            </h3>
          </div>
          <Link
            href={DOCUMENT_URL + cert?.path || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:underline"
          >
            <Eye size={20} />
            <span className="">View</span>
          </Link>
        </div>
      ))}
    </div>
  );
};
