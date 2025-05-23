import { authRoutes, dashboardRoutes, DOCUMENT_URL, webRoutes } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import logoLight from "@/public/logo-rectangle-light.svg";
import { Bell, LogOut, Building2, UserRound, Menu } from "lucide-react";
import { useClientFetch, useCloseMenuWhenClickedOutside } from "@/hooks";
import avatar from "@/public/icons/avatar.svg";
import { useAuth } from "@/context";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/common";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const { logout, user, fetchBusinessProfiles, businessProfile, token } =
    useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    endpoint: "/client/api/v1/notifications/check-new-notification",
    enabled: !!token,
  });

  const handleBusinessProfileClick = async () => {
    setIsLoading(true);
    try {
      const profiles = await fetchBusinessProfiles();

      if (profiles.length > 0) {
        // If we have profiles, navigate to vendor dashboard
        router.push(dashboardRoutes?.vendor_overview);
      } else {
        // If no profiles, go to partner setup
        router.push(authRoutes?.partner_setup);
      }
    } catch (error) {
      console.error("Error fetching business profiles:", error);
    } finally {
      setIsLoading(false);
      setShowDropdown(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingState />}
      <div className="sticky top-0 z-50 flex w-full flex-wrap bg-white shadow-sm md:flex-nowrap lg:justify-start">
        <nav className="relative mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-x-4 px-4 py-2 sm:px-6 md:px-[50px] md:py-1 lg:px-[100px] xl:px-[150px]">
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
          </div>

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
            <div className="flex py-2">
              <Link
                href={dashboardRoutes?.client_notifications}
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
                      href={dashboardRoutes?.client_order_history}
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
                      <span className="text-lg font-medium leading-4 text-[#2F2F2F]">
                        {user?.first_name} {user?.last_name}
                      </span>
                    </Link>

                    <Link
                      href={dashboardRoutes?.client_order_history}
                      className="inline-flex items-center rounded-sm text-sm text-[#6B7280] hover:text-[#2F2F2F]"
                    >
                      <span className="mr-2 inline-block">
                        <UserRound size={20} />
                      </span>
                      <span className="font-medium leading-6">My Account</span>
                    </Link>

                    <Button
                      variant="ghost"
                      onClick={handleBusinessProfileClick}
                      className="inline-flex items-center justify-start rounded-sm p-0 text-sm text-[#6B7280] hover:text-[#2F2F2F]"
                    >
                      <span className="mr-2 inline-block">
                        <Building2 size={20} />
                      </span>
                      <span className="font-medium leading-6">
                        {businessProfile
                          ? "Partner Dashboard"
                          : "Business Profile"}
                      </span>
                    </Button>

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
        </nav>
      </div>
    </>
  );
};

export default NavBar;
