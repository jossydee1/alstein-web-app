"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppProps } from "next/app";
import { AuthProvider, useAuth } from "@/context";
import { ToastContainer } from "react-toastify";
import PrelineScript from "@/components/PrelineScript";
import ReactQueryProvider from "@/app/providers/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function withAuth(Component: AppProps["Component"]) {
  return function WithAuth(props: AppProps["pageProps"]) {
    const { userId, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!userId || !token) {
        router.push("/login");
      }
    }, [token, userId, router]);

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
