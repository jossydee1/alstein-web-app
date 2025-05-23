import { authRoutes, dashboardRoutes, DOCUMENT_URL, webRoutes } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import logoLight from "@/public/logo-rectangle-light.svg";
import { Bell, LogOut, Menu, UserRound } from "lucide-react";
import avatar from "@/public/icons/avatar.svg";
import { useAuth } from "@/context";
import { Button } from "@/components/ui/button";
import { useClientFetch, useCloseMenuWhenClickedOutside } from "@/hooks";
import { useNotificationRefresh } from "@/context";

export const Navbar = () => {
  const { logout, user, token, businessProfile } = useAuth();
  const { refreshKey } = useNotificationRefresh();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useCloseMenuWhenClickedOutside({
    showMenu: showDropdown,
    showMenuRef: dropdownRef,
    setShowMenu: setShowDropdown,
  });

  const { data: isNewNotification } = useClientFetch<{
    is_new_notification: boolean;
    last_viewed_date: string;
  }>({
    endpoint: `/partner/api/v1/notifications/check-new-notification?partner_id=${businessProfile?.id}`,
    enabled: !!token && !!businessProfile?.id,
    queryKey: [
      `/partner/api/v1/notifications/check-new-notification`,
      businessProfile?.id,
      refreshKey,
    ],
  });

  return (
    <>
      <header className="text-sm0 sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 md:flex-nowrap md:justify-start lg:ps-[260px]">
        <nav className="mx-auto flex w-full basis-full items-center px-4 sm:px-6">
          <div className="me-1 lg:me-0 lg:hidden">
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

            <div className="ms-1 lg:hidden"></div>
          </div>

          <div className="ms-2 flex flex-1 items-center gap-4 lg:justify-between">
            <p className="hidden lg:block">
              Welcome back,{" "}
              <strong>
                {user?.first_name} {user?.last_name}
              </strong>
            </p>

            {!user ? (
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  className="font-Groteskbold h-auto border border-[#7B7B7B] text-lg font-normal lg:mr-7 lg:border-transparent lg:p-0 lg:hover:bg-transparent lg:hover:underline"
                >
                  <Link href={authRoutes.login}>Login</Link>
                </Button>
                <Button
                  type="button"
                  className="font-Groteskbold px-12 text-lg font-normal"
                  asChild
                >
                  <Link href={authRoutes?.register}>Register</Link>
                </Button>
              </div>
            ) : (
              <div className="ml-auto flex py-2">
                <Link
                  href={dashboardRoutes?.vendor_notifications}
                  className="relative flex aspect-square h-[50px] w-[50px] items-center justify-center rounded-md transition-colors hover:bg-gray-100/50"
                >
                  {isNewNotification?.is_new_notification && (
                    <div className="absolute right-3.5 top-4 h-2 w-2 rounded-full bg-brandColor" />
                  )}
                  <Bell size="24" strokeWidth={1.5} />
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="flex aspect-square h-[50px] w-[50px] items-center justify-center rounded-md transition-colors hover:bg-gray-100/50"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <Menu size="24" strokeWidth={1.5} />
                  </button>

                  {showDropdown && (
                    <div
                      className="absolute right-0 mt-2 grid w-[250px] gap-6 rounded-md bg-white p-5 sm:w-[300px]"
                      style={{ boxShadow: "1px 1px 16px 2px #00000033" }}
                    >
                      <Link
                        href={dashboardRoutes?.vendor_overview}
                        className="inline-flex w-fit items-center rounded-sm border border-[#E5E7EB] p-1.5 text-sm text-gray-700"
                      >
                        <span className="mr-2 inline-block h-5 w-5 rounded-full border border-gray-200 bg-gray-100">
                          <Image
                            alt="Avatar"
                            src={
                              user?.user_avatar
                                ? DOCUMENT_URL + user?.user_avatar
                                : user?.profile_photo
                                  ? DOCUMENT_URL + user?.profile_photo
                                  : avatar?.src
                            }
                            width={20}
                            height={20}
                            className="aspect-square rounded-full bg-neutral-100 object-cover"
                          />
                        </span>
                        <span className="text-lg font-medium leading-4 text-brandColor">
                          {user?.first_name} {user?.last_name}
                        </span>
                      </Link>

                      <Link
                        href={dashboardRoutes?.client_order_history}
                        className="inline-flex items-center rounded-sm text-sm text-[#6B7280] hover:text-brandColor"
                      >
                        <span className="mr-2 inline-block">
                          <UserRound size={20} />
                        </span>
                        <span className="font-medium leading-6">
                          My Account
                        </span>
                      </Link>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={logout}
                        className="inline-flex items-center justify-start rounded-sm p-0 text-sm text-[#6B7280] hover:text-[#2F2F2F]"
                      >
                        <span className="mr-2 inline-block">
                          <LogOut size={20} />
                        </span>
                        <span className="font-medium leading-6">Logout</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
