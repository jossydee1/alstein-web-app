"use client";

import React, { SetStateAction, useEffect, RefObject } from "react";

type SingleRef = RefObject<HTMLElement | null>;
type MultiRef = { [key: string]: RefObject<HTMLElement | null> };
type ShowMenuRef = SingleRef | MultiRef;

interface CloseMenuOnOutsideClickProps {
  showMenu: boolean;
  showMenuRef: ShowMenuRef;
  setShowMenu: React.Dispatch<SetStateAction<boolean>>;
}

export const useCloseMenuWhenClickedOutside = ({
  showMenu,
  showMenuRef,
  setShowMenu,
}: CloseMenuOnOutsideClickProps) => {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (!showMenu) return;

      // If it's a single ref
      if ("current" in showMenuRef) {
        const el = showMenuRef.current;
        if (el instanceof HTMLElement && !el.contains(e.target as Node)) {
          setShowMenu(false);
        }
      } else {
        // It's an object of refs
        const refs = Object.values(showMenuRef);
        const isOutside = refs.every(
          ref =>
            ref.current instanceof HTMLElement &&
            !ref.current.contains(e.target as Node),
        );
        if (refs.length > 0 && isOutside) {
          setShowMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [setShowMenu, showMenu, showMenuRef]);
};
