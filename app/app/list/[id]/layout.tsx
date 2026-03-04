import { Navbar } from "@/components/navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pb-8 h-screen">
      <Navbar />
      <div className="inline-block text-center justify-center items-center w-full px-[20vw] ">
        {children}
      </div>
    </div>
  );
}
