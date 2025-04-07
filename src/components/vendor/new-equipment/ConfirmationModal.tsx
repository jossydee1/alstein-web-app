import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/utils";
import { Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const ConfirmationModal = ({
  status,
  open,
  setOpen,
}: {
  status: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!open) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="relative flex w-full max-w-[500px] flex-col items-center justify-center space-y-4 rounded-2xl bg-white p-8 text-center">
        {status === "success" ? (
          <span className="mb-4 inline-flex size-11 items-center justify-center rounded-full border-4 border-green-50 bg-green-100 text-green-500 dark:border-green-600 dark:bg-green-700 dark:text-green-100">
            <svg
              className="size-5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
            </svg>
          </span>
        ) : (
          <span className="mb-4 inline-flex size-11 items-center justify-center rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:border-red-600 dark:bg-red-700 dark:text-red-100">
            <Zap className="size-5 shrink-0" />
          </span>
        )}
        <h3
          id="hs-task-created-alert-label"
          className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200"
        >
          {status === "success"
            ? "Listing successfully created!"
            : "Failed to create listing!"}
        </h3>
        <p className="text-gray-500 dark:text-neutral-500">
          {status === "success"
            ? "Your listing has been successfully created."
            : "Your listing was not created. Please try again."}
        </p>

        {status === "success" ? (
          <Button className="buttonBlue mx-auto" asChild>
            <Link href={dashboardRoutes.vendor_equipments}>View Listing</Link>
          </Button>
        ) : (
          <Button
            className="buttonBlue mx-auto !bg-red-500 hover:!bg-red-500"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
