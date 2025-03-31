"use client";

import { dashboardRoutes } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessModal = ({
  showSuccessModal,
  setShowSuccessModal,
}: {
  showSuccessModal: boolean;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  if (!showSuccessModal) return null;

  const handleClose = () => {
    router.push(dashboardRoutes.client_order_history);
    setShowSuccessModal(false);
  };

  return (
    <div>
      <div
        className="fixed start-0 top-0 z-[100] flex size-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
        role="dialog"
        tabIndex={-1}
      >
        <div className="m-3 transition-all ease-out sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="relative flex flex-col rounded-xl bg-white shadow-lg">
            <div className="absolute end-2 top-2">
              <button
                type="button"
                className="focus:outline-hidden inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 disabled:pointer-events-none disabled:opacity-50"
                aria-label="Close"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-4 text-center sm:p-10">
              {/* Icon */}
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-full border-4 border-green-50 bg-green-100 text-green-500">
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
              {/* End Icon */}

              <h3 className="mb-2 text-xl font-bold text-gray-800">
                Booking successfully created!
              </h3>
              <p className="text-gray-500">
                You can see the progress of your booking in your
                <a
                  className="focus:outline-hidden inline-flex items-center gap-x-1.5 font-medium text-blue-600 decoration-2 hover:underline focus:underline"
                  href={dashboardRoutes.client_order_history}
                >
                  personal account.
                </a>{" "}
                You will be notified of its completion.
              </p>

              <div className="mt-6 flex justify-center gap-x-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="shadow-2xs focus:outline-hidden inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
