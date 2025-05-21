"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";

type Time = {
  hours: string;
  minutes: string;
};

interface DateTimeContextProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  fromTime: Time;
  setFromTime: React.Dispatch<React.SetStateAction<Time>>;
  toTime: Time;
  setToTime: React.Dispatch<React.SetStateAction<Time>>;
  numberOfDays: number;
  numberOfSamples: number;
  setNumberOfSamples: React.Dispatch<React.SetStateAction<number>>;
  resetDateTime: () => void;
  isPerSample: boolean;
  setIsPerSample: (val: boolean) => void;
}

const DateTimeContext = createContext<DateTimeContextProps | undefined>(
  undefined,
);

export const DateTimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [fromTime, setFromTime] = useState<Time>({
    hours: "00",
    minutes: "00",
  });
  const [toTime, setToTime] = useState<Time>({ hours: "00", minutes: "00" });
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [numberOfSamples, setNumberOfSamples] = useState<number>(1);
  const [isPerSample, setIsPerSample] = useState<boolean>(false);

  useEffect(() => {
    if (date?.from && date?.to) {
      setNumberOfDays(differenceInDays(date?.to, date?.from));
    } else if (date?.from && !date?.to) {
      setNumberOfDays(1);
    } else {
      setNumberOfDays(0);
    }
  }, [date]);

  // Reset date/time when isPerSample changes
  useEffect(() => {
    setDate(undefined);
    setFromTime({ hours: "00", minutes: "00" });
    setToTime({ hours: "00", minutes: "00" });
  }, [isPerSample]);

  const resetDateTime = () => {
    setDate(undefined);
    setFromTime({ hours: "00", minutes: "00" });
    setToTime({ hours: "00", minutes: "00" });
  };

  return (
    <DateTimeContext.Provider
      value={{
        date,
        setDate,
        fromTime,
        setFromTime,
        toTime,
        setToTime,
        numberOfDays,
        numberOfSamples,
        setNumberOfSamples,
        resetDateTime,
        isPerSample,
        setIsPerSample,
      }}
    >
      {children}
    </DateTimeContext.Provider>
  );
};

export const useDateTime = (): DateTimeContextProps => {
  const context = useContext(DateTimeContext);
  if (!context) {
    throw new Error("useDateTime must be used within a DateTimeProvider");
  }
  return context;
};
