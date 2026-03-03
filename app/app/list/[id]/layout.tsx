export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 pb-8 px-[20vw]">
      <div className="inline-block text-center justify-center w-full">
        {children}
      </div>
    </section>
  );
}
