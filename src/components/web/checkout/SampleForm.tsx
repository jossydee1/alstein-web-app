"use client";

import React, { useState, useEffect, Fragment } from "react";
import { api, countriesList, formatError, webRoutes } from "@/utils";
import { useAuth, useSampleDetails } from "@/context";
import { ApiResponseProps } from "@/types";
import { toast } from "react-toastify";
import SuccessModal from "./SuccessModal";
import { Button } from "@/components/ui/button";

export interface SampleProps {
  booking_id: string;
  sample_name: string;
  sample_type: string;
  sample_weight: string;
  pickup_location: string;
  pickup_longitude: string;
  pickup_latitude: string;
  pickup_date: string;
  pickup_time: string;
  contact_person_phone_number: string;
  delivery_type: string;
}

const SampleForm = () => {
  const { bookingId, numberOfSamples, listingName, clearContext } =
    useSampleDetails();
  const { token } = useAuth();

  const [samples, setSamples] = useState<SampleProps[]>([]);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Initialize samples array based on numberOfSamples
    if (numberOfSamples > 0) {
      setCountryCodes(Array(numberOfSamples).fill(""));
      setSamples(
        Array(numberOfSamples).fill({
          booking_id: bookingId,
          sample_name: "",
          sample_type: "",
          sample_weight: "0",
          pickup_location: "",
          pickup_longitude: "",
          pickup_latitude: "",
          pickup_date: "",
          pickup_time: "",
          contact_person_phone_number: "",
          delivery_type: "",
        }),
      );
    }
  }, [numberOfSamples, bookingId]);

  const handleSampleChange = (
    index: number,
    field: keyof SampleProps | "country_code",
    value: string,
    isPhone = false,
  ) => {
    const updatedSamples = [...samples];

    if (field === "country_code") {
      // Handle country code change
      const newCountryCodes = [...countryCodes];
      newCountryCodes[index] = value;
      setCountryCodes(newCountryCodes);

      // Update phone number with new country code
      const phoneNumber = samples[index].contact_person_phone_number.replace(
        countryCodes[index],
        "",
      );
      updatedSamples[index] = {
        ...updatedSamples[index],
        contact_person_phone_number: value + phoneNumber,
      };
    } else if (isPhone) {
      // Handle phone number change
      updatedSamples[index] = {
        ...updatedSamples[index],
        contact_person_phone_number: countryCodes[index] + value,
      };
    } else {
      // Handle all other fields
      updatedSamples[index] = {
        ...updatedSamples[index],
        [field]: value,
      };
    }

    setSamples(updatedSamples);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await api.post<ApiResponseProps<unknown>>(
        "/client/api/v1/booking/add-booking-sample",
        { samples },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response?.status !== 200 || !response?.data) {
        toast.error(
          response?.data?.message || "Failed to submit sample details",
        );
        return;
      }

      toast.success("Sample details submitted successfully");
      setShowSuccessModal(true);
      clearContext(); // Clear the context after successful submission
    } catch (error) {
      toast.error(formatError(error, "Failed to initiate booking"));
    } finally {
      setIsProcessing(false);
    }
  };

  // Add this check at the beginning of the component
  if (!bookingId || !numberOfSamples) {
    return (
      <main className="section-container flex min-h-96 flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          No Sample Details Found
        </h1>
        <p className="text-center text-gray-600">
          Please book a listing first to provide sample details.
        </p>
        <a
          href={webRoutes.listings}
          className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          View Listings
        </a>
      </main>
    );
  }

  return (
    <>
      <main className="section-container min-h-screen bg-gray-50/50 py-8">
        <header className="mb-8">
          <h1 className="text-center text-[36px] font-bold leading-[60px] text-[#101828] md:text-[48px]">
            Sample Details Form
          </h1>
          <p className="mt-6 text-center font-semibold text-neutral-800">
            Please provide details for your{" "}
            <span className="text-brandColor">{numberOfSamples}</span> sample
            {numberOfSamples > 1 ? "s" : ""} from{" "}
            <span className="capitalize text-brandColor">{listingName}</span>
          </p>
        </header>

        <form onSubmit={handleSubmit} className="">
          <section
            className={`grid gap-8 ${numberOfSamples > 1 ? "md:grid-cols-2" : ""}`}
          >
            {samples.map((sample, index) => (
              <div key={index} className="dashboard-section-card mb-8 bg-white">
                <h2 className="mb-8 text-lg font-semibold text-[#172554]">
                  Sample #{index + 1} Details
                </h2>

                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <div className="inputGroup">
                    <label htmlFor={`sample_name_${index}`}>Sample Name*</label>
                    <input
                      type="text"
                      id={`sample_name_${index}`}
                      placeholder="Enter sample name"
                      required
                      value={sample.sample_name}
                      onChange={e =>
                        handleSampleChange(index, "sample_name", e.target.value)
                      }
                    />
                  </div>

                  <div className="inputGroup">
                    <label htmlFor={`sample_type_${index}`}>Sample Type*</label>
                    <select
                      id={`sample_type_${index}`}
                      value={sample.sample_type}
                      onChange={e =>
                        handleSampleChange(index, "sample_type", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                      required
                    >
                      <option value="">Select</option>
                      <option value="solid">Solid</option>
                      <option value="liquid">Liquid</option>
                    </select>
                  </div>

                  <div className="inputGroup">
                    <label htmlFor={`sample_weight_${index}`}>
                      Sample Weight (optional)
                    </label>
                    <input
                      type="number"
                      id={`sample_weight_${index}`}
                      placeholder="Enter sample weight"
                      value={sample.sample_weight}
                      onChange={e =>
                        handleSampleChange(
                          index,
                          "sample_weight",
                          e.target.value,
                        )
                      }
                      min={0}
                    />
                  </div>

                  <div className="inputGroup">
                    <label htmlFor={`pickup_location_${index}`}>
                      Pickup Location*
                    </label>
                    <input
                      type="text"
                      id={`pickup_location_${index}`}
                      required
                      placeholder="Enter pickup location"
                      value={sample.pickup_location}
                      onChange={e =>
                        handleSampleChange(
                          index,
                          "pickup_location",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="inputGroup">
                    <label htmlFor={`pickup_date_${index}`}>Pickup Date*</label>
                    <input
                      type="date"
                      id={`pickup_date_${index}`}
                      required
                      value={sample.pickup_date}
                      onChange={e =>
                        handleSampleChange(index, "pickup_date", e.target.value)
                      }
                    />
                  </div>

                  <div className="inputGroup">
                    <label htmlFor={`pickup_time_${index}`}>Pickup Time*</label>
                    <input
                      type="time"
                      id={`pickup_time_${index}`}
                      required
                      value={sample.pickup_time}
                      onChange={e =>
                        handleSampleChange(index, "pickup_time", e.target.value)
                      }
                    />
                  </div>

                  <div className="inputGroup">
                    <label htmlFor={`contact_phone_${index}`}>
                      Contact Phone Number*
                    </label>
                    <div className="flex gap-2">
                      <select
                        className="w-32 rounded-lg border border-gray-300 px-4 py-3"
                        value={countryCodes[index]}
                        onChange={e =>
                          handleSampleChange(
                            index,
                            "country_code",
                            e.target.value,
                            true,
                          )
                        }
                        required
                      >
                        <option value="">🌐 Select</option>
                        {countriesList.map(country => (
                          <option key={country.code} value={country.dial_code}>
                            {country.flag} {country.dial_code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id={`contact_phone_${index}`}
                        required
                        className="flex-1"
                        placeholder="Enter phone number"
                        value={sample.contact_person_phone_number.replace(
                          countryCodes[index],
                          "",
                        )}
                        onChange={e =>
                          handleSampleChange(
                            index,
                            "contact_person_phone_number",
                            e.target.value,
                            true,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="inputGroup">
                    <label htmlFor={`delivery_type_${index}`}>
                      Delivery Type*
                    </label>
                    <select
                      id={`delivery_type_${index}`}
                      value={sample.delivery_type}
                      onChange={e =>
                        handleSampleChange(
                          index,
                          "delivery_type",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                      required
                    >
                      <option value="">Select</option>
                      <option value="pickup">Pickup</option>
                      <option value="dropoff">Dropoff</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <div className="flex justify-center">
            <Button type="submit" disabled={isProcessing} className="text-lg">
              {isProcessing ? "Submitting..." : "Submit Sample Details"}
            </Button>
          </div>
        </form>
      </main>

      <SuccessModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        isPerSample={false}
      />
    </>
  );
};

export default SampleForm;
