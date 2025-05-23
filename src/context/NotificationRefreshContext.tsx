import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationRefreshContext = createContext<{
  refreshKey: number;
  refreshNotifications: () => void;
}>({
  refreshKey: 0,
  refreshNotifications: () => {},
});

export const NotificationRefreshProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshNotifications = useCallback(() => {
    setRefreshKey(key => key + 1);
  }, []);

  return (
    <NotificationRefreshContext.Provider
      value={{ refreshKey, refreshNotifications }}
    >
      {children}
    </NotificationRefreshContext.Provider>
  );
};

export const useNotificationRefresh = () =>
  useContext(NotificationRefreshContext);
