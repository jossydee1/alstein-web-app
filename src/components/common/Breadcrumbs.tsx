import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Breadcrumbs = ({
  links,
}: {
  links: { title: string; link: string }[];
}) => {
  return (
    <div className="section-container !pb-4 !pt-[22px]">
      <Breadcrumb>
        <BreadcrumbList>
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index < links.length - 1 ? (
                  <BreadcrumbLink href={link.link}>{link.title}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{link.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < links.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
