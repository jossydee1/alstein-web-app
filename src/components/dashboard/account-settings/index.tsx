import React from "react";
import { Check, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccountSettingsContent = () => {
  return (
    <main className="dashboard-section-card">
      <header className="dashboard-section-card-header">
        <h1 className="dashboard-section-card-title">Account Settings</h1>
        <p className="dashboard-section-card-description">
          Update your personal details, security settings, and preferences to
          keep your account safe and tailored to your needs
        </p>
      </header>
      <section className="mt-[50px] grid gap-6">
        <div className="flex items-center gap-5 py-4">
          <div className="flex items-center justify-center rounded-md border-[5px] border-[#EFF6FF] bg-[#DBEAFE] p-1">
            <Check className="text-brandColor" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="dashboard-section-card-title !text-lg">
              Profile Information
            </h2>
            <p className="dashboard-section-card-description">
              Edit your name, email, and contact details to keep your profile up
              to date.
            </p>
          </div>

          <button type="button">
            <Edit className="text-[#9CA3AF]" size={17} />
          </button>
        </div>

        <div className="flex items-center gap-5 py-4">
          <div className="flex items-center justify-center rounded-md border-[5px] border-[#EFF6FF] bg-[#DBEAFE] p-1">
            <Check className="text-brandColor" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="dashboard-section-card-title !text-lg">
              Deactivate or Delete Account
            </h2>
            <p className="dashboard-section-card-description">
              Take a break or permanently delete your account if needed
            </p>

            <div className="mt-6 flex gap-2.5">
              <Button
                variant="outline"
                type="button"
                className="border border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white"
              >
                Deactivate
              </Button>
              <Button
                variant="outline"
                type="button"
                className="border border-[#E5E7EB] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AccountSettingsContent;
