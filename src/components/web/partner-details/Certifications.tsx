import React from "react";
import { DocumentProps } from "@/types";
import { CertsList } from "@/components/common/CertsList";

const Certifications = ({ certs }: { certs: DocumentProps[] }) => {
  return (
    <section>
      <div className="mb-5 md:mb-10">
        <h2 className="font-500 mb-2 text-2xl">Trust & Certification</h2>
        <p className="max-w-[440px]">
          We are committed to providing transparent and reliable services. To
          ensure trust and safety, we&apos;ve made the following documents
          available for your review:
        </p>
      </div>
      <CertsList certs={certs} />
    </section>
  );
};

export default Certifications;
