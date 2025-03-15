import { useEffect } from "react";

export const useScrollToID = (
  trigger: string | React.ReactNode,
  id: string,
) => {
  useEffect(() => {
    if (trigger) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [trigger, id]);
};
