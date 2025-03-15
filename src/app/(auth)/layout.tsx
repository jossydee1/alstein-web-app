"use client";

import { useAuth } from "@/context";
import { dashboardRoutes } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { userId, token } = useAuth();

  useEffect(() => {
    if (userId && token) {
      router.push(dashboardRoutes.overview);
    }
  }, [token, userId, router]);

  return <div>{children}</div>;
}
