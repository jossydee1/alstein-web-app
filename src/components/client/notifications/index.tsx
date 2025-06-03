"use client";

import React, { useState, useEffect } from "react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/utils";
import { useClientFetch } from "@/hooks";
import { useAuth } from "@/context";
import { NotificationHistoryProps } from "@/types";
import { LoadingState } from "@/components/common";
import { formatDateToRelativeTime } from "@/utils";
import { useNotificationRefresh } from "@/context";

const NotificationsContent = () => {
  const { token } = useAuth();
  const { refreshNotifications } = useNotificationRefresh();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);

  React.useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  const url = `/client/api/v1/notifications/get-notifications?skip=${
    (currentPage - 1) * itemsPerPage
  }&take=${itemsPerPage}`;

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
  } = useClientFetch<NotificationHistoryProps>({
    endpoint: url,
    token,
    enabled: !!token,
  });

  const { data: notificationTracker } = useClientFetch({
    endpoint: `/client/api/v1/notifications/update-notifications-tracker`,
    enabled: !!token,
  });

  console.log("Notification tracker:", notificationTracker);

  useEffect(() => {
    if (notificationsData?.total_count) {
      setTotalPages(Math.ceil(notificationsData?.total_count / itemsPerPage));
    }
  }, [notificationsData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              className={cn(
                currentPage === i &&
                  "rounded-full bg-brandColor text-white hover:!bg-brandColor hover:!text-white",
              )}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }
    return items;
  };

  return (
    <>
      {isLoading && <LoadingState />}
      <main className="dashboard-section-card">
        <header className="dashboard-section-card-header">
          <h1 className="dashboard-section-card-title">Notifications</h1>
          <p className="dashboard-section-card-description">
            Stay Informed, Your Way.
          </p>
        </header>

        {error && (
          <div className="mt-[50px] flex items-center justify-center">
            <p className="text-red-500">Error fetching notifications</p>
          </div>
        )}

        {notificationsData && notificationsData?.data?.length > 0 ? (
          <ul className="mt-[50px] grid gap-6">
            {notificationsData?.data?.map(n => (
              <li key={n?.id} className="flex items-start gap-5 py-4">
                <div className="p-2">
                  <Bell className="text-brandColor" size={20} />
                </div>
                <div className="flex-1">
                  <p className="dashboard-section-card-title !text-lg">
                    {n?.title}
                  </p>
                  <p className="dashboard-section-card-description">
                    {formatDateToRelativeTime(n?.updated_at)} • {n?.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-[50px] flex items-center justify-center">
            <p className="text-gray-500">No notifications available</p>
          </div>
        )}

        {/* Add pagination after the notifications list */}
        {notificationsData && notificationsData?.data?.length > 0 && (
          <Pagination className="mx-auto mt-9 justify-end">
            <PaginationContent>
              <PaginationItem
                className="flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-2.5 hover:cursor-pointer disabled:text-[#6B7280] disabled:opacity-50"
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
              >
                <ChevronLeft size={20} />
                Previous
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem
                className="flex items-center gap-2 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-2.5 hover:cursor-pointer disabled:text-[#6B7280] disabled:opacity-50"
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
              >
                Next
                <ChevronRight size={20} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </>
  );
};

export default NotificationsContent;
