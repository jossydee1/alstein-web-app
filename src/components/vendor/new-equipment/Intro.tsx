import { Button } from "@/components/ui/button";
import {
  ChartBarStacked,
  FlaskConical,
  GalleryThumbnails,
  LocateFixed,
  // RefreshCcw,
} from "lucide-react";
import React from "react";

const Intro = ({ onNext }: { onNext: () => void }) => {
  const STYLES = {
    card: "flex flex-row items-center gap-4 rounded-md border border-[#E5E7EB] p-5",
    icon: "text-[#757575] min-w-7",
    top: "mb-1.5 text-lg font-medium text-[#172554]",
    bottom: "text-[#6B7280]",
  };

  return (
    <div className="space-y-9">
      <header className="dashboard-section-card-header">
        <h1 className="dashboard-section-card-title">Start a New Listing</h1>
        <p className="dashboard-section-card-description">
          Provide accurate details to ensure visibility and seamless bookings
        </p>
      </header>

      <main className="dashboard-section-card">
        <header className="dashboard-section-card-header">
          <h2 className="dashboard-section-card-title !text-lg !font-medium">
            Make your equipment available for booking in just a few steps
          </h2>
          <p className="dashboard-section-card-description">
            Provide clear details to attract the right customers and maximize
            your earning
          </p>
        </header>

        <section className="mt-7 space-y-7">
          <div className={STYLES.card}>
            <ChartBarStacked size="24" className={STYLES.icon} />

            <div>
              <p className={STYLES.top}>Category & Availability</p>
              <p className={STYLES.bottom}>
                Choose the right category and how your equipment can be
                accessed.
              </p>
            </div>
          </div>
          <div className={STYLES.card}>
            <FlaskConical size="24" className={STYLES.icon} />

            <div>
              <p className={STYLES.top}>Equipment Details</p>
              <p className={STYLES.bottom}>
                Add the name, description, and price to help customers
                understand your equipment better.
              </p>
            </div>
          </div>
          <div className={STYLES.card}>
            <LocateFixed size="24" className={STYLES.icon} />

            <div>
              <p className={STYLES.top}>Location</p>
              <p className={STYLES.bottom}>
                Set where your equipment is available
              </p>
            </div>
          </div>
          <div className={STYLES.card}>
            <GalleryThumbnails size="24" className={STYLES.icon} />

            <div>
              <p className={STYLES.top}>Images & Specifications</p>
              <p className={STYLES.bottom}>
                Showcase your equipment with high-quality images and highlight
                its specifications.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="buttonBlue" onClick={onNext}>
              Get Started
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Intro;
