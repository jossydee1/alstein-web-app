import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEquipmentForm } from "@/context";
import { useClientFetch } from "@/hooks";
import { CategoryProps } from "@/types";
import { LoadingState } from "@/components/common";

const StepOne = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { formData, updateFormData } = useEquipmentForm();
  const [category, setCategory] = useState(formData?.category_id || "");
  const [serviceType, setServiceType] = useState(formData?.service_type || "");
  const [billType, setBilType] = useState(formData?.bill_type || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!category || !serviceType || !billType) {
      setError("Please select a category, service type, and bill type.");
      return;
    }
    setError("");

    updateFormData({
      category_id: category,
      service_type: serviceType,
      bill_type: billType,
    });
    onNext();
  };

  const { data, isLoading } = useClientFetch<CategoryProps[]>({
    endpoint: "/client/public/api/v1/equipments/get-equipment-category",
  });

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateFormData({ category_id: value });
  };
  const handleServiceTypeChange = (value: string) => {
    setServiceType(value);
    updateFormData({ service_type: value });
  };
  const handleBillTypeChange = (value: string) => {
    setBilType(value);
    updateFormData({ bill_type: value });
  };

  return (
    <>
      {isLoading && <LoadingState />}
      <div className="space-y-9">
        <main className="dashboard-section-card">
          <header className="flex flex-row flex-wrap items-start justify-between gap-4">
            <div className="dashboard-section-card-header">
              <h1 className="dashboard-section-card-title text-[#172554]">
                Category & Availability
              </h1>
              <p className="dashboard-section-card-description">
                Choose the right category and how your equipment can be
                accessed.
              </p>
            </div>
            <p className="text-3xl font-semibold text-[#172554]">Step 1</p>
          </header>

          <section className="mt-7 space-y-7">
            <form className="mb-8 grid grid-cols-1 gap-x-8 gap-y-4">
              <div className="w-full max-w-[420px]">
                <Label htmlFor="category" className="mb-2">
                  Category
                </Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger
                    className="w-full"
                    id="category"
                    name="category"
                  >
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map(category => (
                      <SelectItem key={category?.id} value={category?.id}>
                        {category?.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Label htmlFor="serviceType" className="mb-2">
                  Availability
                </Label>
                <RadioGroup
                  value={serviceType}
                  onValueChange={handleServiceTypeChange}
                  className="flex flex-wrap gap-3"
                  id="serviceType"
                  name="serviceType"
                >
                  <div className="flex w-full items-center gap-2.5 rounded-md border border-[#E5E7EB] p-4 focus-within:border-brandColor sm:max-w-[300px]">
                    <RadioGroupItem value="lease" id="lease" />
                    <Label htmlFor="lease">Lease</Label>
                  </div>
                  <div className="flex w-full items-center gap-2.5 rounded-md border border-[#E5E7EB] p-4 focus-within:border-brandColor sm:max-w-[300px]">
                    <RadioGroupItem value="on_site" id="on_site" />
                    <Label htmlFor="on_site">Onsite</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="">
                <Label htmlFor="billingType" className="mb-2">
                  Billing Method
                </Label>
                <RadioGroup
                  value={billType}
                  onValueChange={handleBillTypeChange}
                  className="flex flex-wrap gap-3"
                  id="billingType"
                  name="billingType"
                >
                  <div className="flex w-full items-center gap-2.5 rounded-md border border-[#E5E7EB] p-4 focus-within:border-brandColor sm:max-w-[300px]">
                    <RadioGroupItem value="per_day" id="per_day" />
                    <Label htmlFor="per_day">Per Day</Label>
                  </div>
                  <div className="flex w-full items-center gap-2.5 rounded-md border border-[#E5E7EB] p-4 focus-within:border-brandColor sm:max-w-[300px]">
                    <RadioGroupItem value="per_Sample" id="per_Sample" />
                    <Label htmlFor="per_Sample">Per Sample</Label>
                  </div>
                </RadioGroup>
              </div>
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
              <Button
                className="buttonBlue2"
                type="button"
                onClick={handleNext}
              >
                Save and Continue
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default StepOne;
