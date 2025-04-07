import { dashboardRoutes, webRoutes } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import logoLight from "@/public/logo-rectangle-light.svg";
import { ArrowRightLeft, BellDot, LayoutDashboard, LogOut } from "lucide-react";
import avatar from "@/public/icons/avatar.svg";
import { useAuth } from "@/context";

export const Navbar = () => {
  const { logout, user } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <header className="text-sm0 sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 md:flex-nowrap md:justify-start lg:ps-[260px]">
      <nav className="mx-auto flex w-full basis-full items-center px-4 sm:px-6">
        <div className="me-1 lg:me-0 lg:hidden">
          <Link
            className="w-[130px] flex-none text-xl font-semibold"
            href={webRoutes.home}
            aria-label="Brand"
          >
            <Image alt="Alstein Logo" src={logoLight} width={130} height={48} />
          </Link>

          <div className="ms-1 lg:hidden"></div>
        </div>

        <div className="ms-2 flex flex-1 items-center gap-4 lg:justify-between">
          <p className="hidden lg:block">
            Welcome back,{" "}
            <strong>
              {user?.first_name} {user?.last_name}
            </strong>
          </p>

          <div className="ml-auto flex gap-5 py-2">
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
                  className="absolute right-0 mt-2 grid w-[250px] gap-6 rounded-md bg-white p-5 sm:w-[300px]"
                  style={{ boxShadow: "1px 1px 16px 2px #00000033" }}
                >
                  <Link
                    href={dashboardRoutes.vendor_overview}
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
                    href={dashboardRoutes.vendor_overview}
                    className="inline-flex items-center rounded-sm text-sm text-[#6B7280] hover:text-brandColor"
                  >
                    <span className="mr-2 inline-block">
                      <LayoutDashboard size={20} />
                    </span>
                    <span className="font-medium leading-6">Dashboard</span>
                  </Link>

                  <Link
                    href={dashboardRoutes.client_order_history}
                    className="inline-flex items-center rounded-sm text-sm text-[#6B7280] hover:text-brandColor"
                  >
                    <span className="mr-2 inline-block">
                      <ArrowRightLeft size={20} />
                    </span>
                    <span className="font-medium leading-6">
                      Switch to Client account
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
        </div>
      </nav>
    </header>
  );
};
