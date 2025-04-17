"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppProps } from "next/app";
import { AuthProvider, useAuth } from "@/context";
import { ToastContainer } from "react-toastify";
import PrelineScript from "@/components/PrelineScript";
import ReactQueryProvider from "@/app/providers/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function isPartner(Component: AppProps["Component"]) {
  return function IsPartner(props: AppProps["pageProps"]) {
    const { userId, token, businessProfile } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!userId || !token) {
        router.push("/login");
      }
      if (!businessProfile) {
        router.push("/partner-setup");
      }
      //TODO: Uncomment this code when admin is ready
      // if (businessProfile?.is_verified === false) {
      //   router.push("/partner-status");
      // }
    }, [token, userId, router, businessProfile]);

    return (
      <ReactQueryProvider>
        <AuthProvider>
          <ToastContainer />
          <Component {...props} />
        </AuthProvider>
        <PrelineScript />
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryProvider>
    );
  };
}
