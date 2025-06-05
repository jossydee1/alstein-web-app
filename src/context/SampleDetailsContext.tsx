"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SampleDetailsContextType {
  bookingId: string;
  numberOfSamples: number;
  listingName: string;
  clearContext: () => void;
  setSampleDetails: (details: {
    bookingId: string;
    numberOfSamples: number;
    listingName: string;
  }) => void;
}

const SampleDetailsContext = createContext<
  SampleDetailsContextType | undefined
>(undefined);

export const SampleDetailsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bookingId, setBookingId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sample_booking_id") || "";
    }
    return "";
  });
  const [numberOfSamples, setNumberOfSamples] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("sample_number_of_samples") || "0");
    }
    return 0;
  });
  const [listingName, setListingName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sample_listing_name") || "";
    }
    return "";
  });

  useEffect(() => {
    localStorage.setItem("sample_booking_id", bookingId);
    localStorage.setItem(
      "sample_number_of_samples",
      numberOfSamples.toString(),
    );
    localStorage.setItem("sample_listing_name", listingName);
  }, [bookingId, numberOfSamples, listingName]);

  const setSampleDetails = (details: {
    bookingId: string;
    numberOfSamples: number;
    listingName: string;
  }) => {
    setBookingId(details.bookingId);
    setNumberOfSamples(details.numberOfSamples);
    setListingName(details.listingName);
  };

  const clearContext = () => {
    setBookingId("");
    setNumberOfSamples(0);
    setListingName("");
    localStorage.removeItem("sample_booking_id");
    localStorage.removeItem("sample_number_of_samples");
    localStorage.removeItem("sample_listing_name");
  };

  return (
    <SampleDetailsContext.Provider
      value={{
        bookingId,
        numberOfSamples,
        listingName,
        clearContext,
        setSampleDetails,
      }}
    >
      {children}
    </SampleDetailsContext.Provider>
  );
};

export const useSampleDetails = () => {
  const context = useContext(SampleDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useSampleDetails must be used within a SampleDetailsProvider",
    );
  }
  return context;
};
