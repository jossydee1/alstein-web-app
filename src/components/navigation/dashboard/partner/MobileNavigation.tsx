import { ChevronRight, PanelLeftOpen } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface MobileNavigationProps {
  breadcrumbs: BreadcrumbItem[];
}

export const MobileNavigation = ({
  breadcrumbs = [],
}: MobileNavigationProps) => {
  // Show all breadcrumbs if there are 3 or fewer items
  // Otherwise show the first and last items with an ellipsis in between
  const displayedBreadcrumbs =
    breadcrumbs.length <= 2
      ? breadcrumbs
      : [
          breadcrumbs[0],
          { label: "...", href: undefined },
          breadcrumbs[breadcrumbs.length - 1],
        ];

  return (
    <div className="-mt-px">
      <div className="sticky inset-x-0 top-0 z-20 border-y bg-white px-4 dark:border-neutral-700 dark:bg-neutral-800 sm:px-6 lg:hidden lg:px-8">
        <div className="flex items-center py-2">
          <button
            type="button"
            className="flex size-8 min-h-8 min-w-8 items-center justify-center gap-x-2 rounded-lg border border-gray-300 text-gray-800 hover:text-gray-500 focus:text-gray-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-application-sidebar"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-application-sidebar"
          >
            <span className="sr-only">Toggle Navigation</span>
            <PanelLeftOpen className="size-4 shrink-0" />
          </button>

          <ol className="ms-3 flex items-center overflow-hidden whitespace-nowrap">
            {displayedBreadcrumbs.map((item, index) => {
              const isLast = index === displayedBreadcrumbs.length - 1;

              if (isLast) {
                return (
                  <li
                    key={item.label}
                    className="truncate text-sm font-semibold text-gray-800 dark:text-neutral-400"
                    aria-current="page"
                  >
                    {item.label}
                  </li>
                );
              }

              return (
                <li
                  key={item.label}
                  className="flex items-center text-sm text-gray-800 dark:text-neutral-400"
                >
                  {item.href && item.label !== "..." ? (
                    <Link href={item.href} className="hover:text-gray-500">
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                  <ChevronRight className="mx-3 size-2.5 shrink-0 overflow-visible text-gray-400 dark:text-neutral-500" />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
