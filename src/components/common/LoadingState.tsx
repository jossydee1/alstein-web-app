import React from "react";

export const LoadingState = () => {
  return (
    <div className="fixed left-0 top-0 z-[100000] flex h-full w-full items-center justify-center bg-black/30">
      <div className="relative flex h-[150px] w-[150px] items-center justify-center">
        {/* Pulsating circle */}
        <div className="absolute inset-0 animate-pulse-scale rounded-full bg-brandColor opacity-70"></div>

        {/* Brand letter or icon in the center */}
        <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
          <span className="text-4xl">A</span>
        </div>
      </div>
    </div>
  );
};
