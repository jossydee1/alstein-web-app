"use client";

import React from "react";
import { useAuth } from "@/context";
import Image from "next/image";
import avatar from "@/public/icons/avatar.svg";

import EditIcon from "@/public/icons/tabler_edit.svg";

const Greetings = () => {
  const { user, userId, token } = useAuth();

  console.log(user, userId, token);

  return (
    <header className="grid gap-y-6">
      <h1 className="text-lg">
        Welcome back,{" "}
        <span className="font-semibold text-[#172554]">{user?.first_name}</span>
      </h1>

      <div
        className="rounded-lg px-10 py-7 text-white"
        style={{
          background:
            "radial-gradient(75.44% 75.44% at 15.32% 13.69%, #3352BA 11.52%, #172554 68.02%), radial-gradient(85.18% 85.18% at 14.82% 50%, #3352BA 0%, #172554 68.02%)",
        }}
      >
        <div className="flex items-start gap-x-1.5">
          {!user?.profile_picture ? (
            <Image
              alt="Avatar"
              src={avatar}
              width={62}
              height={62}
              className="rounded-md"
              objectFit="contain"
            />
          ) : (
            <Image
              alt="Avatar"
              src="https://picsum.photos/200"
              width={62}
              height={62}
              className="rounded-md"
              objectFit="contain"
            />
          )}
          <button type="button">
            <Image alt="Edit Icon" src={EditIcon} width={17} height={17} />
          </button>
        </div>

        <p className="mt-3 grid gap-y-1.5">
          <span className="text-xm font-medium leading-4">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="text-sm font-normal leading-4 text-white/80">
            {user?.email}
          </span>
        </p>
      </div>
    </header>
  );
};

export default Greetings;
