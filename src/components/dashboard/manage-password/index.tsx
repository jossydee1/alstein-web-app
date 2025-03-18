import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ManagePasswordContent = () => {
  return (
    <main className="dashboard-section-card">
      <div className="mx-auto max-w-[580px] gap-6 rounded-[25px] border-[0.2px] border-[#9CA3AF] px-[33px] py-[55px]">
        <header className="dashboard-section-card-header mb-9 !gap-2">
          <h1 className="dashboard-section-card-title">
            Keep Your Account Secure
          </h1>
          <p className="dashboard-section-card-description">
            Update your password regularly to protect your data and ensure
            account safety.
          </p>
        </header>

        <form className="mt-[50px] grid max-w-[580px] gap-8">
          <div className="">
            <Label htmlFor="password" className="mb-2">
              Current Password
            </Label>
            <Input
              className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
              type="password"
              id="password"
              placeholder="Enter current password"
              required
            />
          </div>
          <div className="">
            <Label htmlFor="new-password" className="mb-2">
              New Password
            </Label>
            <Input
              className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
              type="password"
              id="new-password"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="">
            <Label htmlFor="confirm-password" className="mb-2">
              Confirm New Password
            </Label>
            <Input
              className="border border-[#E5E7EB] bg-[#F8FAFC] p-5"
              type="password"
              id="confirm-password"
              placeholder="Re-enter new password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-brandColor !p-5 text-white"
          >
            Save New Password
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ManagePasswordContent;
