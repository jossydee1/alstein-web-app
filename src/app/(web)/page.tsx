import HomeContent from "@/components/web/home";
import { serverFetch } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alstein | Book Scientific and Diagnostic Laboratory Services",
  description:
    "Simplifying access to medical diagnostics and research tools. Find Laboratories, and Research Equipment Near You.",
};

const categories = await serverFetch(
  "/client/public/api/v1/equipments/get-equipment-category?skip=0&take=4",
);

const reviews = await serverFetch(
  "/client/public/api/v1/reviews/get-reviews?skip=0&take=6",
);

export default async function Page() {
  return <HomeContent categories={categories} reviews={reviews} />;
}
