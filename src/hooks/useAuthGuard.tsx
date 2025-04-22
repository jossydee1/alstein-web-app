"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context";
import { authRoutes } from "@/utils";
import { LoadingState } from "@/components/common";

export const useAuthGuard = (requireVendor = false) => {
  const router = useRouter();
  const { userId, token, canAccessVendor, isProfileVerified, isAuthLoading } =
    useAuth();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Don't do anything while auth is still initializing
    if (isAuthLoading) {
      return;
    }

    const checkAuth = async () => {
      setIsChecking(true);

      // Check if user is authenticated
      if (!userId || !token) {
        const currentPath = window.location.pathname;
        router.push(
          `${authRoutes.login}?redirect=${encodeURIComponent(currentPath)}`,
        );
        setIsAuthorized(false);
        setIsChecking(false);
        return;
      }

      // Check vendor access if required
      if (requireVendor) {
        if (!canAccessVendor) {
          router.push(authRoutes.partner_setup);
          setIsAuthorized(false);
          setIsChecking(false);
          return;
        }

        // TODO: Uncomment this when the profile verification is implemented
        // if (!isProfileVerified) {
        //   router.push(webRoutes.partner_status);
        //   setIsAuthorized(false);
        //   setIsChecking(false);
        //   return;
        // }
      }

      // All checks passed
      setIsAuthorized(true);
      setIsChecking(false);
    };

    checkAuth();
  }, [
    userId,
    token,
    canAccessVendor,
    isProfileVerified,
    router,
    requireVendor,
    isAuthLoading,
  ]);

  // Return a LoadingState component along with authorization status
  return {
    isAuthorized,
    isLoading: isAuthLoading || isChecking,
    LoadingComponent: isAuthLoading || isChecking ? <LoadingState /> : null,
  };
};
