import Image from "next/image";
// vscode:extension/bradlc.vscode-tailwindcss
export default function Home() {
  return (
    <div className="font-Groteskbold pb-20sm:p-20 grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="text-4xl font-medium leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Book Scientific and Diagnostic Laboratory Services
        </h1>
      </main>
    </div>
  );
}
