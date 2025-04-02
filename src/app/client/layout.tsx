"use client";

import Greetings from "@/components/common/Greetings";
import { LinkTab } from "@/components/common/LinkTab";
import NavBar from "@/components/navigation/dashboard/client/NavBar";
import { dashboardRoutes } from "@/utils";
import {
  BellDot,
  Receipt,
  Settings2,
  ShoppingBasket,
  Unplug,
} from "lucide-react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Define tab items with titles, links and icons
  const tabItems = [
    {
      title: "Order History",
      link: dashboardRoutes.client_order_history,
      icon: <ShoppingBasket size="16" />,
    },
    {
      title: "Account Settings",
      link: dashboardRoutes.client_account_settings,
      icon: <Settings2 size="16" />,
    },
    {
      title: "Manage Password",
      link: dashboardRoutes.client_manage_password,
      icon: <Unplug size="16" />,
    },
    {
      title: "Notification",
      link: dashboardRoutes.client_notifications,
      icon: <BellDot size="16" />,
    },
    {
      title: "Payment Method",
      link: dashboardRoutes.client_payment_methods,
      icon: <Receipt size="16" />,
    },
  ];

  return (
    <div className="flex flex-col font-visbymedium antialiased">
      <NavBar />
      <div className="bg-white">
        <div className="section-container-dashboard grid gap-y-6">
          <Greetings />
          <LinkTab tabs={tabItems} />
          <div className="w-full overflow-x-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
