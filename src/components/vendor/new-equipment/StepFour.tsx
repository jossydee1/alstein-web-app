import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import map from "@/public/images/google-map.png";
import Image from "next/image";

const StepFour = () => {
  return (
    <div className="space-y-9">
      <main className="dashboard-section-card">
        <header className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title text-[#172554]">
              Location
            </h1>
            <p className="dashboard-section-card-description">
              Provide the location of the equipment.
            </p>
          </div>
          <p className="text-3xl font-semibold text-[#172554]">Step 4</p>
        </header>

        <section className="mt-7 space-y-7">
          <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
            <div className="max-w-[420px]">
              <Label htmlFor="address" className="mb-2">
                Street address
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="address"
                name="address"
                placeholder="e.g 123 Main St, City, Country"
                required
              />
            </div>

            <Image
              src={map}
              alt="Google Map"
              className="h-[380px] w-full object-cover"
            />
          </form>

          <div className="flex flex-wrap justify-between gap-4">
            <Button variant="outline" type="button">
              Back
            </Button>
            <Button className="buttonBlue2" type="button">
              Save and Continue
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StepFour;
