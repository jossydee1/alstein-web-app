import React from "react";
import { Bell, Check } from "lucide-react";

const VendorNotificationsContent = () => {
  return (
    <main className="dashboard-section-card">
      <header className="dashboard-section-card-header">
        <h1 className="dashboard-section-card-title">Notifications</h1>
        <p className="dashboard-section-card-description">
          Stay Informed, Your Way.
        </p>
      </header>

      <ul className="mt-[50px] grid gap-6">
        <li className="flex items-start gap-5 py-4">
          <div className="p-2">
            <Bell className="text-brandColor" size={20} />
          </div>
          <div className="flex-1">
            <p className="dashboard-section-card-title !text-lg">
              Return Reminder
            </p>
            <p className="dashboard-section-card-description">
              3 min ago • Your leased equipment is due for return
            </p>
          </div>
        </li>

        <li className="flex items-start gap-5 py-4">
          <div className="flex items-center justify-center rounded-full border-[5px] border-[#F0FDFA] bg-[#CCFBF1] p-1">
            <Check className="text-[#115E59]" size={20} />
          </div>
          <div className="flex-1">
            <p className="dashboard-section-card-title !text-lg">
              Payment Successful
            </p>
            <p className="dashboard-section-card-description">
              3 min ago • You&apos;ve successfully paid for your booking
            </p>
          </div>
        </li>
      </ul>
    </main>
  );
};

export default VendorNotificationsContent;
