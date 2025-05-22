import HomeContent from "@/components/web/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alstein | Book Scientific and Diagnostic Laboratory Services",
  description:
    "Simplifying access to medical diagnostics and research tools. Find Laboratories, and Research Equipment Near You.",
};

export default async function Page() {
  return <HomeContent />;
}
