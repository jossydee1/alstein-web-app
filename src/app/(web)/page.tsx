import HomeContent from "@/components/web/home";
import { serverFetch } from "@/utils";

const categories = await serverFetch(
  "/client/public/api/v1/equipments/get-equipment-category?skip=0&take=3",
);

const reviews = await serverFetch(
  "/client/public/api/v1/reviews/get-reviews?skip=0&take=6",
);

export default async function Page() {
  return <HomeContent categories={categories} reviews={reviews} />;
}
