import React from "react";
import Metrics from "./Metrics";
import TransactionsHistory from "./TransactionsHistory";
import { Tab } from "@/components/common";
import WithdrawalMethods from "./WithdrawalMethods";
import PayoutRequests from "./PayoutRequests";

const VendorFinances = () => {
  return (
    <div className="space-y-9">
      <Metrics />

      <Tab
        tabs={[
          {
            key: "transaction-history",
            title: "Transaction History",
            content: <TransactionsHistory />,
          },
          {
            key: "payout-requests",
            title: "Payout Requests",
            content: <PayoutRequests />,
          },
          {
            key: "withdrawal-methods",
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
