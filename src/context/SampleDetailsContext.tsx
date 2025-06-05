"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

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
  const [bookingId, setBookingId] = useState("");
  const [numberOfSamples, setNumberOfSamples] = useState(0);
  const [listingName, setListingName] = useState("");

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
