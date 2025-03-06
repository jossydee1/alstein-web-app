import { Footer } from "@/components/navigation/web/Footer";
import NavBar from "@/components/navigation/web/NavBar";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
