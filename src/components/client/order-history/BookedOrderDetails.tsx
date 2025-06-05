import React, { useState, useRef } from "react";
import {
  GetOrderStatusPill,
  GetPaymentStatusPill,
  LoadingState,
} from "@/components/common";
import { OrderProps, SampleResultProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Download, X, Upload } from "lucide-react";
import {
  api,
  DOCUMENT_URL,
  formatError,
  formatIOSToDate,
  formatPrice,
  formatTimeTo12Hour,
} from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInDays } from "date-fns";
import { useClientFetch } from "@/hooks";
import { useAuth } from "@/context";
import { toast } from "react-toastify";
import ConfirmationModal from "@/components/vendor/bookings/ConfirmationModal";
import { Loader2 } from "lucide-react";

interface OrderDetailsProps {
  role: "client" | "partner";
  order: OrderProps;
  onClose: () => void;
}

interface UploadingState {
  [key: string]: boolean;
}

const BookedOrderDetails = ({ order, onClose, role }: OrderDetailsProps) => {
  const { token } = useAuth();
  const [status, setStatus] = useState("accept");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingResults, setUploadingResults] = useState<UploadingState>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // const isPerSample = order?.equipment?.bill_type === "per_Sample";
  const isPerSample = order?.number_of_samples > 0;
  const showButtons = order?.status === "initiated";

  const {
    data: sampleResults,
    isLoading: isLoadingSamples,
    refetch,
  } = useClientFetch<SampleResultProps[]>({
    endpoint: `/${role}/api/v1/booking/get-booking-sample?booking_id=${order?.id}`,
    token,
    enabled: !!token && isPerSample,
  });

  const handleDownload = (path: string) => {
    window.open(DOCUMENT_URL + path, "_blank");
  };

  const handleAccept = async () => {
    setLoading(true);

    try {
      const res = await api.post(
        "/partner/api/v1/booking/booking-process",
        {
          booking_id: order?.id,
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setStatus("accept");
        setOpen(true);
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to accept booking"));
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);

    try {
      const res = await api.post(
        "/partner/api/v1/booking/booking-process",
        {
          booking_id: order?.id,
          status: "declined",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setStatus("decline");
        setOpen(true);
      }
    } catch (error) {
      toast.error(formatError(error, "Failed to decline booking"));
    } finally {
      setLoading(false);
    }
  };

  // Function to convert bytes to MB
  const bytesToMB = (bytes: number) => bytes / (1024 * 1024);

  // Function to upload file to S3 using pre-signed URL
  const uploadFileToS3 = async (file: File, uploadLink: string) => {
    try {
      const response = await api.put(uploadLink, file, {
        headers: {
          "Content-Type": file?.type,
        },
        // This ensures no auth headers are sent with this specific request
        transformRequest: [
          (data, headers) => {
            // Remove Authorization header if it exists
            if (headers && "Authorization" in headers) {
              delete headers.Authorization;
            }
            return data;
          },
        ],
      });

      if (response.status !== 200) {
        throw new Error(`S3 upload failed: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("Upload error details:", error);
      throw error;
    }
  };

  const handleResultUpload = async (
    sampleId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Validate file type
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      if (e.target) e.target.value = "";
      return;
    }

    // Validate file size (3MB max)
    if (bytesToMB(file.size) > 3) {
      toast.error(
        `File size must be less than 3MB. Current size: ${bytesToMB(file.size).toFixed(2)}MB`,
      );
      if (e.target) e.target.value = "";
      return;
    }

    setUploadingResults(prev => ({ ...prev, [sampleId]: true }));

    try {
      const uploadLinkResponse = await api.post(
        "/partner/api/v1/booking/generate-sample-result-link",
        {
          document_name: "result",
          sample_id: sampleId,
          file_type: "application/pdf",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const uploadLink = uploadLinkResponse.data.data.upload_link;

      // Upload file to S3
      await uploadFileToS3(file, uploadLink);

      // Refetch samples to get updated data
      await refetch();
      toast.success("Result uploaded successfully");
    } catch (error) {
      toast.error(formatError(error, "Failed to upload result"));
      if (fileInputRefs.current[sampleId]) {
        fileInputRefs.current[sampleId]!.value = "";
      }
    } finally {
      setUploadingResults(prev => ({ ...prev, [sampleId]: false }));
    }
  };

  return (
    <>
      {loading && <LoadingState />}
      {order && role === "partner" && (
        <ConfirmationModal status={status} open={open} data={order} />
      )}

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
                <span className="text-gray-500">Name</span>
                <span>{order?.equipment?.name}</span>
              </div>
              {role === "client" && (
                <>
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
                </>
              )}
              <div className="flex flex-col justify-between md:flex-row">
                <span className="text-gray-500">Price</span>
                <span>{formatPrice(order?.equipment?.price, "NGN")}</span>
              </div>
              <div className="flex flex-col justify-between md:flex-row">
                <span className="text-gray-500">Service Type</span>
                <span>
                  {" "}
                  {order?.equipment?.service_type?.replace(/_/g, " ")}
                </span>
              </div>
              <div className="flex flex-col justify-between md:flex-row">
                <span className="text-gray-500"> Billing Method</span>
                <span> {order?.equipment?.bill_type?.replace(/_/g, " ")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Details Card */}
        {role === "partner" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Client Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col justify-between md:flex-row">
                  <span className="text-gray-500">Name</span>
                  <span>
                    {order?.client?.first_name} {order?.client?.last_name}
                  </span>
                </div>
                <div className="flex flex-col justify-between md:flex-row">
                  <span className="text-gray-500">Email</span>
                  <span>{order?.client?.email}</span>
                </div>
                <div className="flex flex-col justify-between md:flex-row">
                  <span className="text-gray-500">Address</span>
                  <span>{order?.client?.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
              <div className="flex flex-col justify-between md:flex-row">
                <span className="text-gray-500">
                  Price per {isPerSample ? "Sample" : "Day"}
                </span>
                <span>{formatPrice(order?.equipment?.price, "NGN")}</span>
              </div>
              <hr className="my-4 border-gray-200" />
              <div className="flex flex-col justify-between font-semibold md:flex-row">
                <span className="text-gray-500">Total Paid</span>
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
                      key={sample?.id}
                      className="space-y-4 rounded-lg border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Sample {index + 1}</h3>
                        {role === "client" && (
                          <>
                            {sample?.result_file ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleDownload(sample.result_file!)
                                }
                              >
                                <Download className="mr-2 size-4" />
                                Download Result
                              </Button>
                            ) : (
                              <span className="text-sm text-gray-500">
                                Result not ready
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      <div className="grid gap-3 text-sm md:grid-cols-2">
                        <div className="flex justify-between md:flex-col">
                          <span className="text-gray-500">Sample Name</span>
                          <span>{sample?.sample_name}</span>
                        </div>
                        <div className="flex justify-between md:flex-col">
                          <span className="text-gray-500">Sample Type</span>
                          <span className="capitalize">
                            {sample?.sample_type}
                          </span>
                        </div>
                        <div className="flex justify-between md:flex-col">
                          <span className="text-gray-500">Sample Weight</span>
                          <span>{sample?.sample_weight}g</span>
                        </div>
                        <div className="flex justify-between md:flex-col">
                          <span className="text-gray-500">Delivery Type</span>
                          <span className="capitalize">
                            {sample?.delivery_type}
                          </span>
                        </div>
                        {sample?.delivery_type === "pickup" && (
                          <>
                            <div className="flex justify-between md:flex-col">
                              <span className="text-gray-500">
                                Pickup Location
                              </span>
                              <span>{sample?.pickup_location}</span>
                            </div>
                            <div className="flex justify-between md:flex-col">
                              <span className="text-gray-500">
                                Contact Number
                              </span>
                              <span>{sample?.contact_person_phone_number}</span>
                            </div>
                            <div className="flex justify-between md:flex-col">
                              <span className="text-gray-500">Pickup Date</span>
                              <span>
                                {formatIOSToDate(sample?.pickup_date)},{" "}
                                {formatTimeTo12Hour(sample?.pickup_time)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {role === "partner" && (
                        <div className="flex items-center gap-2">
                          {sample?.result_file ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleDownload(sample.result_file!)
                                }
                              >
                                <Download className="mr-2 size-4" />
                                View Result
                              </Button>
                              <input
                                type="file"
                                ref={el => {
                                  if (el) {
                                    fileInputRefs.current[sample.id] = el;
                                  }
                                }}
                                className="hidden"
                                onChange={e =>
                                  handleResultUpload(
                                    sample.id,

                                    e,
                                  )
                                }
                                accept="application/pdf"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  fileInputRefs.current[sample.id]?.click()
                                }
                                disabled={uploadingResults[sample.id]}
                              >
                                {uploadingResults[sample.id] ? (
                                  <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : (
                                  <Upload className="mr-2 size-4" />
                                )}
                                Update Result
                              </Button>
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                ref={el => {
                                  if (el) {
                                    fileInputRefs.current[sample.id] = el;
                                  }
                                }}
                                className="hidden"
                                onChange={e =>
                                  handleResultUpload(
                                    sample.id,

                                    e,
                                  )
                                }
                                accept="application/pdf"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  fileInputRefs.current[sample.id]?.click()
                                }
                                disabled={uploadingResults[sample.id]}
                              >
                                {uploadingResults[sample.id] ? (
                                  <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : (
                                  <Upload className="mr-2 size-4" />
                                )}
                                Upload Result
                              </Button>
                            </>
                          )}
                        </div>
                      )}
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

        {role === "partner" && showButtons && (
          <footer className="mt-6 flex flex-col items-center justify-between gap-x-7 gap-y-4 sm:flex-row">
            <Button className="w-full bg-brandColor" onClick={handleAccept}>
              Accept Booking
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleDecline}
            >
              Decline Booking
            </Button>
          </footer>
        )}
      </div>
    </>
  );
};

export default BookedOrderDetails;
