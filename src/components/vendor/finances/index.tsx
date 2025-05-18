import React from "react";
import Metrics from "./Metrics";
import PayoutRequests from "./PayoutRequests";
import { Tab } from "@/components/common";
import WithdrawalMethods from "./WithdrawalMethods";
import WithdrawalHistory from "./WithdrawalHistory";

const VendorFinances = () => {
  return (
    <div className="space-y-9">
      <Metrics />

      <Tab
        tabs={[
          {
            key: "payout-requests",
            title: "Payout Requests",
            content: <PayoutRequests />,
          },
          {
            key: "withdrawal-history",
            title: "Withdrawal History",
            content: <WithdrawalHistory />,
          },
          {
            key: "withdraw",
            title: "Withdrawal Methods",
            content: <WithdrawalMethods />,
          },
        ]}
        queryParam="tab"
      />
    </div>
  );
};

export default VendorFinances;
