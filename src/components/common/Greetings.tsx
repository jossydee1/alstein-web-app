"use client";

import React from "react";
import { useAuth } from "@/context";
import Image from "next/image";
import avatar from "@/public/icons/avatar?.svg";
import { Edit } from "lucide-react";
import Link from "next/link";
import { dashboardRoutes, DOCUMENT_URL } from "@/utils";
// import { Edit } from "lucide-react";

const Greetings = () => {
  const { user } = useAuth();

  return (
    <header className="grid gap-y-6">
      <p className="text-lg">
        Welcome back,{" "}
        <span className="font-semibold text-[#172554]">{user?.first_name}</span>
      </p>

      <section
        className="rounded-md px-10 py-7 text-white"
        style={{
          background:
            "radial-gradient(75.44% 75.44% at 15.32% 13.69%, #3352BA 11.52%, #172554 68.02%), radial-gradient(85.18% 85.18% at 14.82% 50%, #3352BA 0%, #172554 68.02%)",
        }}
      >
        <div className="flex items-start gap-x-1.5">
          <Image
            alt="Avatar"
            src={
              user?.user_avatar ? DOCUMENT_URL + user?.user_avatar : avatar?.src
            }
            width={62}
            height={62}
            className="aspect-square rounded-md object-cover"
          />
          <Link href={dashboardRoutes?.client_account_settings}>
            <Edit className="text-white" size={17} />
          </Link>
        </div>

        <p className="mt-3 grid gap-y-1.5">
          <span className="text-xm font-medium leading-4">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="text-sm font-normal leading-4 text-white/80">
            {user?.email}
          </span>
        </p>
      </section>
    </header>
  );
};

export default Greetings;
