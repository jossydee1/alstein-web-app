"use client";

import React from "react";
import { Bell } from "lucide-react";
import { useClientFetch } from "@/hooks";
import { useAuth } from "@/context";
import { NotificationsHistoryProps } from "@/types";
import { LoadingState } from "@/components/common";
import { formatDateToRelativeTime } from "@/utils";

const NotificationsContent = () => {
  const { token } = useAuth();

  const url = `/client/api/v1/notifications/get-notifications?skip=0&take=10`;

  const { data, isLoading, error } = useClientFetch<NotificationsHistoryProps>({
    endpoint: url,
    token,
    enabled: !!token,
  });

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

        {data && data?.data?.length > 0 ? (
          <ul className="mt-[50px] grid gap-6">
            {data?.data?.map(n => (
              <li key={n?.id} className="flex items-start gap-5 py-4">
                <div className="p-2">
                  <Bell className="text-brandColor" size={20} />
                </div>
                <div className="flex-1">
                  <p className="dashboard-section-card-title !text-lg">
                    {n?.title}
                  </p>
                  <p className="dashboard-section-card-description">
                    {formatDateToRelativeTime(n?.created_at)} • {n?.message}
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
      </main>
    </>
  );
};

export default NotificationsContent;
