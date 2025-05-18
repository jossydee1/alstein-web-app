import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import map from "@/public/images/google-map.png";
import Image from "next/image";
import { useEquipmentForm } from "@/context";
import { ListingInfoProps } from "@/types";

interface StepThreeProps {
  onNext: () => void;
  onBack: () => void;
  equipmentData: ListingInfoProps;
}

const StepThree = ({ onNext, onBack, equipmentData }: StepThreeProps) => {
  const { formData, updateFormData } = useEquipmentForm();
  const [address, setAddress] = useState(
    formData?.address || equipmentData.address || "",
  );
  // const [city, setCity] = useState(formData?.city || equipmentData.city || "");
  // const [country, setCountry] = useState(formData?.country || equipmentData.country || "");
  // const [latitude, setLatitude] = useState(formData?.latitude || equipmentData.latitude || "");
  // const [longitude, setLongitude] = useState(formData?.longitude || equipmentData.longitude || "");

  const [error, setError] = useState("");

  const handleNext = () => {
    if (!address) {
      setError("Please enter a valid address.");
      return;
    }
    setError("");
    updateFormData({
      address: equipmentData.address || "",
      city: equipmentData.city || "",
      country: equipmentData.country || "",
      latitude: equipmentData.latitude || "",
      longitude: equipmentData.longitude || "",
    });
    onNext();
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    updateFormData({
      address: e.target.value,
    });
  };
  // const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCity(e.target.value);
  //   updateFormData({
  //     city: e.target.value,
  //   });
  // };
  // const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCountry(e.target.value);
  //   updateFormData({
  //     country: e.target.value,
  //   });
  // };
  // const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLatitude(e.target.value);
  //   updateFormData({
  //     latitude: e.target.value,
  //   });
  // };
  // const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLongitude(e.target.value);
  //   updateFormData({
  //     longitude: e.target.value,
  //   });
  // };

  return (
    <div className="space-y-9">
      <main className="dashboard-section-card">
        <header className="flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="dashboard-section-card-header">
            <h1 className="dashboard-section-card-title text-[#172554]">
              Edit Location
            </h1>
            <p className="dashboard-section-card-description">
              Update the location of your equipment.
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
                onChange={handleAddressChange}
                placeholder="e.g 123 Main St, City, Country"
                required
              />
            </div>
            {/* <div className="max-w-[420px]">
              <Label htmlFor="city" className="mb-2">
                City
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleCityChange}
                placeholder="e.g Lagos"
              />
            </div>
           <div className="max-w-[420px]">
              <Label htmlFor="country" className="mb-2">
                Country
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={handleCountryChange}
                placeholder="e.g Nigeria"
              />
            </div>
            <div className="max-w-[420px]">
              <Label htmlFor="latitude" className="mb-2">
                Latitude
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="latitude"
                name="latitude"
                value={latitude}
                onChange={handleLatitudeChange}
                placeholder="e.g 6.5244"
              />
            </div>
            <div className="max-w-[420px]">
              <Label htmlFor="longitude" className="mb-2">
                Longitude
              </Label>
              <Input
                className="border border-[#E5E7EB] p-5"
                type="text"
                id="longitude"
                name="longitude"
                value={longitude}
                onChange={handleLongitudeChange}
                placeholder="e.g 3.3792"
              />
            </div> */}
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
