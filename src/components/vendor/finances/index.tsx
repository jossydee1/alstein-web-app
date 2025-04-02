import React from "react";
import Metrics from "./Metrics";
import TransactionHistory from "./TransactionHistory";
import { Tab } from "@/components/common";
import WithdrawEarnings from "./WithdrawEarnings";

const VendorFinances = () => {
  return (
    <div className="space-y-9">
      <Metrics />

      <Tab
        tabs={[
          {
            key: "transactions",
            title: "Transaction History",
            content: <TransactionHistory />,
          },
          {
            key: "withdraw",
            title: "Withdraw Earnings",
            content: <WithdrawEarnings />,
          },
        ]}
        queryParam="tab"
      />
    </div>
  );
};

export default VendorFinances;
