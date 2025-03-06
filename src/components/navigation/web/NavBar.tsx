"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoLight from "@/public/logo-rectangle-light.svg";
import { usePathname } from "next/navigation";
import { authRoutes, webRoutes } from "@/utils";
import { Button } from "@/components/ui/button";

// CSS Classes
const STYLES = {
  icon: "me-3 block size-4 shrink-0 md:me-2 md:hidden",
  link: "flex items-center rounded-lg p-2 text-[#7F7F7F] hover:text-[#2F2F2F] focus:text-[#2F2F2F]",
  subLink:
    "flex items-center rounded-lg p-2 hover:text-[#2F2F2F] focus:text-[#2F2F2F] md:px-3",
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
    href: webRoutes.home,
    isActive: path => path === webRoutes.home,
  },
  {
    name: "Listings",
    href: webRoutes.listings,
    isActive: (path: string) => path.startsWith(webRoutes.listings),
  },
  {
    name: "About",
    href: webRoutes.about,
    isActive: (path: string) => path === webRoutes.about,
  },
  {
    name: "Contact",
    href: webRoutes.contact,
    isActive: path => path === webRoutes.contact,
  },
];

const NavBar = () => {
  const path = usePathname() || "";

  const renderNavItem = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.isDropdown) {
      return (
        <div
          key={item.name}
          className="hs-dropdown [--adaptive:none] [--is-collapse:true] [--strategy:static] md:[--is-collapse:false] md:[--strategy:fixed]"
        >
          <button
            id="hs-header-base-dropdown"
            type="button"
            className={`hs-dropdown-toggle flex w-full items-center rounded-lg p-2 text-sm hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${item.isActive(path) ? STYLES.activeLink : ""}`}
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            {item.name}
            <ChevronDown className="ms-auto size-4 shrink-0 duration-300 hs-dropdown-open:-rotate-180 md:ms-1 md:hs-dropdown-open:rotate-0" />
          </button>

          <div className="hs-dropdown-menu duration-[0.1ms] md:duration-[150ms] relative top-full z-10 hidden w-full ps-7 opacity-0 transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-5 before:w-full after:absolute after:start-[18px] after:top-1 after:h-[calc(100%-0.25rem)] after:w-0.5 after:bg-gray-100 hs-dropdown-open:opacity-100 dark:after:bg-neutral-700 md:w-52 md:rounded-lg md:bg-white md:ps-0 md:shadow-md md:after:hidden dark:md:bg-neutral-800">
            <div className="space-y-0.5 py-1 md:px-1">
              {item.dropdownItems?.map(dropdownItem => (
                <React.Fragment key={dropdownItem.name}>
                  {dropdownItem.hasDivider && <hr />}
                  <Link
                    className={`${STYLES.subLink} ${dropdownItem.isActive ? STYLES.activeSubLink : ""}`}
                    href={dropdownItem.href}
                  >
                    {dropdownItem.name}
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
        key={item.name}
        className={`${STYLES.link} ${item.isActive(path) ? STYLES.activeLink : ""}`}
        href={item.href || "#"}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <div className="sticky top-0 z-50 flex w-full flex-wrap bg-white shadow-sm md:flex-nowrap lg:justify-start">
      <nav className="relative mx-auto w-full max-w-screen-2xl gap-x-[60px] px-4 py-2 sm:px-6 md:px-[50px] md:py-6 lg:flex lg:items-center lg:justify-between lg:gap-[60px] lg:px-[100px] xl:px-[150px]">
        <div className="flex items-center justify-between gap-x-1">
          <Link
            className="w-[130px] flex-none text-xl font-semibold"
            href={webRoutes.home}
            aria-label="Brand"
          >
            <Image alt="Company Logo" src={logoLight} width={130} height={48} />
          </Link>

          <button
            type="button"
            className="hs-collapse-toggle relative flex size-9 items-center justify-center rounded-lg border border-gray-200 text-[12px] font-medium hover:bg-gray-100 focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 lg:hidden"
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
          <div className="max-h-[75vh] overflow-hidden overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
            <div className="flex flex-col gap-0.5 py-2 lg:flex-row lg:items-center lg:gap-1 lg:py-0">
              <div className="flex grow flex-col gap-9 lg:flex-row lg:items-center lg:justify-between lg:gap-1">
                <div className="m-2 flex flex-col gap-0.5 lg:flex-row lg:items-center lg:justify-between lg:gap-1">
                  {NAV_ITEMS.map(renderNavItem)}
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-1">
                  <Button
                    variant="ghost"
                    className="h-auto border border-[#7B7B7B] px-6 py-4 font-Groteskbold text-lg font-normal hover:bg-transparent hover:underline lg:mr-7 lg:border-transparent lg:p-0"
                  >
                    <Link href={webRoutes.partners}>Join as a Partner</Link>
                  </Button>
                  <Button
                    className="h-auto bg-brandColor px-12 py-4 font-Groteskbold text-lg font-normal"
                    asChild
                  >
                    <Link href={authRoutes.login}>Register/Log in</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
