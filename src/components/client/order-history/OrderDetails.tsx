import React from "react";
import { GetOrderStatusPill, GetPaymentStatusPill } from "@/components/common";
import { OrderProps, SampleResultProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import {
  DOCUMENT_URL,
  formatIOSToDate,
  formatPrice,
  formatTimeTo12Hour,
} from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInDays } from "date-fns";
import { useClientFetch } from "@/hooks";
import { useAuth } from "@/context";

interface OrderDetailsProps {
  order: OrderProps;
  onClose: () => void;
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
  const { token } = useAuth();

  const isPerSample = order?.equipment?.bill_type === "per_Sample";
  //   const isPerSample = order?.number_of_samples > 0;

  const { data: sampleResults, isLoading: isLoadingSamples } = useClientFetch<
    SampleResultProps[]
  >({
    endpoint: `/client/api/v1/booking/get-booking-sample?booking_id=${order?.id}`,
    token,
    enabled: !!token && isPerSample,
  });

  const handleDownload = (path: string) => {
    window.open(DOCUMENT_URL + path, "_blank");
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header with close button */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-start gap-2">
          <h2>
            <span className="text-sm text-gray-500">Order ID: </span>
            <span className="text-lg font-semibold">{order?.id}</span>
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2">
          <p>
            <span className="text-sm text-gray-500">Date Ordered: </span>
            <span className="font-meduium text-base">
              {formatIOSToDate(order?.updated_at)}
            </span>
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Status Pills */}
      <div className="mb-8 flex flex-wrap gap-x-8 gap-y-4">
        <p> Booking Status: {GetOrderStatusPill(order?.status)}</p>
        <p> Payment Status: {GetPaymentStatusPill(order?.payment_status)}</p>
      </div>

      {/* Equipment Details Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Equipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col justify-between md:flex-row">
              <span className="text-gray-500">Partner</span>
              <span>{order?.partners?.name}</span>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
              <span className="text-gray-500">Address</span>
              <span>
                {order?.equipment?.address}, {order?.equipment?.city},{" "}
                {order?.equipment?.country}
              </span>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
              <span className="text-gray-500">Price</span>
              <span>{formatPrice(order?.equipment?.price, "NGN")}</span>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
              <span className="text-gray-500">Service Type</span>
              <span> {order?.equipment?.service_type?.replace(/_/g, " ")}</span>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
              <span className="text-gray-500"> Billing Method</span>
              <span> {order?.equipment?.bill_type?.replace(/_/g, " ")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isPerSample ? (
              <div className="flex flex-col justify-between md:flex-row">
                <span className="text-gray-500">Booking Date</span>
                <span>{formatIOSToDate(order?.start_date)}</span>
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-between md:flex-row">
                  <span className="text-gray-500">Start Date</span>
                  <span>
                    {formatIOSToDate(order?.start_date)},{" "}
                    {formatTimeTo12Hour(order?.start_time || "")}
                  </span>
                </div>
                <div className="flex flex-col justify-between md:flex-row">
                  <span className="text-gray-500">End Date</span>
                  <span>
                    {formatIOSToDate(order?.end_date)},{" "}
                    {formatTimeTo12Hour(order?.end_time || "")}
                  </span>
                </div>
              </>
            )}
            {isPerSample ? (
              <div className="flex flex-col justify-between md:flex-row">
                <span className="text-gray-500">Number of Samples</span>
                <span>{order?.number_of_samples}</span>
              </div>
            ) : (
              <div className="flex flex-col justify-between md:flex-row">
                <span className="text-gray-500">Number of Days</span>
                <span>
                  {differenceInDays(
                    order?.end_date || "",
                    order?.start_date || "",
                  )}
                </span>
              </div>
            )}
            <hr className="my-4 border-gray-200" />
            <div className="flex flex-col justify-between font-semibold md:flex-row">
              <span className="text-gray-500">Total Amount</span>
              <span>{formatPrice(order?.booking_amount, "NGN")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Results Section */}
      {isPerSample && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sample Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingSamples ? (
                <div className="text-center text-sm text-gray-500">
                  Loading samples...
                </div>
              ) : sampleResults?.length ? (
                sampleResults.map((sample, index) => (
                  <div
                    key={sample.id}
                    className="space-y-4 rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Sample {index + 1}</h3>
                      {!sample.result_file ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(sample.result_file!)}
                        >
                          <Download className="mr-2 size-4" />
                          Download Result
                        </Button>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Result not ready
                        </span>
                      )}
                    </div>

                    <div className="grid gap-3 text-sm md:grid-cols-2">
                      <div className="flex justify-between md:flex-col">
                        <span className="text-gray-500">Sample Name</span>
                        <span>{sample.sample_name}</span>
                      </div>
                      <div className="flex justify-between md:flex-col">
                        <span className="text-gray-500">Sample Type</span>
                        <span className="capitalize">{sample.sample_type}</span>
                      </div>
                      <div className="flex justify-between md:flex-col">
                        <span className="text-gray-500">Sample Weight</span>
                        <span>{sample.sample_weight}g</span>
                      </div>
                      <div className="flex justify-between md:flex-col">
                        <span className="text-gray-500">Delivery Type</span>
                        <span className="capitalize">
                          {sample.delivery_type}
                        </span>
                      </div>
                      {sample.delivery_type === "pickup" && (
                        <>
                          <div className="flex justify-between md:flex-col">
                            <span className="text-gray-500">
                              Pickup Location
                            </span>
                            <span>{sample.pickup_location}</span>
                          </div>
                          <div className="flex justify-between md:flex-col">
                            <span className="text-gray-500">
                              Contact Number
                            </span>
                            <span>{sample.contact_person_phone_number}</span>
                          </div>
                          <div className="flex justify-between md:flex-col">
                            <span className="text-gray-500">Pickup Date</span>
                            <span>
                              {formatIOSToDate(sample.pickup_date)},{" "}
                              {formatTimeTo12Hour(sample.pickup_time)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-gray-500">
                  No samples found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderDetails;
