"use client";

import {
  BellDot,
  Building2,
  ChevronDown,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import logoLight from "@/public/logo-rectangle-light.svg";
import { usePathname } from "next/navigation";
import {
  authRoutes,
  dashboardRoutes,
  DOCUMENT_URL,
  formatError,
  webRoutes,
} from "@/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { useCloseMenuWhenClickedOutside } from "@/hooks";
import avatar from "@/public/icons/avatar.svg";
import { LoadingState } from "@/components/common";
import { useGetBusinessProfiles } from "@/hooks/useGetBusinessProfiles";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// CSS Classes
const STYLES = {
  icon: "me-3 block size-4 shrink-0 md:me-2 md:hidden",
  link: "flex items-center rounded-md p-2 text-[#7F7F7F] hover:text-[#2F2F2F] focus:text-[#2F2F2F]",
  subLink:
    "flex items-center rounded-md p-2 hover:text-[#2F2F2F] focus:text-[#2F2F2F] md:px-3",
  activeLink: "text-[#2F2F2F] font-semibold text-black",
  activeSubLink: "font-semibold text-black1",
} as const;

// Navigation Links
interface NavItem {
  name: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive: (path: string) => boolean;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

interface DropdownItem {
  name: string;
  href: string;
  isActive: boolean;
  hasDivider?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    href: webRoutes?.home,
    isActive: path => path === webRoutes?.home,
  },
  {
    name: "Listings",
    href: webRoutes?.listings,
    isActive: (path: string) => path.startsWith(webRoutes?.listings),
  },
  {
    name: "About",
    href: webRoutes?.about,
    isActive: (path: string) => path === webRoutes?.about,
  },
  {
    name: "Contact",
    href: webRoutes?.contact,
    isActive: path => path === webRoutes?.contact,
  },
];

const NavBar = () => {
  const router = useRouter();
  const path = usePathname() || "";

  const { userId, logout, user } = useAuth();
  const { refetch, isLoading, data, error } = useGetBusinessProfiles();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useCloseMenuWhenClickedOutside({
    showMenu: showDropdown,
    showMenuRef: dropdownRef,
    setShowMenu: setShowDropdown,
  });

  useEffect(() => {
    if (!data) return;

    if (data.length > 0) {
      router.push(dashboardRoutes?.vendor_overview);
    } else {
      router.push(authRoutes?.partner_setup);
    }
  }, [data, router]);

  useEffect(() => {
    if (error) {
      toast.error(formatError(error));
    }
  }, [error]);

  const renderNavItem = (item: (typeof NAV_ITEMS)[0]) => {
    if (item?.isDropdown) {
      return (
        <div
          key={item?.name}
          className="hs-dropdown [--adaptive:none] [--is-collapse:true] [--strategy:static] md:[--is-collapse:false] md:[--strategy:fixed]"
        >
          <button
            id="hs-header-base-dropdown"
            type="button"
            className={`hs-dropdown-toggle flex w-full items-center rounded-md p-2 text-sm hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${item?.isActive(path) ? STYLES.activeLink : ""}`}
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            {item?.name}
            <ChevronDown className="ms-auto size-4 shrink-0 duration-300 hs-dropdown-open:-rotate-180 md:ms-1 md:hs-dropdown-open:rotate-0" />
          </button>

          <div className="hs-dropdown-menu duration-[0.1ms] md:duration-[150ms] relative top-full z-10 hidden w-full ps-7 opacity-0 transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-5 before:w-full after:absolute after:start-[18px] after:top-1 after:h-[calc(100%-0.25rem)] after:w-0.5 after:bg-gray-100 hs-dropdown-open:opacity-100 dark:after:bg-neutral-700 md:w-52 md:rounded-md md:bg-white md:ps-0 md:shadow-md md:after:hidden dark:md:bg-neutral-800">
            <div className="space-y-0.5 py-1 md:px-1">
              {item?.dropdownItems?.map(dropdownItem => (
                <React.Fragment key={dropdownItem?.name}>
                  {dropdownItem?.hasDivider && <hr />}
                  <Link
                    className={`${STYLES.subLink} ${dropdownItem?.isActive ? STYLES.activeSubLink : ""}`}
                    href={dropdownItem?.href}
                  >
                    {dropdownItem?.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item?.name}
        className={`${STYLES.link} ${item?.isActive(path) ? STYLES.activeLink : ""}`}
        href={item?.href || "#"}
      >
        {item?.name}
      </Link>
    );
  };

  return (
    <>
      {isLoading && <LoadingState />}
      <div className="sticky top-0 z-50 flex w-full flex-wrap bg-white shadow-sm md:flex-nowrap lg:justify-start">
        <nav className="relative mx-auto w-full max-w-screen-2xl gap-x-[60px] px-4 py-2 sm:px-6 md:px-[50px] md:py-2 lg:flex lg:items-center lg:justify-between lg:gap-[60px] lg:px-[100px] xl:px-[150px]">
          <div className="flex items-center justify-between gap-x-1">
            <Link
              className="w-[130px] flex-none text-xl font-semibold"
              href={webRoutes?.home}
              aria-label="Brand"
            >
              <Image
                alt="Alstein Logo"
                src={logoLight}
                width={130}
                height={48}
              />
            </Link>

            <button
              type="button"
              className="hs-collapse-toggle relative flex size-9 items-center justify-center rounded-md border border-gray-200 text-[12px] font-medium hover:bg-gray-100 focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 lg:hidden"
              id="hs-header-base-collapse"
              aria-expanded="false"
              aria-controls="hs-header-base"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-header-base"
            >
              <Menu className="size-4 hs-collapse-open:hidden" />
              <X className="hidden size-4 shrink-0 hs-collapse-open:block" />
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>

          <div
            id="hs-header-base"
            className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 lg:block"
            aria-labelledby="hs-header-base-collapse"
          >
            <div className="max-h-[75vh] overflow-visible lg:overflow-visible [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
              <div className="relative flex flex-col gap-0.5 py-2 lg:flex-row lg:items-center lg:gap-1 lg:py-0">
                <div className="flex grow flex-col gap-9 lg:flex-row lg:items-center lg:justify-between lg:gap-1">
                  <div className="m-2 flex flex-col gap-0.5 lg:flex-row lg:items-center lg:justify-between lg:gap-1">
                    {NAV_ITEMS?.map(renderNavItem)}
                  </div>

                  {!userId ? (
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        className="font-Groteskbold h-auto border border-[#7B7B7B] text-lg font-normal lg:mr-7 lg:border-transparent lg:p-0 lg:hover:bg-transparent lg:hover:underline"
                      >
                        <Link href={webRoutes?.partners}>
                          Join as a Partner
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        className="font-Groteskbold px-12 text-lg font-normal"
                        asChild
                      >
                        <Link href={authRoutes?.register}>Register/Log in</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-5 py-2">
                      <Link
                        href={dashboardRoutes?.client_notifications}
                        className="flex aspect-square h-[50px] w-[50px] items-center justify-center rounded-md border-[0.2px] border-gray-400 text-gray-400 transition-colors hover:bg-gray-100/50"
                      >
                        <BellDot size="24" strokeWidth={1.5} />
                      </Link>

                      <div className="static lg:relative" ref={dropdownRef}>
                        <button
                          type="button"
                          className="aspect-square h-[50px] w-[50px] overflow-hidden rounded-md border-[0.2px] border-transparent transition-all hover:border-gray-400"
                          onClick={() => setShowDropdown(!showDropdown)}
                        >
                          <Image
                            alt="Avatar"
                            src={
                              user?.user_avatar
                                ? DOCUMENT_URL + user?.user_avatar
                                : avatar.src
                            }
                            width={50}
                            height={50}
                            className="aspect-square rounded-md object-cover"
                          />
                        </button>

                        {showDropdown && (
                          <div
                            className="fixed right-4 top-[70px] z-[9999] grid w-[250px] gap-6 rounded-md bg-white p-5 shadow-lg sm:w-[300px] lg:fixed lg:right-[100px] xl:right-[150px]"
                            style={{ boxShadow: "1px 1px 16px 2px #00000033" }}
                          >
                            <Link
                              href={dashboardRoutes?.client_order_history}
                              className="inline-flex w-fit items-center rounded-md border border-[#E5E7EB] p-1.5 text-sm text-gray-700"
                            >
                              <span className="mr-2 inline-block h-5 w-5 rounded-full border border-gray-200 bg-gray-100">
                                <Image
                                  alt="Avatar"
                                  src={
                                    user?.user_avatar
                                      ? DOCUMENT_URL + user?.user_avatar
                                      : avatar.src
                                  }
                                  width={20}
                                  height={20}
                                  className="aspect-square rounded-full object-cover"
                                  objectFit="cover"
                                />
                              </span>
                              <span className="text-lg font-medium leading-4 text-brandColor">
                                {user?.first_name} {user?.last_name}{" "}
                              </span>
                            </Link>

                            <Link
                              href={dashboardRoutes?.client_order_history}
                              className="inline-flex items-center rounded-md text-sm text-[#6B7280] hover:text-brandColor"
                            >
                              <span className="mr-2 inline-block">
                                <UserRound size={20} />
                              </span>
                              <span className="font-medium leading-6">
                                My Account
                              </span>
                            </Link>

                            <Button
                              variant="ghost"
                              onClick={e => {
                                e.preventDefault();
                                refetch();
                              }}
                              className="inline-flex items-center justify-start rounded-sm p-0 text-sm text-[#6B7280] hover:text-[#2F2F2F]"
                            >
                              <span className="mr-2 inline-block">
                                <Building2 size={20} />
                              </span>
                              <span className="font-medium leading-6">
                                Business Profile
                              </span>
                            </Button>

                            <Button
                              type="button"
                              onClick={logout}
                              variant="ghost"
                              className="inline-flex items-center justify-start rounded-sm p-0 text-sm text-[#6B7280] hover:text-[#2F2F2F]"
                            >
                              <span className="mr-2 inline-block">
                                <LogOut size={20} />
                              </span>
                              <span className="font-medium leading-6">
                                Logout
                              </span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
