import type { Metadata } from "next";
import "@/src/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrelineScript from "@/components/PrelineScript";
import ReactQueryProvider from "./providers/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProviders } from "@/context";
import { Suspense } from "react";
import { LoadingState } from "@/components/common";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Alstein | Book Scientific and Diagnostic Laboratory Services",
  description:
    "Simplifying access to medical diagnostics and research tools. Find Laboratories, and Research Equipment Near You.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Suspense fallback={<LoadingState />}>
          <SessionProvider>
            <ReactQueryProvider>
              <AppProviders>
                <ToastContainer />
                {children}
              </AppProviders>
              <PrelineScript />
              <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryProvider>
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
