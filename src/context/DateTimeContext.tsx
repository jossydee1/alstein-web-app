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
  resetDateTime: () => void;
}

const DateTimeContext = createContext<DateTimeContextProps | undefined>(
  undefined,
);

export const DateTimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [fromTime, setFromTime] = useState<Time>({
    hours: "",
    minutes: "",
  });
  const [toTime, setToTime] = useState<Time>({ hours: "", minutes: "" });
  const [numberOfDays, setNumberOfDays] = useState<number>(0);

  useEffect(() => {
    if (date?.from && date?.to) {
      setNumberOfDays(differenceInDays(date.to, date.from));
    } else if (date?.from && !date?.to) {
      setNumberOfDays(1);
    } else {
      setNumberOfDays(0);
    }
  }, [date]);

  const resetDateTime = () => {
    setDate(undefined);
    setFromTime({ hours: "", minutes: "" });
    setToTime({ hours: "", minutes: "" });
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
        resetDateTime,
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
