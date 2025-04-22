import Image from "next/image";
import React from "react";
import arrow from "@/public/icons/long-arrow.svg";
import users from "@/public/icons/user-group-03.svg";
import Link from "next/link";
import { webRoutes } from "@/utils";
import { CategoryProps, CountProps } from "@/types";
import { useClientFetch } from "@/hooks";

const CategoryItem = ({ category }: { category: CategoryProps }) => {
  const { data, isLoading } = useClientFetch<CountProps>({
    endpoint: `/client/public/api/v1/equipments/get-partners-number-per-category?category_slug=${category?.title_slug}`,
    enabled: !!category?.title_slug,
  });

  const partnerCount = data?.count || 0;

  return (
    <article
      className="group relative min-w-[260px] max-w-[260px] overflow-hidden rounded-2xl px-4 py-7 text-white shadow-lg hover:shadow-none"
      style={{
        backgroundImage: category?.image_url || 'url("/images/doctor.png")',
        backgroundColor: "#181818",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h3 className="mb-4 mt-3 text-[32px] leading-[40px]">
        {category?.title}
      </h3>
      <ul className="list-inside list-disc">
        {category?.subcategory?.map(sub => (
          <li key={sub?.id}>{sub?.description}</li>
        ))}
      </ul>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-[#00000080] p-3">
        <span className="flex items-center gap-1 text-[12px] leading-[13px] text-white">
          <Image src={users} alt="arrow right" />
          {isLoading
            ? "Loading..."
            : `${partnerCount} Partner${partnerCount !== 1 ? "s" : ""}`}
        </span>

        <Link
          href={`${webRoutes?.listings}?category=${category?.title_slug}`}
          className="block rounded-md bg-[#7F7F7F] px-7 py-1.5 text-sm leading-[16px] text-white transition-colors group-hover:bg-white group-hover:text-[#0F0F0F]"
        >
          View & Book
        </Link>
      </div>
    </article>
  );
};

const Categories = ({ categories }: { categories: CategoryProps[] }) => {
  return (
    <div className="bg-white" id="categories">
      <section className="section-container">
        <div className="mb-2.5 flex items-center gap-2.5 text-brandColor">
          <hr className="w-[22px] border-2 border-brandColor" />
          <span className="text-lg font-medium uppercase">
            Our Top Categories
          </span>
        </div>
        <h2 className="text-[40px] font-normal leading-[48px]">
          Explore Popular Categories
        </h2>

        <div className="scrollbar-hide mt-8 flex w-full flex-nowrap gap-7 overflow-x-auto">
          <article className="min-w-[362px] max-w-[362px] rounded-2xl bg-[#181818] px-6 py-8 text-white">
            <p className="text-[36px] font-light leading-[48px]">
              Compare providers, view equipment&apos;s state and book
              appointments effortlessly.
            </p>
            <div className="relative mt-[64px]">
              <Image src={arrow} alt="arrow right" />
            </div>
          </article>

          {categories &&
            categories?.map(category => (
              <CategoryItem key={category?.title} category={category} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
