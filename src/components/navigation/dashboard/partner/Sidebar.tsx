import React from "react";
import {
  ChevronDown,
  ChevronUp,
  Files,
  LayoutDashboard,
  KeyRound,
  LogOut,
  MessagesSquare,
  Receipt,
  FlaskConical,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { webRoutes, dashboardRoutes } from "@/utils";
import { usePathname } from "next/navigation";
import logoLight from "@/public/logo-rectangle-light.svg";

interface NavItem {
  id: string;
  label: string;
  isActive: boolean;
  icon?: React.ReactNode;
  href?: string;
  children?: NavItem[];
}

const commonStyles = {
  link: "flex items-center gap-x-3.5 rounded-md px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none  transition-colors",
  accordionButton:
    "hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-md px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
  accordionContent:
    "hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300",
  iconSize: "size-4 shrink-0",
  hrStyle: "my-3 border-t border-gray-300",
};

const AccordionItem = ({ item }: { item: NavItem }) => {
  if (!item?.children) {
    return (
      <li>
        <Link
          href={item?.href || dashboardRoutes?.vendor_overview}
          className={`${commonStyles.link} ${item?.isActive ? "bg-[#EFF6FF] text-[#2563EB]" : ""}`}
        >
          {item?.icon}
          {item?.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="hs-accordion" id={`${item?.id}-accordion`}>
      <button
        type="button"
        className={`${commonStyles.accordionButton} ${item?.isActive ? "bg-[#EFF6FF] text-[#2563EB]" : ""}`}
        aria-expanded="true"
        aria-controls={`${item?.id}-accordion-child`}
      >
        {item?.icon}
        {item?.label}
        <ChevronUp
          className={`ms-auto hidden hs-accordion-active:block ${commonStyles.iconSize}`}
        />
        <ChevronDown
          className={`ms-auto block hs-accordion-active:hidden ${commonStyles.iconSize}`}
        />
      </button>

      <div
        id={`${item?.id}-accordion-child`}
        className={commonStyles.accordionContent}
        role="region"
        aria-labelledby={`${item?.id}-accordion`}
      >
        <ul className="space-y-1 ps-8 pt-1">
          {item?.children.map(child => (
            <AccordionItem key={child.id} item={child} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export const Sidebar = () => {
  const pathname = usePathname() || "";

  const topNavItems: NavItem[] = [
    {
      id: "overview",
      label: "Dashboard",
      icon: <LayoutDashboard className={commonStyles.iconSize} />,
      href: dashboardRoutes?.vendor_overview,
      isActive: pathname === dashboardRoutes?.vendor_overview,
    },
  ];

  const mainNavItems: NavItem[] = [
    {
      id: "manage-equipment",
      label: "Manage Equipment",
      icon: <FlaskConical className={commonStyles.iconSize} />,
      href: dashboardRoutes?.vendor_equipments,
      isActive: pathname?.includes(dashboardRoutes?.vendor_equipments),
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <Files className={commonStyles.iconSize} />,
      href: dashboardRoutes?.vendor_bookings,
      isActive: pathname?.includes(dashboardRoutes?.vendor_bookings),
    },
    {
      id: "finances",
      label: "Finances",
      icon: <Receipt className={commonStyles.iconSize} />,
      href: dashboardRoutes?.vendor_finances,
      isActive: pathname?.includes(dashboardRoutes?.vendor_finances),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <MessagesSquare className={commonStyles.iconSize} />,
      href: dashboardRoutes?.vendor_notifications,
      isActive: pathname?.includes(dashboardRoutes?.vendor_notifications),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <KeyRound className={commonStyles.iconSize} />,
      href: dashboardRoutes?.vendor_settings,
      isActive: pathname?.includes(dashboardRoutes?.vendor_settings),
    },
  ];

  return (
    <div
      id="hs-application-sidebar"
      className="hs-overlay fixed inset-y-0 start-0 z-[60] hidden h-full w-[260px] -translate-x-full transform rounded-[6px] border border-e border-[#E5E7EB] bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0"
      role="dialog"
      tabIndex={-1}
    >
      <div className="flex h-full flex-col">
        {/* Fixed Header */}
        <div className="flex items-center px-6 py-4">
          <Link
            className="w-[130px] flex-none text-xl font-semibold"
            href={webRoutes?.home}
            aria-label="Brand"
          >
            <Image alt="Alstein Logo" src={logoLight} width={130} height={48} />
          </Link>
        </div>

        {/* Scrollable Navigation Section */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav
            className="hs-accordion-group flex w-full flex-col flex-wrap p-3"
            data-hs-accordion-always-open
          >
            <ul className="flex flex-col gap-4">
              {topNavItems.map(item => (
                <AccordionItem key={item?.id} item={item} />
              ))}

              <div className="px-2.5 text-sm uppercase text-gray-800">
                Pages
              </div>

              {mainNavItems.map(item => (
                <AccordionItem key={item?.id} item={item} />
              ))}
            </ul>
          </nav>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-300 bg-white p-4">
          <button className={`w-full ${commonStyles.link}`} type="button">
            <LogOut className={commonStyles.iconSize} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
