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
        router.push("/");
        return;
      }
      if (!businessProfile) {
        router.push("/partner-setup");
      }
    }, [token, userId, router, businessProfile]);

    if (userId && token) {
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
    } else {
      return null;
    }
  };
}
