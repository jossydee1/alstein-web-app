"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

export function withAuth(Component: AppProps["Component"]) {
  return function WithAuth(props: AppProps["pageProps"]) {
    const [user, setUser] = useState<null | object>(null);
    const router = useRouter();

    useEffect(() => {
      if (router.isReady) {
        setUser({
          name: "John Doe",
          email: "jone@doe.com",
        });
      } else {
        router.push("/");
      }
    }, [router]);

    if (user) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
}
