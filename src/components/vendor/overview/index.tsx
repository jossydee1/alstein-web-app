import React from "react";
import Metrics from "./Metrics";
import BookingHistory from "./Table";

const VendorOverviewContent = () => {
  return (
    <div className="space-y-9">
      <Metrics />
      <BookingHistory />
    </div>
  );
};

export default VendorOverviewContent;
