"use client";

import { CertsProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { CertsModal } from "./modals";

export const CertsList = ({ certs }: { certs: CertsProps[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return certs.length === 0 ? (
    <p className="text-[#8B8B8B]">No certifications available.</p>
  ) : (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certs.map((p, index) => (
        <div key={index}>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="block space-y-1.5 text-left"
          >
            <h3 className="font-semibold text-[#343434]">{p?.title}</h3>
            <p>{p?.description}</p>
            <div className="aspect-video h-[110px] w-auto overflow-hidden rounded-lg hover:shadow-lg">
              <Image
                src={p?.image}
                alt={p?.title}
                className="aspect-video h-[110px] w-auto rounded-lg object-cover transition-transform hover:scale-105"
              />
            </div>
          </button>

          {p && isModalOpen && (
            <CertsModal cert={p} onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      ))}
    </div>
  );
};
