import { dashboardRoutes, webRoutes } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import logoLight from "@/public/logo-rectangle-light.svg";
import {
  ArrowRightLeft,
  BellDot,
  Handshake,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useCloseMenuWhenClickedOutside } from "@/hooks";
import avatar from "@/public/icons/avatar.svg";
import { useAuth } from "@/context";

const NavBar = () => {
  const { logout, user } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useCloseMenuWhenClickedOutside({
    showMenu: showDropdown,
    showMenuRef: dropdownRef,
    setShowMenu: setShowDropdown,
  });

  return (
    <div className="sticky top-0 z-50 flex w-full flex-wrap bg-white shadow-sm md:flex-nowrap lg:justify-start">
      <nav className="relative mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-x-4 px-4 py-2 sm:px-6 md:px-[50px] md:py-1 lg:px-[100px] xl:px-[150px]">
        <div className="flex items-center justify-between gap-x-1">
          <Link
            className="w-[130px] flex-none text-xl font-semibold"
            href={webRoutes.home}
            aria-label="Brand"
          >
            <Image alt="Company Logo" src={logoLight} width={130} height={48} />
          </Link>
        </div>

        <div className="flex gap-5 py-2">
          <Link
            href={dashboardRoutes.client_notifications}
            className="flex aspect-square h-[50px] w-[50px] items-center justify-center rounded-lg border-[0.2px] border-gray-400 text-gray-400 transition-colors hover:bg-gray-100/50"
          >
            <BellDot size="24" strokeWidth={1.5} />
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="aspect-square h-[50px] w-[50px] overflow-hidden rounded-lg border-[0.2px] border-transparent transition-all hover:border-gray-400"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Image
                alt="Avatar"
                src={!user?.profile_picture ? avatar : user?.profile_picture}
                width={50}
                height={50}
                className="rounded-md"
                objectFit="contain"
              />
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 mt-2 grid w-[250px] gap-6 rounded-[10px] bg-white p-5 sm:w-[300px]"
                style={{ boxShadow: "1px 1px 16px 2px #00000033" }}
              >
                <Link
                  href={dashboardRoutes.client_order_history}
                  className="inline-flex w-fit items-center rounded-sm border border-[#E5E7EB] p-1.5 text-sm text-gray-700"
                >
                  <span className="mr-2 inline-block h-5 w-5 rounded-full border border-gray-200 bg-gray-100">
                    <Image
                      alt="Avatar"
                      src={user?.profile_picture || avatar}
                      width={20}
                      height={20}
                      className="rounded-full"
                      objectFit="cover"
                    />
                  </span>
                  <span className="text-lg font-medium leading-4 text-brandColor">
                    {user?.first_name} {user?.last_name}
                  </span>
                </Link>

                <Link
                  href={dashboardRoutes.client_order_history}
                  className="inline-flex items-center rounded-sm text-sm text-[#6B7280] hover:text-brandColor"
                >
                  <span className="mr-2 inline-block">
                    <LayoutDashboard size={20} />
                  </span>
                  <span className="font-medium leading-6">Dashboard</span>
                </Link>

                <Link
                  href={webRoutes.partners}
                  className="inline-flex items-center rounded-sm text-sm text-[#6B7280] hover:text-brandColor"
                >
                  <span className="mr-2 inline-block">
                    <Handshake size={20} />
                  </span>
                  <span className="font-medium leading-6">
                    Become a Partner
                  </span>
                </Link>

                <Link
                  href={dashboardRoutes.vendor_overview}
                  className="inline-flex items-center rounded-sm text-sm text-[#6B7280] hover:text-brandColor"
                >
                  <span className="mr-2 inline-block">
                    <ArrowRightLeft size={20} />
                  </span>
                  <span className="font-medium leading-6">
                    Switch to Vendor account
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center rounded-sm text-sm text-[#6B7280] hover:text-brandColor"
                >
                  <span className="mr-2 inline-block">
                    <LogOut size={20} />
                  </span>
                  <span className="font-medium leading-6">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
