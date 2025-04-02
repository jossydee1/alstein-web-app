import React from "react";
import Metrics from "./Metrics";
import BookingHistory from "./BookingHistory";
import { Tab } from "@/components/common";
import RequestHistory from "./RequestHistory";

const VendorBookingHistory = () => {
  return (
    <div className="space-y-9">
      <Metrics />

      <Tab
        tabs={[
          {
            key: "bookings",
            title: "Bookings",
            content: <BookingHistory />,
          },
          {
            key: "requests",
            title: "Requests",
            content: <RequestHistory />,
          },
        ]}
        queryParam="tab"
      />
    </div>
  );
};

export default VendorBookingHistory;
