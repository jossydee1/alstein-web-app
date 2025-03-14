import HomeContent from "@/components/web/home";
import { serverFetch } from "@/utils";

const categories = await serverFetch();

export default async function Page() {
  return <HomeContent categories={categories} />;
}
