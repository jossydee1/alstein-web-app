import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import map from "@/public/images/google-map.png";
import Image from "next/image";
import { useEquipmentForm } from "@/context";

const StepThree = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { formData, updateFormData } = useEquipmentForm();
  const [address, setAddress] = useState(formData?.address || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!address) {
      setError("Please enter a valid address.");
      return;
    }
    setError("");

    updateFormData({ address });
    onNext();
  };

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
          <p className="text-3xl font-semibold text-[#172554]">Step 3</p>
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
                value={address}
                onChange={e => setAddress(e.target.value)}
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

          {error && (
            <p className="w-full rounded-md bg-red-100 p-4 text-center text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-wrap justify-between gap-4">
            <Button variant="outline" type="button" onClick={onBack}>
              Back
            </Button>
            <Button className="buttonBlue2" type="button" onClick={handleNext}>
              Save and Continue
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StepThree;
